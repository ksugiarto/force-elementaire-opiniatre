// Generic Imports
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Model Imports
import { Actor } from './actor.model';
import { CreateActorDto, UpdateActorDto } from './actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(Actor) private actorModel: typeof Actor,
  ) {}
  
  /**
   * Retrieve all Actors from database
   */
  async findAll(): Promise<Actor[]> {
    return await this.actorModel.findAll();
  }

  /**
   * Retrieve one Actor by ID
   * @param id 
   */
  async findOne(id: number): Promise<Actor | undefined> {
    return await this.actorModel.findByPk(id);
  }

  /**
   * Create new Actor
   * @param args
   */
  async create(args: CreateActorDto): Promise<Actor | undefined> {
    // Create the new Actor
    const actor = await this.actorModel.create({
      ...args
    });

    return actor;
  }

  /**
   * Update one Actor by ID
   * @param id
   * @param args
   */
  async update(id: number, args: UpdateActorDto): Promise<Actor | undefined> {
    // No need to check if actor exist again,
    // since we already use guard on resolver

    // Find the existing actor
    let actor = await this.actorModel.findByPk(id);

    actor.firstName = args.firstName;
    actor.lastName = args.lastName;
    actor.isActive = args.isActive ?? actor.isActive;
    actor.email = args.email;
    actor.birthdate = args.birthdate;
    actor.birthplace = args.birthplace;
    await actor.save();

    return actor;
  }

  /**
   * Remove one Actor by ID
   * @param id
   */
  async remove(id:number): Promise<number | undefined> {
    // No need to check if actor exist again,
    // since we already use guard on resolver
    return await this.actorModel.destroy({ where: { id } });
  }
}
