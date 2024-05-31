import { Router } from 'express';
import AuthController from '../controllers/auth-controller';
import { validateData } from '../middlewares/validation-middleware';
import { refreshSchema, registerSchema } from '../schemas/auth-schemas';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post(
  '/register',
  validateData(registerSchema),
  AuthController.register
);
authRoutes.post(
  '/refresh',
  validateData(refreshSchema),
  AuthController.refresh
);

export default authRoutes;
