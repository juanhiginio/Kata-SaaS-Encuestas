import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errores/AppError";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: Request & { userId?: string },
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token no proporcionado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.userId = decoded.id;

    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
};
