import { registerFormSchema } from '../schemas/register-form-schema';
import { FormObject } from '../types/FormObject';

export const registerForm: FormObject = {
  initialValues: {
    nomeUsuario: '',
    senha: '',
    confirmacaoSenha: '',
  },
  validationSchema: registerFormSchema,
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
    {
      name: 'confirmacaoSenha',
      type: 'password',
      label: 'Confirmação de senha:',
      id: 'confirmacaoSenha',
    },
  ],
};
