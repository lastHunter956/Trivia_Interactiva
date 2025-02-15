import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request as Req } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const payloand = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = request.user = {
        userId: payloand.userId,
        email: payloand.email,
        type_user: payloand.type_user,
      } as any;
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
  private extractTokenFromHeader(request: Req): string {
    if (!request.headers.authorization) {
      return undefined;
    }
    const [bearer, token] = request.headers.authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return undefined;
    }
    return token;
  }
}