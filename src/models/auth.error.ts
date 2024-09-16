export class AuthError extends Error {
  constructor(message?: string) {
    super(message || 'Authentication failed');
    this.name = 'AuthError';
  }
}
