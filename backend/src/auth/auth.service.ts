import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { PayloadDto, SignInDto } from '@/auth/auth.dto';
import { IGenerateTokensReturn, ISignInAnswer } from '@/auth/auth.interface';
import { RefreshToken } from '@/auth/entities/refresh-tokens.entity';
import { Config } from '@/config/config';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { UserHelpers } from '@/users/user.helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly userHelpers: UserHelpers,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepository: Repository<RefreshToken>,
    private readonly usersService: UsersService,
  ) {}

  private readonly refreshExpiresDaysInMilliseconds =
    +this.configService.getOrThrow('JWT_REFRESH_EXPIRES_DAYS_IN_MILLISECONDS');

  async registration(createUserDto: CreateUserDto): Promise<boolean> {
    const createdUser = await this.usersService.create(createUserDto);

    return !!createdUser;
  }

  async signIn({ login, password }: SignInDto): Promise<ISignInAnswer> {
    const foundUser = await this.userHelpers.findUserByLogin(login);

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('User not authenticated, verify creds');
    }

    const { accessToken, refreshToken } = await this.generateTokens(foundUser);

    return this.addTokenToDB(foundUser, accessToken, refreshToken);
  }

  async refresh(oldRefreshToken: string): Promise<ISignInAnswer> {
    const token = await this.refreshTokensRepository.findOne({
      where: {
        refreshToken: oldRefreshToken,
      },
      relations: ['user'],
    });

    if (!token) {
      throw new UnauthorizedException('Ошибка авторизации');
    }

    const { user } = token;
    const { accessToken, refreshToken } = await this.generateTokens(user);

    return await this.updateTokenInDB(
      user,
      token.id,
      accessToken,
      refreshToken,
    );
  }

  async logout(refreshToken: string) {
    const token = await this.refreshTokensRepository.findOne({
      where: {
        refreshToken,
      },
    });

    if (!token) {
      throw new UnauthorizedException('Ошибка при выходе из аккаунта');
    }

    await this.refreshTokensRepository.remove(token);
  }

  private async generateTokens(user: User): Promise<IGenerateTokensReturn> {
    const payload: PayloadDto = {
      userId: user.id,
      username: user.username,
    };

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        expiresIn: Config.JWT.JWT_ACCESS_EXPIRATION,
        secret: Config.JWT.JWT_ACCESS_SECRET,
      }),
      await this.jwtService.signAsync(payload, {
        expiresIn: Config.JWT.JWT_REFRESH_EXPIRATION,
        secret: Config.JWT.JWT_REFRESH_SECRET,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async addTokenToDB(
    user: User,
    accessToken: string,
    refreshToken: string,
  ): Promise<ISignInAnswer> {
    const expiresIn = await this.getTokenExpiration();

    const savedRefreshToken = await this.refreshTokensRepository
      .create({
        refreshToken,
        user,
        expiresIn,
      })
      .save();

    return {
      accessToken,
      refreshToken: savedRefreshToken.refreshToken,
    };
  }

  private async updateTokenInDB(
    user: User,
    oldRefreshTokenId: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<ISignInAnswer> {
    await this.refreshTokensRepository.delete(oldRefreshTokenId);

    const expiresIn = await this.getTokenExpiration();

    const savedRefreshToken = await this.refreshTokensRepository
      .create({
        refreshToken,
        user,
        expiresIn,
      })
      .save();

    return {
      accessToken,
      refreshToken: savedRefreshToken.refreshToken,
    };
  }

  private async getTokenExpiration(): Promise<Date> {
    return new Date(Date.now() + this.refreshExpiresDaysInMilliseconds);
  }
}
