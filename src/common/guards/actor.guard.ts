// General Imports
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Service Imports
import { ActorsService } from 'src/modules/actors/actors.service';

@Injectable()
export class ActorGuard implements CanActivate {
  constructor(private actorsService: ActorsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = GqlExecutionContext.create(context).getArgs();
    const actorId: number = args.id;

    // Check if id provided or not
    if (!actorId) {
      throw new BadRequestException(`id: is required`);
    }

    // Find the actor
    const actor = await this.actorsService.findOne(actorId);

    // Check if actor existing or not
    if (!actor) {
      throw new BadRequestException('Actor not found');
    }

    return true;
  }
}
