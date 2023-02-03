// Generic Imports
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Model Imports
import { Author } from './author.model';
import { CreateAuthorDto } from './author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author) private authorModel: typeof Author,
  ) {}
  
  /**
   * Retrieve all Authors from database
   */
  async findAll(): Promise<Author[]> {
    return this.authorModel.findAll();
  }

  // TODO: FindOne

  /**
   * Create new Author
   * @param args
   */
  async create(args: CreateAuthorDto): Promise<Author> {
    // Create the new Author
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
