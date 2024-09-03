import { InjectionToken } from '@angular/core';
import { FirebaseService } from '@services/firebase.service';
import { SupabaseService } from '@services/supabase.service';
import { RegisterReq, LoginReq, AuthRes } from './auth.types';
import { Observable } from 'rxjs';

export interface AuthRepository {
  signUp: (value: LoginReq) => Observable<AuthRes>;
  signIn: (value: RegisterReq) => string;
}

export const AUTH_PROVIDER = {
  SUPABASE: new InjectionToken<SupabaseService>('AuthProvider', {
    providedIn: 'root',
    factory: () => new SupabaseService(),
  }),
  FIREBASE: new InjectionToken<FirebaseService>('AuthProvider', {
    providedIn: 'root',
    factory: () => new FirebaseService(),
  }),
};
