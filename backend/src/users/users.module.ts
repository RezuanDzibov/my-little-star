import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserHelpers } from '@/users/user.helpers';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, UserHelpers],
})
export class UsersModule {}
