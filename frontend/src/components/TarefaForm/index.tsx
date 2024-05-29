import { Formik } from 'formik';
import { tarefaForm } from '../../forms/tarefa-form';
import { TarefaData } from '../../model/Tarefa';
import FormikFieldRenderer from '../FormikFieldRenderer';
import * as S from './style';

interface IProps {
  onSubmit: (values: TarefaData) => void;
  initialValues?: TarefaData;
}

export default function TarefaForm({ onSubmit, initialValues }: IProps) {
  return (
    <Formik
      initialValues={initialValues || tarefaForm.initialValues}
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
