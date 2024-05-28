import { Router } from 'express';
import TarefaController from '../controllers/tarefa-controller';
import { validateData } from '../middlewares/validation-middleware';
import {
  createTarefaSchema,
  updateTarefaParams,
  updateTarefaSchema,
} from '../schemas/tarefa-schemas';

const tarefaRoutes = Router();

tarefaRoutes.get('/', TarefaController.getAll);
tarefaRoutes.get('/:id', TarefaController.getOne);
tarefaRoutes.post(
  '/',
  validateData(createTarefaSchema),
  TarefaController.create
);
tarefaRoutes.patch(
  '/:id',
  validateData(updateTarefaParams, 'params'),
  validateData(updateTarefaSchema),
  TarefaController.update
);

export default tarefaRoutes;
