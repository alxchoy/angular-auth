import { Injectable } from '@angular/core';
import { AuthRes, LoginReq, RegisterReq } from '@models';
import { AuthRepository } from 'models/auth.repository';
import { environment } from '@environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

type AuthResSupabase = {
  id: string;
  email: string;
};

@Injectable()
export class SupabaseService implements AuthRepository {
  private authUrl = `${environment.supabaseConfig.url}/auth/v1`;

  constructor(private http: HttpClient) {}

  signUp({ email, password }: LoginReq): Observable<AuthRes> {
    return this.http
      .post<AuthResSupabase>(`${this.authUrl}/signup`, { email, password })
      .pipe(map((data) => ({ user: { id: data.id, email: data.email } })));
  }

  signIn(value: RegisterReq) {
    return 'signIn';
  }
}
