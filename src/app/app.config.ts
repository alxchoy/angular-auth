import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { AuthErrorHandler } from "./core/auth-error-handler";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
  serverInterceptor,
  supabaseApiKeyInterceptor,
} from "@core/interceptors";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        serverInterceptor,
        supabaseApiKeyInterceptor,
      ]),
    ),
    // { provide: ErrorHandler, useClass: AuthErrorHandler },
  ],
};
