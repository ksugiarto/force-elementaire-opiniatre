// Generic Imports
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Model Imports
import { Movie } from './models/movie.model';
import { Author } from '../authors/author.model';
import { Actor } from '../actors/actor.model';
import { CreateMovieDto } from './movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private movieModel: typeof Movie
  ) {}
  
  /**
   * Retrieve all Movies from database
   */
  async findAll(): Promise<Movie[]> {
    return await this.movieModel.findAll({ include: [Author, Actor] });
  }

  /**
   * Retrieve one Movie by ID
   * @param id 
   */
  async findOne(id: number): Promise<Movie | undefined> {
    return await this.movieModel.findByPk(id, { include: [Author, Actor] });
  }

  /**
   * Create new Movie
   * @param title
   * @param summary
   */
  async create(args: CreateMovieDto): Promise<Movie | undefined> {
    // Create the new Movie
    const movie = await this.movieModel.create({
      ...args
    });

    // Set the many to many documents
    await movie.$set('writtenBy', [...args.writtenBy]);
    await movie.$set('starring', [...args.starring]);
    await movie.save();

    return movie;
  }

  /**
   * Update one Movie by ID
   * @param title
   * @param summary
   */
  async update(id: number, args: CreateMovieDto): Promise<Movie | undefined> {
    // Check and find if the movie exist or not
    let movie = await this.movieModel.findByPk(id);
    if (!movie) {
      throw new BadRequestException('Movie is not found');
    }

    movie.title = args.title;
    movie.summary = args.summary;

    // Update the many to many documents
    await movie.$set('writtenBy', [...args.writtenBy]);
    await movie.$set('starring', [...args.starring]);
    await movie.save();

    return movie;
  }

  /**
   * Remove one Movie by ID
   * @param id
   */
  async remove(id: number): Promise<number | undefined> {
    // Check and find if the movie exist or not
    let movie = await this.movieModel.findByPk(id);
    if (!movie) {
      throw new BadRequestException('Movie is not found');
    }

    return await this.movieModel.destroy({ where: { id } });
  }
}
