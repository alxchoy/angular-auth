import { inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupabaseService } from '@core/services';
import { RegisterReq, LoginReq, AuthRes } from './auth.types';

export interface AuthRepository {
  signUp: (value: RegisterReq) => Observable<AuthRes>;
  signIn: (value: LoginReq) => Observable<AuthRes>;
}

export const AUTH_PROVIDER = {
  SUPABASE: new InjectionToken<SupabaseService>('AuthProvider', {
    providedIn: 'root',
    factory: () => new SupabaseService(inject(HttpClient)),
  }),
};
