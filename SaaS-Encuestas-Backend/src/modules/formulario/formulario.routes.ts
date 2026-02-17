import { Router } from 'express';
import validate from '../../reutilizable/middlewares/validate.middleware.js';
import { createClienteSchema } from './cliente.schema.js';

export default (controller) => {
  const router = Router();

  router.post('/cliente', validate(createClienteSchema), controller.create);
  router.get('/cliente', controller.findAll);
  router.get('/cliente/:id', controller.findById);
  router.put('/cliente/:id', controller.update);
  router.patch('/cliente/:id', controller.patch);
  router.delete('/cliente/:id', controller.delete);

  return router;
};
