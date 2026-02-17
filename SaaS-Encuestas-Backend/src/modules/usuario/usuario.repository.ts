import { UsuarioModel, IUsuario } from './usuario.model';

export default class UsuarioRepository {
  async create(data: Partial<IUsuario>) {
    return UsuarioModel.create(data);
  }

  async findAll() {
    return UsuarioModel.find({ deletedAt: null });
  }

  async findById(id: string) {
    return UsuarioModel.findOne({ _id: id, deletedAt: null });
  }

  async findByEmail(email: string) {
    return UsuarioModel.findOne({ email });
  }

  async update(id: string, data: Partial<IUsuario>) {
    return UsuarioModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  }

  async softDelete(id: string) {
    return UsuarioModel.findByIdAndUpdate(id, { deletedAt: new Date() });
  }
}
