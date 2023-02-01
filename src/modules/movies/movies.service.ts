import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Actor } from '../actors/actor.model';
import { Author } from '../authors/author.model';
import { Movie } from './movie.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private movieModel: typeof Movie
  ) {}
  
  async findAll(): Promise<Movie[]> {
    return this.movieModel.findAll({ include: [Author, Actor] });
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieModel.findByPk(id, { include: [Author, Actor] });
  }

  async create(args: any): Promise<Movie> {
    const movie = await this.movieModel.create({
      ...args
    });

    await movie.$set('writtenBy', [...args.writtenBy]);
    await movie.$set('starring', [...args.starring]);

    await movie.save();

    return movie;
  }

  async update(id: number, args: any): Promise<Movie> {
    let movie = await this.movieModel.findByPk(id);

    if (!movie) {
      throw new BadRequestException('Movie is not found');
    }

    movie.title = args.title;
    movie.summary = args.summary;

    await movie.$set('writtenBy', [...args.writtenBy]);
    await movie.$set('starring', [...args.starring]);

    await movie.save();

    return movie;
  }

  async remove(id: number): Promise<number> {
    return await this.movieModel.destroy({ where: { id } });
  }
}
