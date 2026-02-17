import AppError from './AppError';

export class ValidationError extends AppError {
  constructor(errors: unknown) {
    super('Validation error', 400, errors);
  }
}
