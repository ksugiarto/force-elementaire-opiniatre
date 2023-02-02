// Generic Imports
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * To get the current logged in user on GraphQL
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const { _id, email } = GqlExecutionContext.create(
      context,
    ).getContext().req.user;
    return {
      _id,
      email,
    };
  },
);
