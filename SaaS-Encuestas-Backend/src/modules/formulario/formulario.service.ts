import { IFormulario } from './formulario.model';
import FormularioRepository from './formulario.repository';
import ErrorFactory from '../../shared/errores/error.factory';

export default class FormularioService {

  constructor(private formularioRepository: FormularioRepository) {}

  async create(data: any): Promise<IFormulario> {

    const preguntasConOrden = data.preguntas.map(
      (pregunta: any, index: number) => ({
        ...pregunta,
        orden: index + 1
      })
    );

    return this.formularioRepository.create({
      ...data,
      preguntas: preguntasConOrden
    });
  }

  async findAll(): Promise<IFormulario[]> {
    return this.formularioRepository.findAll();
  }

  async findById(id: string): Promise<IFormulario> {

    const formulario = await this.formularioRepository.findById(id);

    if (!formulario) {
      throw ErrorFactory.notFound('Formulario no encontrado');
    }

    return formulario;
  }

  async update(id: string, data: any): Promise<IFormulario> {

    if (data.preguntas) {
      data.preguntas = data.preguntas.map(
        (pregunta: any, index: number) => ({
          ...pregunta,
          orden: index + 1
        })
      );
    }

    const formulario = await this.formularioRepository.update(id, data);

    if (!formulario) {
      throw ErrorFactory.notFound('Formulario no encontrado');
    }

    return formulario;
  }

  async delete(id: string): Promise<void> {

    const formulario = await this.formularioRepository.findById(id);

    if (!formulario) {
      throw ErrorFactory.notFound('Formulario no encontrado');
    }

    await this.formularioRepository.softDelete(id);
  }
}
