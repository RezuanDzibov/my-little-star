import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '@/auth/auth.service';
import { SignInDto, SignInResponseDto } from '@/auth/auth.dto';
import { RefreshGuard } from '@/auth/guards/refresh-token.guard';
import { MessageDto } from '@/common/dto/message.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'User registration',
    description: 'User Registration',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User Created',
    type: MessageDto,
  })
  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.registration(createUserDto);

    return result
      ? { message: 'User registered successfully' }
      : { message: 'Something went wrong' };
  }

  @ApiOperation({
    summary: 'Authorization',
    description: 'Authorize and get tokens',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authenticated',
    type: SignInResponseDto,
  })
  @Post('login')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const tokens = await this.authService.signIn(signInDto);

    res.cookie('refreshToken', tokens.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: this.configService.getOrThrow(
        'JWT_REFRESH_EXPIRES_DAYS_IN_MILLISECONDS',
      ),
      sameSite: 'none',
    });
    res.json({ ...tokens });
  }

  @UseGuards(RefreshGuard)
  @ApiOperation({
    summary: 'Update tokens',
    description: 'Update pair of access & refresh tokens',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tokens have been updated',
    type: SignInResponseDto,
  })
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;

    const tokens = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: this.configService.getOrThrow(
        'JWT_REFRESH_EXPIRES_DAYS_IN_MILLISECONDS',
      ),
      sameSite: 'none',
    });
    res.json(tokens);
  }

  @UseGuards(RefreshGuard)
  @ApiOperation({
    summary: 'Logout from account',
    description: 'Logout and delete tokens',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged out',
  })
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;

    await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken').send({ message: 'User logged out' }).end();
  }
}
