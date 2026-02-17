import { Request, Response, NextFunction } from 'express';
import FormularioService from './formulario.service';
import { toFormularioResponse } from './formulario.mapper';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  userId?: string;
}

import AppError from '../../shared/errores/AppError';
export default class FormularioController {

    constructor(private formularioService: FormularioService) { }

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {

        if (!mongoose.Types.ObjectId.isValid(req.body.usuarioId)) {
            throw new AppError("usuarioId inválido", 400);
        }

        try {
            const formulario = await this.formularioService.create({
                ...req.body,
                usuarioId: req.userId
            });
            res.status(201).json({ message: "Formulario creado correctamente", formulario: toFormularioResponse(formulario) });
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const formularios = await this.formularioService.findAll();
            res.json(formularios.map(toFormularioResponse));
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const formulario = await this.formularioService.findById(req.params.id);
            res.json({message: "Formulario encontrado correctamente", formulario: toFormularioResponse(formulario) });
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const formulario = await this.formularioService.update(
                req.params.id,
                req.body
            );
            res.json({message: "Formulario actualizado correctamente", formulario: toFormularioResponse(formulario) });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            await this.formularioService.delete(req.params.id);
            res.status(204).json({ message: "Formulario eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    };
}
