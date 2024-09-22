import { Injectable } from '@angular/core';
import { AuthRes, LoginReq, RegisterReq } from '@models';
import { AuthRepository } from 'models/auth.repository';
import { environment } from '@environments/environment';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

type AuthResSupabase = {
  id: string;
  email: string;
};

@Injectable()
export class SupabaseService implements AuthRepository {
  private client: SupabaseClient;
  private authUrl = `${environment.supabaseConfig.url}/auth/v1`;

  constructor(private http: HttpClient) {
    this.client = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.key
    );
  }

  signUp({ email, password }: LoginReq): Observable<AuthRes> {
    return this.http
      .post<AuthResSupabase>(
        `${this.authUrl}/signup?redirect_to=${encodeURIComponent(
          `${window.location.origin}/home/`
        )}`,
        {
          email,
          password,
        }
      )
      .pipe(map((data) => ({ user: { id: data.id, email: data.email } })));
  }

  signIn({ email, password }: RegisterReq): Observable<AuthRes> {
    return this.http
      .post<AuthResSupabase>(`${this.authUrl}/token?grant_type=password`, {
        email,
        password,
      })
      .pipe(map((data) => ({ user: { id: data.id, email: data.email } })));
  }
}
