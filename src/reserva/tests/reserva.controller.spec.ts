import { Test, TestingModule } from '@nestjs/testing';
import { ReservaController } from '../reserva.controller';
import { ReservaService } from '../reserva.service';
import { CreateReservaDto } from '../dto/create-reserva.dto';
import { UpdateReservaDto } from '../dto/update-reserva.dto';

const mockReserva = {
  _id: 'someId',
  roomId: 'roomId',
  userId: 'userId',
  startDate: new Date(),
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockReservaService = {
  create: jest.fn().mockResolvedValue(mockReserva),
  findAll: jest.fn().mockResolvedValue([mockReserva]),
  findOne: jest.fn().mockResolvedValue(mockReserva),
  update: jest.fn().mockResolvedValue(mockReserva),
  remove: jest.fn().mockResolvedValue(mockReserva),
};

describe('ReservaController', () => {
  let controller: ReservaController;
  let service: ReservaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaController],
      providers: [
        { provide: ReservaService, useValue: mockReservaService },
      ],
    }).compile();

    controller = module.get<ReservaController>(ReservaController);
    service = module.get<ReservaService>(ReservaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a reserva', async () => {
      const dto: CreateReservaDto = {
        quartoId: 'quartoId',
        userId: 'userId',
        startDate: new Date(),
        endDate: new Date(),
      };
      expect(await controller.create(dto)).toEqual(mockReserva);
    });
  });

  describe('findAll', () => {
    it('should return an array of reservas', async () => {
      expect(await controller.findAll()).toEqual([mockReserva]);
    });
  });

  describe('findOne', () => {
    it('should return a reserva', async () => {
      expect(await controller.findOne('someId')).toEqual(mockReserva);
    });
  });

  describe('update', () => {
    it('should update and return a reserva', async () => {
      const dto: UpdateReservaDto = { quartoId: 'newQuartoId' };
      expect(await controller.update('someId', dto)).toEqual(mockReserva);
    });
  });

  describe('remove', () => {
    it('should delete and return a reserva', async () => {
      expect(await controller.remove('someId')).toEqual(mockReserva);
    });
  });
});
