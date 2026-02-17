import UsuarioRepository from './usuario.repository';
import AppError from '../../shared/errores/AppError';
import { IUsuario } from './usuario.model';
import ErrorFactory from '../../shared/errores/error.factory';

export default class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) { }

  async create(data: Partial<IUsuario>) {
    const exists = await this.usuarioRepository.findByEmail(data.email?.toLowerCase() || '');
    if (exists) {
      throw ErrorFactory.conflict('El usuario ya existe');
    }

    return this.usuarioRepository.create(data);
  }

  async findAll() {
    return this.usuarioRepository.findAll();
  }

  async findById(id: string) {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw ErrorFactory.notFound('Usuario no encontrado');
    }
    return usuario;
  }

  async update(id: string, data: Partial<IUsuario>): Promise<IUsuario> {
    const usuario = await this.usuarioRepository.update(id, data);

    if (!usuario) {
      throw ErrorFactory.notFound('Usuario no encontrado');
    }

    return usuario;

  }

  async patch(id: string, payload: Partial<IUsuario>): Promise<IUsuario> {
    if (!Object.keys(payload).length) {
      throw ErrorFactory.badRequest('No se enviaron campos para actualizar');
    }

    const usuario = await this.usuarioRepository.update(id, payload);

    if (!usuario) {
      throw ErrorFactory.notFound('Usuario no encontrado');
    }

    return usuario;
  }

  async delete(id: string) {
    await this.findById(id);
    return this.usuarioRepository.softDelete(id);
  }
}
