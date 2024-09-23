import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AuthErrorHandler } from '../helpers/auth-error-handler';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  serverErrorInterceptor,
  supabaseApiKeyInterceptor,
} from '@helpers/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([serverErrorInterceptor, supabaseApiKeyInterceptor]),
    ),
    // { provide: ErrorHandler, useClass: AuthErrorHandler },
  ],
};
