/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateActorDto } from './actor.dto';
import { Actor } from './actor.model';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(Actor) private actorModel: typeof Actor,
  ) {}
  
  async findAll(): Promise<Actor[]> {
    return this.actorModel.findAll();
  }

  // TODO: Find One

  async create(args: CreateActorDto): Promise<Actor> {
    console.log('== args:', args);
    const actor = await this.actorModel.create({
      ...args
    });

    return actor;
  }

  // TODO: Update
  // async update(args: any): Promise<Actor> {
  //   const actor = await this.actorModel.findByPk();
  //   return actor;
  // }

  // TODO: Delete
}
