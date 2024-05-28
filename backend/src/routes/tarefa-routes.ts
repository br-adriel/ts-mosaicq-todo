import { Router } from 'express';
import TarefaController from '../controllers/tarefa-controller';
import { validateData } from '../middlewares/validation-middleware';
import { createTarefaSchema } from '../schemas/tarefa-schemas';

const tarefaRoutes = Router();

tarefaRoutes.get('/', TarefaController.getAll);
tarefaRoutes.get('/:id', TarefaController.getOne);
tarefaRoutes.post(
  '/',
  validateData(createTarefaSchema),
  TarefaController.create
);

export default tarefaRoutes;
