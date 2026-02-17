import { z } from 'zod';
import { ROL_USUARIO, ESTADO_USUARIO } from './usuario.enums';

export const createUsuarioSchema = z.object({
  nombre: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  rol: z.enum(Object.values(ROL_USUARIO) as [string, ...string[]]).default(ROL_USUARIO.USER),
  estado: z.enum(Object.values(ESTADO_USUARIO) as [string, ...string[]]).default(ESTADO_USUARIO.ACTIVO),
});

export const updateUsuarioSchema = createUsuarioSchema.partial();

export const usuarioPatchSchema = z.object({
  nombre: z.string().min(3).optional(),
  email: z.string().email().optional(),
  rol: z.enum(Object.values(ROL_USUARIO) as [string, ...string[]]).optional(),
  estado: z.enum(Object.values(ESTADO_USUARIO) as [string, ...string[]]).optional(),
}).strict();
