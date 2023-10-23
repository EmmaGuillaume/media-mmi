import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SUPABASE_AUTH } from '../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: SUPABASE_AUTH })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
