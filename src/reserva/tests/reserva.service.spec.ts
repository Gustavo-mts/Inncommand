import { Test, TestingModule } from '@nestjs/testing';
import { ReservaService } from '../reserva.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva } from '../interfaces/reserva.interface';
import { CreateReservaDto } from '../dto/create-reserva.dto';
import { UpdateReservaDto } from '../dto/update-reserva.dto';
import { QuartoService } from '../../quarto/quarto.service';
import { UserService } from '../../user/user.service';
import { NotFoundException } from '@nestjs/common';

const mockReserva = {
    _id: 'someId',
    quartoId: 'quartoId',
    userId: 'userId',
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockReservaModel = {
    find: jest.fn().mockResolvedValue([mockReserva]),
    findById: jest.fn().mockResolvedValue(mockReserva),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockReserva),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockReserva),
    create: jest.fn().mockImplementation((dto) => ({
        ...dto,
        _id: 'someId',
        save: jest.fn().mockResolvedValue({
            ...dto,
            _id: 'someId',
            createdAt: new Date(),
            updatedAt: new Date(),
        }),
    })),
};


describe('ReservaService', () => {
    let service: ReservaService;
    let quartoService: QuartoService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReservaService,
                { provide: getModelToken('Reserva'), useValue: mockReservaModel },
                { provide: QuartoService, useValue: { findOne: jest.fn().mockResolvedValue({ _id: 'quartoId' }) } },
                { provide: UserService, useValue: { findOne: jest.fn().mockResolvedValue({ _id: 'userId' }) } },
            ],
        }).compile();

        service = module.get<ReservaService>(ReservaService);
        quartoService = module.get<QuartoService>(QuartoService);
        userService = module.get<UserService>(UserService);
    });

    describe('create', () => {
        it('should create a reserva successfully', async () => {
            const dto: CreateReservaDto = {
                quartoId: 'quartoId',
                userId: 'userId',
                startDate: new Date(),
                endDate: new Date(),
            };

            mockReservaModel.find = jest.fn().mockResolvedValue([]); // Garantir que não há reservas existentes
            const result = await service.create(dto);
            expect(result._id).toEqual(mockReserva._id);
            expect(result.quartoId).toEqual(mockReserva.quartoId);
            expect(result.userId).toEqual(mockReserva.userId);

            expect(Math.floor(result.startDate.getTime() / 1000)).toEqual(Math.floor(mockReserva.startDate.getTime() / 1000));
            expect(Math.floor(result.endDate.getTime() / 1000)).toEqual(Math.floor(mockReserva.endDate.getTime() / 1000));

            expect(mockReservaModel.create).toHaveBeenCalledWith(dto);
        });

        it('should throw NotFoundException if room does not exist', async () => {
            jest.spyOn(quartoService, 'findOne').mockResolvedValue(null);

            const dto: CreateReservaDto = {
                quartoId: 'invalidQuartoId',
                userId: 'userId',
                startDate: new Date(),
                endDate: new Date(),
            };

            await expect(service.create(dto)).rejects.toThrow(NotFoundException);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            jest.spyOn(userService, 'findOne').mockResolvedValue(null);

            const dto: CreateReservaDto = {
                quartoId: 'quartoId',
                userId: 'invalidUserId',
                startDate: new Date(),
                endDate: new Date(),
            };

            await expect(service.create(dto)).rejects.toThrow(NotFoundException);
        });

        it('should throw NotFoundException if room is already reserved', async () => {
            // Simular que o quarto já está reservado para as datas selecionadas
            mockReservaModel.find = jest.fn().mockResolvedValue([mockReserva]);

            const dto: CreateReservaDto = {
                quartoId: 'quartoId',
                userId: 'userId',
                startDate: new Date(),
                endDate: new Date(),
            };

            await expect(service.create(dto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findAll', () => {
        it('should return an array of reservas', async () => {
            const result = await service.findAll();
            expect(result).toEqual([mockReserva]);
            expect(mockReservaModel.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a reserva', async () => {
            const result = await service.findOne('someId');
            expect(result).toEqual(mockReserva);
            expect(mockReservaModel.findById).toHaveBeenCalledWith('someId');
        });

        it('should throw NotFoundException if reserva not found', async () => {
            jest.spyOn(mockReservaModel, 'findById').mockResolvedValue(null);
            await expect(service.findOne('someId')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update and return a reserva', async () => {
            const dto: UpdateReservaDto = { quartoId: 'newQuartoId' };
            const result = await service.update('someId', dto);
            expect(result).toEqual(mockReserva);
            expect(mockReservaModel.findByIdAndUpdate).toHaveBeenCalledWith('someId', dto, { new: true });
        });

        it('should throw NotFoundException if reserva not found', async () => {
            jest.spyOn(mockReservaModel, 'findByIdAndUpdate').mockResolvedValue(null);
            await expect(service.update('someId', {})).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete and return a reserva', async () => {
            const result = await service.remove('someId');
            expect(result).toEqual(mockReserva);
            expect(mockReservaModel.findByIdAndDelete).toHaveBeenCalledWith('someId');
        });

        it('should throw NotFoundException if reserva not found', async () => {
            jest.spyOn(mockReservaModel, 'findByIdAndDelete').mockResolvedValue(null);
            await expect(service.remove('someId')).rejects.toThrow(NotFoundException);
        });
    });
});
