import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const { userId } = request.cookies

    console.log(userId);
    
    if (!token || !userId) {
      throw new UnauthorizedException();
    }
  
    try {

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_SECRET,
      });

      request['user'] = payload;
      
    } catch (error) {
      throw new UnauthorizedException();
    }
    
    return true

  }

  public extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
