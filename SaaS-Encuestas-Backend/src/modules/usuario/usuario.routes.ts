import { Router } from 'express';
import UsuarioRepository from './usuario.repository';
import UsuarioService from './usuario.service';
import UsuarioController from './usuario.controller';
import validate from '../../shared/middlewares/validate.middleware';
import { createUsuarioSchema } from './usuario.schema';

const router = Router();

const repository = new UsuarioRepository();
const service = new UsuarioService(repository);
const controller = new UsuarioController(service);

router.post('/', validate(createUsuarioSchema), controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

export default router;
