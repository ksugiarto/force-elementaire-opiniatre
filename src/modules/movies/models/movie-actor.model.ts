// Generic Imports
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

// Model Imports
import { Movie } from './movie.model';
import { Actor } from '../../actors/actor.model';

@Table
export class MovieActor extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @ForeignKey(() => Actor)
  @Column
  actorId: number;
}
