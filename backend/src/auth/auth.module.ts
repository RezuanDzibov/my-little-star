import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { RefreshToken } from '@/auth/entities/refresh-tokens.entity';
import { UsersModule } from '@/users/users.module';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([RefreshToken, User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ConfigService, User],
})
export class AuthModule {}
