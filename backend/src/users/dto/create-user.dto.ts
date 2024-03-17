import { User } from '@/users/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(User, [
  'username',
  'email',
  'password',
]) {}

export class ResponseCreatedUserDto extends PickType(User, [
  'username',
  'email',
]) {}
