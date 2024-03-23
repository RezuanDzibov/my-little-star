import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private extractToken(req: Request): string {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw new UnauthorizedException('Authorization error');
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractToken(request);

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      });

      request.payload = payload;
    } catch (error) {
      throw new UnauthorizedException('Authorization Error');
    }

    return true;
  }
}
