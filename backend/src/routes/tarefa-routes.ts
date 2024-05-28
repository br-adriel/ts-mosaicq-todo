import { Router } from 'express';
import TarefaController from '../controllers/tarefa-controller';

const tarefaRoutes = Router();

tarefaRoutes.get('/', TarefaController.getAll);
tarefaRoutes.get('/:id', TarefaController.getOne);

export default tarefaRoutes;
