// Generic Imports
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

// Model Imports
import { Movie } from './models/movie.model';
import { Author } from '../authors/author.model';
import { Actor } from '../actors/actor.model';

// Service Imports
import { MoviesService } from './movies.service';

// Mock Data
const moviesMock = [
  {
    id: 1,
    title: 'Movie 1',
    summary: 'Summary Movie 1',
    genre: ["Action", "Comedy"],
    writtenBy: [1],
    starring: [1, 2]
  },
  {
    id: 2,
    title: 'Movie 2',
    summary: 'Summary Movie 2',
    genre: ["Action", "Comedy"],
    writtenBy: [1],
    starring: [1, 2]
  }
]

const oneMovieMock = {
  id: 1,
  title: 'Movie 1',
  summary: 'Summary Movie 1',
  genre: ["Action", "Comedy"],
  writtenBy: [1],
  starring: [1, 2]
}

describe('MoviesService', () => {
  let service: MoviesService;
  let model: typeof Movie;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie),
          useValue: {
            findAll: jest.fn(() => moviesMock),
            findOne: jest.fn(() => oneMovieMock),
            findByPk: jest.fn(() => oneMovieMock),
            create: jest.fn(() => oneMovieMock),
            remove: jest.fn(),
            destroy: jest.fn(() => oneMovieMock),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    
    service = module.get<MoviesService>(MoviesService);
    model = module.get<typeof Movie>(getModelToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const movies = await service.findAll();
      expect(movies).toEqual(moviesMock);
    });
  });

  describe('findOne()', () => {
    it('should retrieve one single movie', () => {
      const findMovie = jest.spyOn(model, 'findByPk');
      expect(service.findOne(1));
      expect(findMovie).toBeCalledWith(1, { include: [Author, Actor] });
    });
  });

  // describe('create()', () => {
  //   it('should be successfully create a movie', async () => {
  //     const oneMovie = {
  //       id: 1,
  //       title: 'Movie 1',
  //       summary: 'Summary Movie 1',
  //       genre: ["Action", "Comedy"],
  //       writtenBy: [1],
  //       starring: [1, 2]
  //     };

  //     const newMovie = await service.create({
  //       title: 'Movie 1',
  //       summary: 'Summary Movie 1',
  //       genre: ["Action", "Comedy"],
  //       writtenBy: [1],
  //       starring: [1, 2]
  //     });

  //     expect(newMovie).toEqual(oneMovie);
  //   })
  // });

  // describe('delete()', () => {
  //   it('should delete a movie', async () => {
  //     const findMovie = jest.spyOn(model, 'findOne').mockReturnValue({
  //       destroy: jest.fn()
  //     } as any);
  //     const retVal = await service.remove(2);
  //     expect(findMovie).toBeCalledWith({ where: { id: 2 } });
  //     expect(retVal).toBeUndefined();
  //   });
  // });
});
