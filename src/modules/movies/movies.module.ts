// Generic Imports
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Model Imports
import { Movie } from './models/movie.model';
import { MovieActor } from './models/movie-actor.model';
import { MovieAuthor } from './models/movie-author.model';

// Resolver & Service Imports
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [SequelizeModule.forFeature([Movie, MovieAuthor, MovieActor])],
  providers: [MoviesService, MoviesResolver],
  exports: []
})
export class MoviesModule {}
