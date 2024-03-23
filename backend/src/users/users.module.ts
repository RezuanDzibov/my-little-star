import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/users/entities/user.entity';
import { UserHelpers } from '@/users/user.helpers';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/users.controller';

@Module({
  exports: [UsersService, UserHelpers],
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, UserHelpers],
})
export class UsersModule {}
