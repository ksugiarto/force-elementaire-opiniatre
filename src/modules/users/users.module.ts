// Generic Imports
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// User related Imports
import { User } from './user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
