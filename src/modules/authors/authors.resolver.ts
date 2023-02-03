// Generic Imports
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// Guard Imports
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { AuthorGuard } from 'src/common/guards/author.guard';

// Model & DTO Imports
import { Author } from './author.model';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

// Service Imports
import { AuthorsService } from './authors.service';

@Resolver('authors')
@UseGuards(GqlAuthGuard)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService
  ) {}

  /**
   * Retrieve all Authors from database
   */
  @Query('authors')
  async getAuthors() {
    return this.authorsService.findAll();
  }

  /**
   * Retrieve one Author by ID
   * @param id 
   */
  @Query('author')
  @UseGuards(AuthorGuard)
  async getAuthor(
    @Args('id') id: number
  ) {
    return this.authorsService.findOne(id);
  }

  /**
   * Create new Author
   * @param args
   */
  @Mutation('createAuthor')
  async create(@Args('createAuthorInput') args: CreateAuthorDto): Promise<Author> {
    const author = await this.authorsService.create(args);
    return author;
  }

  /**
   * Update one Author by ID
   * @param id
   * @param args
   */
  @Mutation('updateAuthor')
  @UseGuards(AuthorGuard)
  async update(
    @Args('id') id: number,
    @Args('updateAuthorInput') args: UpdateAuthorDto
  ): Promise<Author> {
    const author = await this.authorsService.update(id, args);
    return author;
  }

  /**
   * Remove one Author by ID
   * @param id
   */
  @Mutation('removeAuthor')
  @UseGuards(AuthorGuard)
  async remove(
    @Args('id') id: number
  ): Promise<number> {
    return this.authorsService.remove(id);
  }
}
