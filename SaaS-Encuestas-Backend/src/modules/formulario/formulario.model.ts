import { Schema, model, Types, Document } from 'mongoose';

export interface IPregunta {
  _id?: Types.ObjectId;
  titulo: string;
  requerida: boolean;
  orden: number;
}

export interface IFormulario extends Document {
  titulo: string;
  descripcion?: string;
  usuarioId: Types.ObjectId;
  preguntas: IPregunta[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const preguntaSchema = new Schema<IPregunta>(
  {
    titulo: { type: String, required: true },
    requerida: { type: Boolean, default: false },
    orden: { type: Number, required: true }
  },
  { _id: true }
);

const formularioSchema = new Schema<IFormulario>(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String },
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    preguntas: {
      type: [preguntaSchema],
      validate: {
        validator: (value: IPregunta[]) => value.length > 0,
        message: 'El formulario debe tener al menos una pregunta'
      }
    },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export const FormularioModel = model<IFormulario>(
  'Formulario',
  formularioSchema
);
