import { PickType } from '@nestjs/swagger';

import { User } from '@/users/entities/user.entity';

export class UpdateUserDto extends PickType(User, ['password']) {}
