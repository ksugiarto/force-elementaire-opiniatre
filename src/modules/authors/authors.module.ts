import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './author.model';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  providers: [AuthorsService, AuthorsResolver],
  exports: []
})
export class AuthorsModule {}
