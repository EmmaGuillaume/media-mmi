import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    console.log('token', token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log('decoded', decoded);
      request.user = decoded;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request): string | null {
    if (!request.headers.authorization) {
      return null;
    }

    const auth = request.headers.authorization;

    if (auth.split(' ')[0] !== 'Bearer') {
      return null;
    }

    return auth.split(' ')[1];
  }
}
