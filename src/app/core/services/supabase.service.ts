import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  AuthRepository,
  AuthRes,
  LoginReq,
  RegisterReq,
} from "@features/auth/models";
import { environment } from "@environments/environment";
import { User } from "@core/models/user";

type AuthResSupabase = {
  id: string;
  email: string;
  metadata: { fullName: string; age?: number };
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class SupabaseService implements AuthRepository {
  private client: SupabaseClient;
  private authUrl = `${environment.supabaseConfig.url}/auth/v1`;

  constructor(private http: HttpClient) {
    this.client = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.key,
    );
  }

  signUp({ email, password, fullName }: RegisterReq): Observable<User> {
    return this.http.post<AuthResSupabase>(
      `${environment.supabaseConfig.functionsUrl}/auth-signup`,
      { fullName, email, password },
    ).pipe(
      map((data) => ({
        ...this.mapToUser(data),
        createdAt: data.createdAt,
        updated_at: data.updatedAt,
      })),
    );
  }

  signIn({ email, password }: LoginReq): Observable<User> {
    return this.http
      .post<AuthResSupabase>(`${this.authUrl}/token?grant_type=password`, {
        email,
        password,
      })
      .pipe(map((data) => ({
        ...this.mapToUser(data),
        createdAt: data.createdAt,
        updated_at: data.updatedAt,
      })));
  }

  private mapToUser(data: AuthResSupabase): User {
    return {
      id: data.id,
      email: data.email,
      fullName: data.metadata.fullName,
      age: data.metadata.age,
    };
  }
}
