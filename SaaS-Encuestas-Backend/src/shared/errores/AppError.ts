export default class AppError extends Error {
  public statusCode: number;
  public details?: unknown;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
