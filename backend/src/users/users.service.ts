import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { PaginateDto } from '@/common/dto/paginate.dto';
import { UserHelpers } from '@/users/user.helpers';
import { User } from '@/users/entities/user.entity';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userHelpers: UserHelpers,
  ) {}

  private saltOrRounds: number =
    +this.configService.getOrThrow('SALT_OR_ROUNDS');

  async create({ username, email, ...restUser }: CreateUserDto): Promise<User> {

    const foundUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (foundUser !== null) {
      throw new ConflictException(
        'User with username or password already exists',
      );
    }

    const hashedPassword = await this.userHelpers.hashPassword(
      restUser.password,
      this.saltOrRounds,
    );

    return this.userRepository
      .create({
        username,
        email,
        ...restUser,
        password: hashedPassword,
      })
      .save();
  }

  async findAll(paginateUserDto: PaginateDto) {
    const { page, limit } = paginateUserDto;

    const [users, count] = await this.userRepository.findAndCount({
      skip: Math.max(0, page - 1) * limit,
      take: limit,
      select: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
    });

    return {
      users,
      count,
      page,
    };
  }

  async findOne(userId: string) {
    const foundUser = await this.userHelpers.getUserById(userId);

    const { password, deletedAt, ...restUser } = foundUser;

    return restUser;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userHelpers.getUserById(userId);

    if (!foundUser) {
      throw new ConflictException('User with username or email already exists');
    }

    const updatedUser = this.userRepository.create({
      ...foundUser,
      ...updateUserDto,
    });

    if (updateUserDto?.password) {
      updatedUser.password = await this.userHelpers.hashPassword(
        updateUserDto.password,
        this.saltOrRounds,
      );
    }

    return updatedUser.save();
  }

  async remove(userId: string) {
    const foundUser = await this.userHelpers.getUserById(userId);

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    await foundUser.remove();

    return true;
  }
}
