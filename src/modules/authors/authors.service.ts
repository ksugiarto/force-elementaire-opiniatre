// Generic Imports
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Model Imports
import { Author } from './author.model';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

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

  /**
   * Retrieve one Author by ID
   * @param id 
   */
  async findOne(id: number): Promise<Author | undefined> {
    return await this.authorModel.findByPk(id);
  }

  /**
   * Create new Author
   * @param args
   */
  async create(args: CreateAuthorDto): Promise<Author | undefined> {
    // Create the new Author
    const author = await this.authorModel.create({
      ...args
    });

    return author;
  }

  /**
   * Update one Author by ID
   * @param id
   * @param args
   */
  async update(id: number, args: UpdateAuthorDto): Promise<Author | undefined> {
    // No need to check if author exist again,
    // since we already use guard on resolver

    // Find the existing author,
    let author = await this.authorModel.findByPk(id);

    author.firstName = args.firstName;
    author.lastName = args.lastName;
    author.isActive = args.isActive ?? author.isActive;
    author.email = args.email;
    author.birthdate = args.birthdate;
    author.birthplace = args.birthplace;
    await author.save();

    return author;
  }

  /**
   * Remove one Author by ID
   * @param id
   */
  async remove(id:number): Promise<number | undefined> {
    // No need to check if author exist again,
    // since we already use guard on resolver
    return await this.authorModel.destroy({ where: { id } });
  }
}
