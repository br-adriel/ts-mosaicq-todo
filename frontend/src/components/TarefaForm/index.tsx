import { Formik } from 'formik';
import { tarefaForm } from '../../forms/tarefa-form';
import FormikFieldRenderer from '../FormikFieldRenderer';
import * as S from './style';

export default function TarefaForm() {
  const saveTarefa = async (values: any) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={tarefaForm.initialValues}
      onSubmit={saveTarefa}
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
