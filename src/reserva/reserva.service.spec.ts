import { Test, TestingModule } from '@nestjs/testing';
import { ReservaService } from './reserva.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockBooking = {
  _id: 'abc123',
  room: 'roomId123',
  user: 'userId123',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-05'),
  totalPrice: 200,
  status: 'reserved',
};

const createReservaDto = {
  room: 'roomId123',
  user: 'userId123',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-05'),
  totalPrice: 200,
  status: 'reserved',
};

describe('BookingService', () => {
  let service: ReservaService;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservaService,
        {
          provide: getModelToken('Reserva'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBooking),
            constructor: jest.fn().mockResolvedValue(mockBooking),
            find: jest.fn(),
            create: jest.fn().mockResolvedValue(mockBooking),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReservaService>(ReservaService);
    model = module.get<Model<any>>(getModelToken('Booking'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a booking', async () => {
    expect(await service.create(createReservaDto)).toEqual(mockBooking);
    expect(model.create).toHaveBeenCalledWith(createReservaDto);
  });
});
