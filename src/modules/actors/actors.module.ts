import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Actor } from './actor.model';
import { ActorsResolver } from './actors.resolver';
import { ActorsService } from './actors.service';

@Module({
  imports: [SequelizeModule.forFeature([Actor])],
  providers: [ActorsService, ActorsResolver],
  exports: []
})
export class ActorsModule {}
