import { z } from 'zod';

export const loginSchema = z.object({
  nomeUsuario: z
    .string({
      required_error: 'Forneça um nome de usuário',
      invalid_type_error: 'Forneça uma string para o nome de usuário',
    })
    .min(6, 'Deve ter no mínimo 6 caracteres de comprimento'),
  senha: z
    .string({
      required_error: 'Forneça uma senha',
      invalid_type_error: 'Forneça uma string para a senha',
    })
    .min(8, 'Deve ter no mínimo 8 caracteres de comprimento'),
});

export const registerSchema = loginSchema
  .extend({
    confirmacaoSenha: z
      .string({
        required_error: 'Forneça uma confirmação de senha',
        invalid_type_error: 'Forneça uma string para confirmação de senha',
      })
      .min(8, 'Deve ter no mínimo 8 caracteres de comprimento'),
  })
  .refine(({ senha, confirmacaoSenha }) => senha === confirmacaoSenha, {
    message: 'As senhas não correspondem',
    path: ['confirmacaoSenha'],
  });
