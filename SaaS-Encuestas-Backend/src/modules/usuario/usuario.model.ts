import { Schema, model, Document } from 'mongoose';
import { RolUsuario, EstadoUsuario } from './usuario.enums';

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const usuarioSchema = new Schema<IUsuario>(
  {
    nombre: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    estado: { type: String, enum: ['ACTIVO', 'INACTIVO'], default: 'ACTIVO' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const UsuarioModel = model<IUsuario>('Usuario', usuarioSchema);
