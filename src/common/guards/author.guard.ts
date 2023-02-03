// General Imports
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Service Imports
import { AuthorsService } from 'src/modules/authors/authors.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private authorsService: AuthorsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = GqlExecutionContext.create(context).getArgs();
    const authorId: number = args.id;

    // Check if id provided or not
    if (!authorId) {
      throw new BadRequestException(`id: is required`);
    }

    // Find the author
    const author = await this.authorsService.findOne(authorId);

    // Check if author existing or not
    if (!author) {
      throw new BadRequestException('Author not found');
    }

    return true;
  }
}
