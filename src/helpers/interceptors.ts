import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, retry, throwError } from 'rxjs';

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const retryTimes = 2;
  const delaySecs = 2;

  return next(req).pipe(
    retry({ count: retryTimes, delay: delaySecs * 1000 }),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    })
  );
};

export const supabaseApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseReq = req.clone({
    headers: req.headers.set('ApiKey', environment.supabaseConfig.key),
  });
  return next(supabaseReq);
};
