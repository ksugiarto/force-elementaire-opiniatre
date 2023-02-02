// Generic Imports
import { Resolver, Mutation, Args } from '@nestjs/graphql';

// Service Imports
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/users.service';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Sign Up GraphQL endpoint
   * @param email 
   * @param password 
   */
  @Mutation('signup')
  async signup(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    return this.usersService.create(email, password);
  }

  /**
   * Login GraphQL endpoint
   * @param email 
   * @param password 
   */
  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    // Call auth service to check whether user exist and password is correct 
    return this.authService.validateUser(email, password);
  }
}
