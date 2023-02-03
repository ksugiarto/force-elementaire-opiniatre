// General Imports
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Service Imports
import { MoviesService } from 'src/modules/movies/movies.service';

@Injectable()
export class MovieGuard implements CanActivate {
  constructor(private moviesService: MoviesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = GqlExecutionContext.create(context).getArgs();
    const movieId: number = args.id;

    // Check if id provided or not
    if (!movieId) {
      throw new BadRequestException(`id: is required`);
    }

    // Find the movie
    const movie = await this.moviesService.findOne(movieId);

    // Check if movie existing or not
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    return true;
  }
}
