// Generic Imports
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

// Model Imports
import { Author } from '../../authors/author.model';
import { Actor } from '../../actors/actor.model';
import { MovieAuthor } from './movie-author.model';
import { MovieActor } from './movie-actor.model';

@Table
export class Movie extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  summary: string;

  @Column(DataType.ARRAY(DataType.STRING))
  genre: string[];

  @BelongsToMany(() => Author, () => MovieAuthor)
  writtenBy: Author[];
  
  @BelongsToMany(() => Actor, () => MovieActor)
  starring: Actor[];

  @Column({ allowNull: true })
  countryOfOrigin: string;

  @Column({ allowNull: true })
  runningTime: number;

  @Column({ allowNull: true })
  distributor: string;

  @Column({ allowNull: true })
  releaseDate: Date;
}
