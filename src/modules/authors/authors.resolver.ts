import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './author.dto';
import { Author } from './author.model';

@Resolver('authors')
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService
  ) { }
  
  @Query('authors')
  async getAuthors() {
    return this.authorsService.findAll();
  }

  @Mutation('createAuthor')
  async create(@Args('createAuthorInput') args: CreateAuthorDto): Promise<Author> {
    console.log('== args:', args);
    const author = await this.authorsService.create(args);
    return author;
  }
}