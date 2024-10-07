import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoaderService } from "@core/services/loader.service";
import { environment } from "app/environments/environment";
import { catchError, delay, finalize, of, retry, throwError } from "rxjs";

export const serverInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const retryTimes = 2;
  const delaySecs = 2;

  loaderService.loaderOn();

  return next(req).pipe(
    retry({
      count: retryTimes,
      delay: (error: HttpErrorResponse, retryCount) => {
        return (error.status >= 500 && retryCount <= retryTimes)
          ? of(error).pipe(delay(delaySecs))
          : throwError(() => error);
      },
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    }),
    finalize(() => loaderService.loaderOff()),
  );
};

export const supabaseApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseReq = req.clone({
    headers: req.headers.set("ApiKey", environment.supabaseConfig.key),
  });
  return next(supabaseReq);
};
