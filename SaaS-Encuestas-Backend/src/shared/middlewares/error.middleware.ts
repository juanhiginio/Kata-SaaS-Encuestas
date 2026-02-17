import { Request, Response, NextFunction } from 'express';
import AppError from '../errores/AppError';

export default function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details ?? undefined,
    });
  }

  console.error('UNEXPECTED ERROR:', err);

  return res.status(500).json({
    message: 'Internal server error',
  });
}
