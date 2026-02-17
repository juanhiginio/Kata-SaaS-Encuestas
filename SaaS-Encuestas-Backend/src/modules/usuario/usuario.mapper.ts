import { IUsuario } from './usuario.model';

export const toUsuarioResponse = (usuario: IUsuario) => ({
  id: usuario._id,
  nombre: usuario.nombre,
  email: usuario.email,
  rol: usuario.rol,
  estado: usuario.estado,
  createdAt: usuario.createdAt,
  updatedAt: usuario.updatedAt,
});
