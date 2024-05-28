import { tarefaFormSchema } from '../schemas/tarefa-form-schema';

export const tarefaForm = {
  initialValues: {
    titulo: '',
    descricao: '',
    status: 'PENDENTE',
  },
  validationSchema: tarefaFormSchema,
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título:',
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descrição:',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status:',
    },
  ],
};
