import { Router } from 'express';
import AuthController from '../controllers/auth-controller';
import { validateData } from '../middlewares/validation-middleware';
import { registerSchema } from '../schemas/auth-schemas';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post(
  '/register',
  validateData(registerSchema),
  AuthController.register
);

export default authRoutes;
