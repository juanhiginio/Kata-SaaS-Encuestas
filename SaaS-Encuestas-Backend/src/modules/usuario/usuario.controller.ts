import { Request, Response, NextFunction } from 'express';
import { toUsuarioResponse } from './usuario.mapper';
import UsuarioService from './usuario.service';
import { usuarioPatchSchema } from './usuario.schema';

export default class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = await this.usuarioService.create(req.body);
      res.status(201).json(toUsuarioResponse(usuario));
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const usuarios = await this.usuarioService.findAll();
      res.json(usuarios.map(toUsuarioResponse));
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const usuario = await this.usuarioService.findById(req.params.id);
      res.json(toUsuarioResponse(usuario));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const usuario = await this.usuarioService.update(req.params.id, req.body);
      res.json(toUsuarioResponse(usuario));
    } catch (error) {
      next(error);
    }
  };

  patch = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const data = usuarioPatchSchema.parse(req.body);
      const usuario = await this.usuarioService.patch(req.params.id, data);
      res.json(toUsuarioResponse(usuario));
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      await this.usuarioService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
