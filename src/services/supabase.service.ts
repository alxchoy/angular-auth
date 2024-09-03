import { Injectable, InjectionToken } from '@angular/core';
import { AuthRes, LoginReq, RegisterReq } from '@models';
import { AuthRepository } from 'models/auth.repository';
import { environment } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable, defer, switchMap, of } from 'rxjs';

@Injectable()
export class SupabaseService implements AuthRepository {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.key
    );
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise');
      }, 1000);
    });
  }

  signUp({ email, password }: LoginReq): Observable<AuthRes> {
    const obs$: Observable<AuthRes> = defer(async () => {
      const { data, error } = await this.client.auth.signUp({
        email,
        password,
      });

      console.log(data);
      console.log(error);

      return {
        user: {
          id: data?.user?.id!,
          email: data?.user?.email!,
        },
      };
    });

    return obs$;
  }

  signIn(value: RegisterReq) {
    return 'signIn';
  }
}
