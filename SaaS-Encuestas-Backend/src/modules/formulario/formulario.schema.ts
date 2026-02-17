import { z } from 'zod';

export const preguntaSchema = z.object({
  titulo: z.string().min(1),
  requerida: z.boolean().default(false)
});

export const createFormularioSchema = z.object({
  titulo: z.string().min(3),
  descripcion: z.string().optional(),
  usuarioId: z.string(),
  preguntas: z.array(preguntaSchema).min(1)
});

export const updateFormularioSchema = createFormularioSchema.partial();
