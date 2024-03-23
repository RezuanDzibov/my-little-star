import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '@/users/entities/user.entity';
import { IUserWhereOptions } from '@/users/user.interface';

@Injectable()
export class UserHelpers {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  async hashPassword(
    password: string,
    saltOrRounds: string | number,
  ): Promise<string> {
    return bcrypt.hash(password, saltOrRounds);
  }

  async findUserByLogin(login: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: [{ username: login }, { email: login }],
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async existsUser(whereOptions: IUserWhereOptions): Promise<boolean> {
    const foundUser = await this.userRepository.findOneBy(whereOptions);

    return !!foundUser;
  }
}
