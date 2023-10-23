import { Body, Controller, Post } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  @Post('authenticate')
  authenticateUser(@Body('accessToken') accessToken: string) {
    if (isValidAccessToken(accessToken)) {
      return { success: true, message: 'Authentication successful' };
    } else {
      return { success: false, message: 'Invalid token' };
    }
  }
}

function isValidAccessToken(accessToken: string): boolean {
  try {
    const decodedToken: JwtPayload = jwt.verify(
      accessToken,
      'your_secret_key',
    ) as JwtPayload;
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp >= currentTime) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}
