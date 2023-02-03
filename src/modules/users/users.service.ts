// Generic Imports
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

// Model Imports
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User
  ) {}

  /**
   * Retrieve one User
   * @param email 
   */
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }

  /**
   * Create new User method, used for Sign Up API
   * @param email 
   * @param password 
   */
  async create(email: string, password: string): Promise<User | undefined> {
    // Find existing user
    let user = await this.userModel.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException(`User with email: ${email} already existed`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10).then((r) => r);
    // Create new user
    user = await this.userModel.create({ email, hashedPassword });

    return user;
  }
}
