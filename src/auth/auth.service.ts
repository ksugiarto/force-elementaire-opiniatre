// Generic Imports
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Service Imports
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Find user on the database
    const user = await this.usersService.findOne(email);

    // Check user password on the database
    const validated = await bcrypt.compare(password, user?.hashedPassword ?? '');

    // User either not found or/and password is wrong
    if (!user || !validated) {
      throw new UnauthorizedException('Either email or password is incorrect');
    };

    // Generate jwt token for bearer when user is exist and password is correct
    const token = await this.jwtService.signAsync({ email: user.email, _id: user.id });

    return { token, user };
  }
}
