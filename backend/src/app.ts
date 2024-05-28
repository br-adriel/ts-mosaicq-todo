import express from 'express';
import tarefaRoutes from './routes/tarefa-routes';

const app = express();

app.use('/tarefas', tarefaRoutes);

export default app;
