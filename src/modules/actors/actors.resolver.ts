// Generic Imports
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// Guard Imports
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { ActorGuard } from 'src/common/guards/actor.guard';

// Model & DTO Imports
import { Actor } from './actor.model';
import { CreateActorDto, UpdateActorDto } from './actor.dto';

// Service Imports
import { ActorsService } from './actors.service';

@Resolver('actors')
@UseGuards(GqlAuthGuard)
export class ActorsResolver {
  constructor(
    private readonly actorsService: ActorsService
  ) {}

  /**
   * Retrieve all Actors from database
   */
  @Query('actors')
  async getActors() {
    return this.actorsService.findAll();
  }

  /**
   * Retrieve one Actor by ID
   * @param id 
   */
  @Query('actor')
  @UseGuards(ActorGuard)
  async getActor(
    @Args('id') id: number
  ) {
    return this.actorsService.findOne(id);
  }

  /**
   * Create new Actor
   * @param args
   */
  @Mutation('createActor')
  async create(@Args('createActorInput') args: CreateActorDto): Promise<Actor> {
    console.log('== args:', args);
    const actor = await this.actorsService.create(args);
    return actor;
  }

  /**
   * Update one Actor by ID
   * @param id
   * @param args
   */
  @Mutation('updateActor')
  @UseGuards(ActorGuard)
  async update(
    @Args('id') id: number,
    @Args('updateActorInput') args: UpdateActorDto
  ): Promise<Actor> {
    const actor = await this.actorsService.update(id, args);
    return actor;
  }

  /**
   * Remove one Actor by ID
   * @param id
   */
  @Mutation('removeActor')
  @UseGuards(ActorGuard)
  async remove(
    @Args('id') id: number
  ): Promise<number> {
    return this.actorsService.remove(id);
  }
}
