import { Injectable, InjectionToken } from '@angular/core';
import { AuthRepository } from 'models/auth.repository';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseService implements AuthRepository {
  signUp() {
    return new Observable<any>();
  }

  signIn() {
    return 'login';
  }
}
