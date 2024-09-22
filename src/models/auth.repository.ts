import { inject, InjectionToken } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { RegisterReq, LoginReq, AuthRes } from './auth.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface AuthRepository {
  signUp: (value: LoginReq) => Observable<AuthRes>;
  signIn: (value: RegisterReq) => Observable<AuthRes>;
}

export const AUTH_PROVIDER = {
  SUPABASE: new InjectionToken<SupabaseService>('AuthProvider', {
    providedIn: 'root',
    factory: () => new SupabaseService(inject(HttpClient)),
  }),
};
