import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private clientSupabase: SupabaseClient,
  ) {}

  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data) {
      throw new UnauthorizedException();
    }

    if (await this.checkIfUserIsDeleted(data.user.id)) {
      throw new UnauthorizedException();
    }
    request.user = data.user;
    request.user.access_token = token;
    console.log('aaaa', request);
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

  async checkIfUserIsDeleted(user_id: string): Promise<boolean> {
    const { data, error } = await this.clientSupabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .select()
      .single();

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return data.deleted;
  }
}
