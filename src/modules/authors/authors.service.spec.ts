// Generic Imports
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

// Author Related Imports
import { AuthorsService } from './authors.service';
import { Author } from './author.model';

// Mock Data
const authorsMock = [
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

const oneAuthorMock = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@local.host',
  birthdate: '01-01-1970',
  birthplace: 'Paris'
}

describe('AuthorsService', () => {
  let service: AuthorsService;
  let model: typeof Author;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getModelToken(Author),
          useValue: {
            findAll: jest.fn(() => authorsMock),
            findOne: jest.fn(),
            create: jest.fn(() => oneAuthorMock),
            remove: jest.fn(),
            destroy: jest.fn(() => oneAuthorMock),
          },
        },
      ],
    }).compile();
    
    service = module.get<AuthorsService>(AuthorsService);
    model = module.get<typeof Author>(getModelToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of authors', async () => {
      const authors = await service.findAll();
      expect(authors).toEqual(authorsMock);
    });
  });

  describe('create()', () => {
    it('should be successfully create an author', async () => {
      const oneAuthor = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@local.host',
        birthdate: '01-01-1970',
        birthplace: 'Paris'
      };

      const newAuthor = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@local.host',
        birthdate: '01-01-1970',
        birthplace: 'Paris'
      })

      expect(newAuthor).toEqual(oneAuthor);
    })
  });

  // describe('findOne()', () => {
  //   it('should retrieve one single author', () => {
  //     const findAuthor = jest.spyOn(model, 'findOne');
  //     expect(service.findOne(1));
  //     expect(findAuthor).toBeCalledWith({ where: { id: 1 } });
  //   });
  // });

  // describe('delete()', () => {
  //   it('should delete a author', async () => {
  //     const findAuthor = jest.spyOn(model, 'findOne').mockReturnValue({
  //       destroy: jest.fn()
  //     } as any);
  //     const retVal = await service.remove(2);
  //     expect(findAuthor).toBeCalledWith({ where: { id: 2 } });
  //     expect(retVal).toBeUndefined();
  //   });
  // });
});
