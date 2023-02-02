// Generic Imports
import { Column, IsEmail, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @IsEmail
  @Column
  email: string;

  @Column
  hashedPassword: string;
}
