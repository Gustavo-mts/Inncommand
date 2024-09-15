import { Test, TestingModule } from '@nestjs/testing';
import { QuartoService } from '../quarto.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quarto } from '../interfaces/quarto.interface';
import { CreateQuartoDto } from '../dto/create-quarto.dto';
import { UpdateQuartoDto } from '../dto/update-quarto.dto';
import { NotFoundException } from '@nestjs/common';

const mockQuarto = {
  _id: 'someId',
  number: '101',
  type: 'Single',
  description: 'A nice single room',
  price: 100,
  available: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockQuartoModel = {
  find: jest.fn().mockResolvedValue([mockQuarto]),
  findById: jest.fn().mockResolvedValue(mockQuarto),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockQuarto),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockQuarto),
  create: jest.fn().mockResolvedValue(mockQuarto),
};

describe('QuartoService', () => {
  let service: QuartoService;
  let model: Model<Quarto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuartoService,
        { provide: getModelToken('Quarto'), useValue: mockQuartoModel },
      ],
    }).compile();

    service = module.get<QuartoService>(QuartoService);
    model = module.get<Model<Quarto>>(getModelToken('Quarto'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a quarto successfully', async () => {
      const dto: CreateQuartoDto = {
        number: '101',
        type: 'Single',
        price: 100,
        available: true,
      };
      expect(await service.create(dto)).toEqual(mockQuarto);
    });
  });

  describe('findAll', () => {
    it('should return an array of quartos', async () => {
      expect(await service.findAll()).toEqual([mockQuarto]);
    });
  });

  describe('findOne', () => {
    it('should return a quarto', async () => {
      expect(await service.findOne('someId')).toEqual(mockQuarto);
    });

    it('should throw NotFoundException if quarto not found', async () => {
      model.findById = jest.fn().mockResolvedValue(null);
      await expect(service.findOne('someId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a quarto', async () => {
      const dto: UpdateQuartoDto = { price: 150 };
      expect(await service.update('someId', dto)).toEqual(mockQuarto);
    });

    it('should throw NotFoundException if quarto not found', async () => {
      model.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      await expect(service.update('someId', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return a quarto', async () => {
      expect(await service.remove('someId')).toEqual(mockQuarto);
    });

    it('should throw NotFoundException if quarto not found', async () => {
      model.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      await expect(service.remove('someId')).rejects.toThrow(NotFoundException);
    });
  });
});
