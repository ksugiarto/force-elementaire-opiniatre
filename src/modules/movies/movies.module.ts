import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieActor } from './movie-actor.model';
import { MovieAuthor } from './movie-author.model';
import { Movie } from './movie.model';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [SequelizeModule.forFeature([Movie, MovieAuthor, MovieActor])],
  providers: [MoviesService, MoviesResolver],
  exports: []
})
export class MoviesModule {}
