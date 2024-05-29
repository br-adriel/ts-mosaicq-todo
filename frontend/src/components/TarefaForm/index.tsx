import { Formik } from 'formik';
import { tarefaForm } from '../../forms/tarefa-form';
import FormikFieldRenderer from '../FormikFieldRenderer';
import * as S from './style';
import { TarefaStatus } from '../../model/Tarefa';

export type SubmitValues = {
  titulo: string;
  descricao: string;
  status: {
    label: string;
    value: TarefaStatus;
  };
};

interface IProps {
  onSubmit: (values: SubmitValues) => void;
}

export default function TarefaForm({ onSubmit }: IProps) {
  return (
    <Formik
      initialValues={tarefaForm.initialValues}
      onSubmit={(values: any, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      validationSchema={tarefaForm.validationSchema}
    >
      {({ dirty, isValid }) => {
        return (
          <S.Form>
            {tarefaForm.fields.map((field, i) => (
              <FormikFieldRenderer field={field} key={i} />
            ))}

            <button type='submit' disabled={!isValid || !dirty}>
              Salvar
            </button>
          </S.Form>
        );
      }}
    </Formik>
  );
}
