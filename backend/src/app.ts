import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './lib/swagger/output.json';
import authRoutes from './routes/auth-routes';
import tarefaRoutes from './routes/tarefa-routes';
import { isAuthenticated } from './middlewares/auth-middleware';

const app = express();

// ajustes de segurança
app.use(helmet());
app.disable('x-powered-by');

// swagger
app.use('/api-docs/', serve, setup(swaggerDocument));

// middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
app.use('/tarefas', isAuthenticated, tarefaRoutes);
app.use('/auth', authRoutes);

export default app;
