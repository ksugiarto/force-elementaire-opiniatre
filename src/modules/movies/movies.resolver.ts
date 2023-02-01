import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';
import { CreateMovieDto } from './movie.dto';

@Resolver('movies')
export class MoviesResolver {
  constructor(
    private readonly moviesService: MoviesService
  ) {}
  
  @Query('movies')
  async getMovies() {
    return this.moviesService.findAll();
  }

  @Query('movie')
  async getMovie(
    @Args('id') id: number
  ) {
    return this.moviesService.findOne(id);
  }

  @Mutation('createMovie')
  async create(@Args('createMovieInput') args: CreateMovieDto): Promise<Movie> {
    console.log('== args:', args);
    const movie = await this.moviesService.create(args);
    return movie;
  }

  @Mutation('updateMovie')
  async update(
    @Args('id') id: number,
    @Args('updateMovieInput') args: CreateMovieDto
  ): Promise<Movie> {
    console.log('== UPDATE args:', args);
    const movie = await this.moviesService.update(id, args);
    return movie;
  }

  @Mutation('removeMovie')
  async remove(
    @Args('id') id: number
  ): Promise<number> {
    return this.moviesService.remove(id);
  }
}
