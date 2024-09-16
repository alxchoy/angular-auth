import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

type ErrorType = Error | HttpErrorResponse;

@Injectable()
export class AuthErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    const mapHandler: Record<string, (error: Error) => void> = {
      AuthError: this.handleAuthenticationError,
      HttpErrorResponse: this.handleHttpError,
    };

    mapHandler[error.name](error);
  }

  private handleAuthenticationError(err: Error) {
    console.log('Handle AuthError: ', err);
  }

  private handleHttpError(err: Error) {
    const { error } = err as HttpErrorResponse;
    console.log('Handle HttpError: ', error);
  }
}
