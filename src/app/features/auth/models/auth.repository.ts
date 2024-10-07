import { inject, InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SupabaseService } from "@core/services";
import { User } from "@core/models/user";
import { AuthRes, LoginReq, RegisterReq } from "./auth.types";

export interface AuthRepository {
  signUp: (value: RegisterReq) => Observable<User>;
  signIn: (value: LoginReq) => Observable<User>;
}

export const AUTH_PROVIDER = {
  SUPABASE: new InjectionToken<SupabaseService>("AuthProvider", {
    providedIn: "root",
    factory: () => new SupabaseService(inject(HttpClient)),
  }),
};
