import { FormObject } from '../types/FormObject';
import { loginFormSchema } from '../schemas/login-form-schema';

export const loginForm: FormObject = {
  initialValues: {
    nomeUsuario: '',
    senha: '',
  },
  validationSchema: loginFormSchema,
  fields: [
    {
      name: 'nomeUsuario',
      type: 'text',
      label: 'Nome de usuário:',
      id: 'nomeUsuario',
    },
    {
      name: 'senha',
      type: 'password',
      label: 'Senha:',
      id: 'senha',
    },
  ],
};
