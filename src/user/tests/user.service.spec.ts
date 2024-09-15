import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret',
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Outros testes de métodos podem ser criados aqui...
});
