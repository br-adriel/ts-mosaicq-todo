import { FormField } from '../interfaces/FormField';
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
      defaultValue: {
        label: 'Pendente',
        value: 'PENDENTE',
      },
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
  ] as FormField[],
};
