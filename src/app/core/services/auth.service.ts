import { Inject, Injectable, InjectionToken } from "@angular/core";
import { User } from "@core/models/user";
import {
  AUTH_PROVIDER,
  AuthRepository,
  AuthRes,
  LoginReq,
  RegisterReq,
} from "@features/auth/models";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_PROVIDER.SUPABASE) private authRepository: AuthRepository,
  ) {}

  register({ email, password, fullName }: RegisterReq): Observable<User> {
    return this.authRepository.signUp({ email, password, fullName });
  }

  login({ email, password }: LoginReq): Observable<User> {
    return this.authRepository.signIn({ email, password });
  }
}
