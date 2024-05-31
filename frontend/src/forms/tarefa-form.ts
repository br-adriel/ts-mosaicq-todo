import { FormObject } from '../types/FormObject';
import { tarefaFormSchema } from '../schemas/tarefa-form-schema';

export const tarefaForm: FormObject = {
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
      id: 'titulo',
    },
    {
      name: 'descricao',
      as: 'textarea',
      label: 'Descrição:',
      id: 'descricao',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status:',
      id: 'status',
      options: [
        {
          label: 'Pendente',
          value: 'PENDENTE',
        },
        {
          label: 'Em progresso',
          value: 'EM_PROGRESSO',
        },
        {
          label: 'Concluida',
          value: 'CONCLUIDA',
        },
      ],
    },
  ],
};
