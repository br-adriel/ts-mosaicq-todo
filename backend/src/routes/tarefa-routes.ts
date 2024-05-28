import { Router } from 'express';
import TarefaController from '../controllers/tarefa-controller';

const tarefaRoutes = Router();

tarefaRoutes.get('/', TarefaController.getAll);

export default tarefaRoutes;
