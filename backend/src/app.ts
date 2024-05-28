import express from 'express';
import tarefaRoutes from './routes/tarefa-routes';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
app.use('/tarefas', tarefaRoutes);

export default app;
