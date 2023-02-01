import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Actor } from '../actors/actor.model';
import { Movie } from './movie.model';

@Table
export class MovieActor extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @ForeignKey(() => Actor)
  @Column
  actorId: number;
}
