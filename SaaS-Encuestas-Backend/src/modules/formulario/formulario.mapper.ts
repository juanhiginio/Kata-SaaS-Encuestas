import { IFormulario } from './formulario.model';

export const toFormularioResponse = (formulario: IFormulario) => ({
  id: formulario._id,
  titulo: formulario.titulo,
  descripcion: formulario.descripcion,
  usuarioId: formulario.usuarioId,
  preguntas: formulario.preguntas.map(p => ({
    id: p._id,
    titulo: p.titulo,
    requerida: p.requerida,
    orden: p.orden
  })),
  createdAt: formulario.createdAt,
  updatedAt: formulario.updatedAt
});
