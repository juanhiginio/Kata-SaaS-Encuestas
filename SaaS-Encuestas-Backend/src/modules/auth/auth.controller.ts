import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {

  static async register(req: Request, res: Response) {

    const { nombre, email, password } = req.body;

    const result = await AuthService.register(
      nombre,
      email,
      password
    );

    return res.status(201).json({ message: "Usuario registrado correctamente", ...result });
  }

  static async login(req: Request, res: Response) {

    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    return res.json({ message: "Login exitoso", ...result });
  }
}
