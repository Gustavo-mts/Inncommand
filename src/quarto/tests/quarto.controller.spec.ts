import { Test, TestingModule } from '@nestjs/testing';
import { QuartoController } from '../quarto.controller';
import { QuartoService } from '../quarto.service';
import { CreateQuartoDto } from '../dto/create-quarto.dto';
import { UpdateQuartoDto } from '../dto/update-quarto.dto';
import { Quarto } from '../interfaces/quarto.interface';

const mockQuarto = {
  _id: 'someId',
  number: '101',
  type: 'Single',
  description: 'A single room',
  price: 100,
  available: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockQuartoService = {
  create: jest.fn().mockResolvedValue(mockQuarto),
  findAll: jest.fn().mockResolvedValue([mockQuarto]),
  findOne: jest.fn().mockResolvedValue(mockQuarto),
  update: jest.fn().mockResolvedValue(mockQuarto),
  remove: jest.fn().mockResolvedValue(mockQuarto),
};

describe('QuartoController', () => {
  let controller: QuartoController;
  let service: QuartoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuartoController],
      providers: [
        { provide: QuartoService, useValue: mockQuartoService },
      ],
    }).compile();

    controller = module.get<QuartoController>(QuartoController);
    service = module.get<QuartoService>(QuartoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a quarto', async () => {
      const dto: CreateQuartoDto = {
        number: '101',
        type: 'Single',
        description: 'A single room',
        price: 100,
        available: true,
      };
      expect(await controller.create(dto)).toEqual(mockQuarto);
    });
  });

  describe('findAll', () => {
    it('should return an array of quartos', async () => {
      expect(await controller.findAll()).toEqual([mockQuarto]);
    });
  });

  describe('findOne', () => {
    it('should return a quarto', async () => {
      expect(await controller.findOne('someId')).toEqual(mockQuarto);
    });
  });

  describe('update', () => {
    it('should update and return a quarto', async () => {
      const dto: UpdateQuartoDto = { price: 120 };
      expect(await controller.update('someId', dto)).toEqual(mockQuarto);
    });
  });

  describe('remove', () => {
    it('should delete and return a quarto', async () => {
      expect(await controller.remove('someId')).toEqual(mockQuarto);
    });
  });
});
