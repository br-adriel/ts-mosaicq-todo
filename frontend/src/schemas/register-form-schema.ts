import * as Yup from 'yup';

export const registerFormSchema = Yup.object().shape({
  nomeUsuario: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'O nome de usuário precisa ter no mínimo 6 carcateres'),
  senha: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'A senha precisa ter no mínimo 8 caracteres'),
  confirmacaoSenha: Yup.string()
    .required('Campo obrigatório')
    .oneOf([Yup.ref('senha')], 'A senha e a confirmação estão diferentes'),
});
