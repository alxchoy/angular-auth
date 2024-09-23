import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  LoginReq,
  AuthRepository,
  AUTH_PROVIDER,
  AuthRes,
  RegisterReq,
} from '@features/auth/models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_PROVIDER.SUPABASE) private authRepository: AuthRepository,
  ) {}

  register({ email, password, fullName }: RegisterReq): Observable<AuthRes> {
    return this.authRepository.signUp({ email, password, fullName });
  }

  login({ email, password }: LoginReq): Observable<AuthRes> {
    return this.authRepository.signIn({ email, password });
  }
}
