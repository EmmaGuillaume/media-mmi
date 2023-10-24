import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SUPABASE_AUTH } from '../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth.interceptor';
@Module({
  imports: [PassportModule.register({ defaultStrategy: SUPABASE_AUTH })],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AuthModule {}
