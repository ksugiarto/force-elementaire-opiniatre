// Generic Imports
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

// Actor Related Imports
import { ActorsService } from './actors.service';
import { Actor } from './actor.model';

// Mock Data
const actorsMock = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@local.host',
    birthdate: '01-01-1970',
    birthplace: 'Paris'
  },
  {
    id: 2,
    firstName: 'Mic',
    lastName: 'Dallas',
    email: 'mic.dallas@local.host',
    birthdate: '01-01-1970',
    birthplace: 'Paris'
  }
]

const oneActorMock = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@local.host',
  birthdate: '01-01-1970',
  birthplace: 'Paris'
}

describe('ActorsService', () => {
  let service: ActorsService;
  let model: typeof Actor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorsService,
        {
          provide: getModelToken(Actor),
          useValue: {
            findAll: jest.fn(() => actorsMock),
            findOne: jest.fn(),
            findByPk: jest.fn(() => oneActorMock),
            create: jest.fn(() => oneActorMock),
          },
        },
      ],
    }).compile();
    
    service = module.get<ActorsService>(ActorsService);
    model = module.get<typeof Actor>(getModelToken(Actor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of actors', async () => {
      const actors = await service.findAll();
      expect(actors).toEqual(actorsMock);
    });
  });

  describe('findOne()', () => {
    it('should retrieve one single actor', () => {
      const findActor = jest.spyOn(model, 'findByPk');
      expect(service.findOne(1));
      expect(findActor).toBeCalledWith(1);
    });
  });

  describe('create()', () => {
    it('should be successfully create an actor', async () => {
      const oneActor = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@local.host',
        birthdate: '01-01-1970',
        birthplace: 'Paris'
      };

      const newActor = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@local.host',
        birthdate: '01-01-1970',
        birthplace: 'Paris'
      })

      expect(newActor).toEqual(oneActor);
    })
  });
});
