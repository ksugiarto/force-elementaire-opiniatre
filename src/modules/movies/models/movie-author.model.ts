// Generic Imports
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

// Model Imports
import { Movie } from './movie.model';
import { Author } from '../../authors/author.model';

@Table
export class MovieAuthor extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @ForeignKey(() => Author)
  @Column
  authorId: number;
}
