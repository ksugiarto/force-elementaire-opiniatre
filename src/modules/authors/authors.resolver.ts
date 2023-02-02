import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './author.dto';
import { Author } from './author.model';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';

@Resolver('authors')
@UseGuards(GqlAuthGuard)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService
  ) {}

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
