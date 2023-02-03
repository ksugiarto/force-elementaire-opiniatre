// Generic Imports
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Model Imports
import { Actor } from './actor.model';
import { CreateActorDto } from './actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(Actor) private actorModel: typeof Actor,
  ) {}
  
  /**
   * Retrieve all Actors from database
   */
  async findAll(): Promise<Actor[]> {
    return this.actorModel.findAll();
  }

  // TODO: Find One

  /**
   * Create new Actor
   * @param args
   */
  async create(args: CreateActorDto): Promise<Actor> {
    // Create the new Actor
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
