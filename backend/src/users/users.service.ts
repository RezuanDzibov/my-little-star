import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseCreatedUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserHelpers } from '@/users/user.helpers';

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

  async create({
    username,
    email,
    ...restUser
  }: CreateUserDto): Promise<ResponseCreatedUserDto> {
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

    const createdUser = await this.userRepository.save({
      username,
      email,
      ...restUser,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, deletedAt, ...restCreatedUser } = createdUser;

    return restCreatedUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
