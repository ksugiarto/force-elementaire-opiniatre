import { INTEGER } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Actor extends Model {

  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ allowNull: true })
  email: string;

  @Column({ allowNull: true })
  birthdate: string;

  @Column({ allowNull: true })
  birthplace: string;

  // @Column
  // movies: string[];
}
