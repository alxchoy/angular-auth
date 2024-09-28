import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  AuthRes,
  AuthRepository,
  LoginReq,
  RegisterReq,
} from '@features/auth/models';
import { environment } from '@environments/environment';

type AuthResSupabase = {
  id: string;
  email: string;
};

@Injectable()
export class SupabaseService implements AuthRepository {
  // currentUser$: Observable<User>;
  private client: SupabaseClient;
  private authUrl = `${environment.supabaseConfig.url}/auth/v1`;

  constructor(private http: HttpClient) {
    this.client = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.key,
    );
  }

  signUp({ email, password, fullName }: RegisterReq): Observable<AuthRes> {
    return this.http
      .post<AuthResSupabase>(
        `${this.authUrl}/signup?redirect_to=${encodeURIComponent(
          `${window.location.origin}/home/`,
        )}`,
        {
          email,
          password,
          data: { full_name: fullName },
        },
      )
      .pipe(map((data) => ({ user: { id: data.id, email: data.email } })));
  }

  signIn({ email, password }: LoginReq): Observable<AuthRes> {
    return this.http
      .post<AuthResSupabase>(`${this.authUrl}/token?grant_type=password`, {
        email,
        password,
      })
      .pipe(map((data) => ({ user: { id: data.id, email: data.email } })));
  }
}
