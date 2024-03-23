import { PickType } from '@nestjs/swagger';

import { User } from '@/users/entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'username',
  'email',
  'password',
]) {}

export class ResponseCreatedUserDto extends PickType(User, [
  'username',
  'email',
  'createdAt',
  'updatedAt',
  'id',
]) {}
