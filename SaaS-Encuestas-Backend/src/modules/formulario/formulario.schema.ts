import { z } from 'zod';
import {
  TIPO_CLIENTE,
  ESTADO_CLIENTE,
} from './cliente.enums.js';

export const createClienteSchema = z.object({
  nombreCompleto: z.string().min(3),
  documentoIdentidad: z.string().min(5),
  telefono: z.string().optional(),
  correoElectronico: z.string().email().optional(),
  direccion: z.string().optional(),
  tipoCliente: z.enum(Object.values(TIPO_CLIENTE)).optional(),
  estado: z.enum(Object.values(ESTADO_CLIENTE)).default(ESTADO_CLIENTE.ACTIVO),
  observaciones: z.string().optional(),
});

export const updateClienteSchema = createClienteSchema.partial();

export const clientePatchSchema = z.object({
  nombreCompleto: z.string().min(3).optional(),
  telefono: z.string().min(7).optional(),
  correoElectronico: z.string().email().optional(),
  direccion: z.string().optional(),
  tipoCliente: z.enum(Object.values(TIPO_CLIENTE)).optional(),
  estado: z.enum(Object.values(ESTADO_CLIENTE)).optional(),
  observaciones: z.string().optional(),
}).strict();
