import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(value: { email: string; password: string }) {
    console.log('sending...');
    this.auth.signInWithEmailAndPassword(value.email, value.password);
  }

  register(value: { email: string; password: string }) {
    this.auth.createUserWithEmailAndPassword(value.email, value.password);
  }
}
