// Generic Imports
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

// User Related Imports
import { UsersService } from './users.service';
import { User } from './user.model';

// Mock Data
const oneUserMock = {
  id: 1,
  email: 'john.doe@local.host',
  password: '123'
}

describe('UsersService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(() => oneUserMock),
          },
        },
      ],
    }).compile();
    
    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    it('should retrieve one single user', () => {
      const findUser = jest.spyOn(model, 'findOne');
      expect(service.findOne('john.doe@local.host'));
      expect(findUser).toBeCalledWith({ where: { email: 'john.doe@local.host' } });
    });
  });

  describe('create()', () => {
    it('should be successfully create a user', async () => {
      const oneUser = {
        id: 1,
        email: 'john.doe@local.host',
        password: '123'
      };

      const newUser = await service.create('john.doe@local.host', '123');
      expect(newUser).toEqual(oneUser);
    })
  });
});
