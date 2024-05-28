import * as Yup from 'yup';

export const tarefaFormSchema = Yup.object().shape({
  titulo: Yup.string()
    .min(1, 'Curto demais, use no mínimo 1 caracter')
    .required('Campo obrigatório'),
  descricao: Yup.string().optional(),
  status: Yup.string()
    .required('Campo obrigatório')
    .oneOf(['PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA'], 'Status inválido'),
});
