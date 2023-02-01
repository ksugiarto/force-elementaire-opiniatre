import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Author } from '../authors/author.model';
import { Movie } from './movie.model';

@Table
export class MovieAuthor extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @ForeignKey(() => Author)
  @Column
  authorId: number;
}
