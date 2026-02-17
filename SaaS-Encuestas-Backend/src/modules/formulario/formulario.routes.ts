import { Router } from 'express';
import FormularioRepository from './formulario.repository';
import FormularioService from './formulario.service';
import FormularioController from './formulario.controller';
import validate from '../../shared/middlewares/validate.middleware';
import { createFormularioSchema } from './formulario.schema';

import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const router = Router();

const repository = new FormularioRepository();
const service = new FormularioService(repository);
const controller = new FormularioController(service);

router.post('/', authMiddleware, validate(createFormularioSchema), controller.create);
router.get('/', authMiddleware, controller.findAll);
router.get('/:id', authMiddleware, controller.findById);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;
