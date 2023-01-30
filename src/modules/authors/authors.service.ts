/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthorDto } from './author.dto';
import { Author } from './author.model';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author) private authorModel: typeof Author,
  ) {}
  
  async findAll(): Promise<Author[]> {
    return this.authorModel.findAll();
  }

  // TODO: Find One

  async create(args: CreateAuthorDto): Promise<Author> {
    console.log('== args:', args);
    const author = await this.authorModel.create({
      ...args
    });

    return author;
  }

  // TODO: Update
  // async update(args: any): Promise<Author> {
  //   const author = await this.authorModel.findByPk();
  //   return author;
  // }

  // TODO: Delete
}
