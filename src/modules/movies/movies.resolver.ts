// Generic Imports
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// Guard Imports
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { MovieGuard } from 'src/common/guards/movie.guard';

// Model & DTO Imports
import { Movie } from './models/movie.model';
import { CreateMovieDto } from './movie.dto';

// Service Imports
import { MoviesService } from './movies.service';

@Resolver('movies')
@UseGuards(GqlAuthGuard)
export class MoviesResolver {
  constructor(
    private readonly moviesService: MoviesService
  ) {}
  
  /**
   * Retrieve all Movies from database
   */
  @Query('movies')
  async getMovies() {
    return this.moviesService.findAll();
  }

  /**
   * Retrieve one Movie by ID
   * @param id 
   */
  @Query('movie')
  @UseGuards(MovieGuard)
  async getMovie(
    @Args('id') id: number
  ) {
    return this.moviesService.findOne(id);
  }

  /**
   * Create new Movie
   * @param args
   */
  @Mutation('createMovie')
  async create(
    @Args('createMovieInput') args: CreateMovieDto
  ): Promise<Movie> {
    const movie = await this.moviesService.create(args);
    return movie;
  }

  /**
   * Update one Movie by ID
   * @param id
   * @param args
   */
  @Mutation('updateMovie')
  @UseGuards(MovieGuard)
  async update(
    @Args('id') id: number,
    @Args('updateMovieInput') args: CreateMovieDto
  ): Promise<Movie> {
    const movie = await this.moviesService.update(id, args);
    return movie;
  }

  /**
   * Remove one Movie by ID
   * @param id
   */
  @Mutation('removeMovie')
  @UseGuards(MovieGuard)
  async remove(
    @Args('id') id: number
  ): Promise<number> {
    return this.moviesService.remove(id);
  }
}
