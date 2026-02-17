import { Schema, model, Document } from 'mongoose';
import { RolUsuario, EstadoUsuario } from './usuario.enums';

import bcrypt from "bcrypt";
import { NextFunction } from 'express';

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  rol: RolUsuario;
  estado: EstadoUsuario;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const usuarioSchema = new Schema<IUsuario>(
  
  {
    nombre: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    rol: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    estado: { type: String, enum: ['ACTIVO', 'INACTIVO'], default: 'ACTIVO' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Middleware para hashear la contraseña antes de guardar
usuarioSchema.pre("save", async function (this: IUsuario) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const UsuarioModel = model<IUsuario>("Usuario", usuarioSchema);
