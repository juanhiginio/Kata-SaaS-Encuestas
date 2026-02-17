import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UsuarioModel } from "../usuario/usuario.model";
import AppError from "../../shared/errores/AppError";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {

  static async register(nombre: string, email: string, password: string) {

    const existingUser = await UsuarioModel.findOne({ email });

    if (existingUser) {
      throw new AppError("El email ya está registrado", 400);
    }

    const usuario = await UsuarioModel.create({
      nombre,
      email,
      password, // se hashea automáticamente en el pre("save")
    });

    const token = jwt.sign(
      { id: usuario._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    };
  }

  static async login(email: string, password: string) {

    const usuario = await UsuarioModel
      .findOne({ email })
      .select("+password");

    if (!usuario) {
      throw new AppError("Credenciales inválidas", 401);
    }

    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
      throw new AppError("Credenciales inválidas", 401);
    }

    const token = jwt.sign(
      { id: usuario._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    };
  }
}
