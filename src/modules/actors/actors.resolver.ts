import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './actor.dto';
import { Actor } from './actor.model';

@Resolver('actors')
export class ActorsResolver {
  constructor(
    private readonly actorsService: ActorsService
  ) {}

  @Query('actors')
  async getActors() {
    return this.actorsService.findAll();
  }

  @Mutation('createActor')
  async create(@Args('createActorInput') args: CreateActorDto): Promise<Actor> {
    console.log('== args:', args);
    const actor = await this.actorsService.create(args);
    return actor;
  }
}
