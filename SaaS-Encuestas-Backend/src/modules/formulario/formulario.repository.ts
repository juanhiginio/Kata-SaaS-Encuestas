import { FormularioModel, IFormulario } from './formulario.model';

export default class FormularioRepository {

  async create(data: Partial<IFormulario>): Promise<IFormulario> {
    return FormularioModel.create(data);
  }

  async findAll(): Promise<IFormulario[]> {
    return FormularioModel.find({ deletedAt: null });
  }

  async findById(id: string): Promise<IFormulario | null> {
    return FormularioModel.findOne({ _id: id, deletedAt: null });
  }

  async update(
    id: string,
    data: Partial<IFormulario>
  ): Promise<IFormulario | null> {

    return FormularioModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: data },
      {
        returnDocument: 'after',
        runValidators: true
      }
    );
  }

  async softDelete(id: string): Promise<void> {
    await FormularioModel.findByIdAndUpdate(id, {
      deletedAt: new Date()
    });
  }
}
