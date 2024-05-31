import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { FormObject } from '../../types/FormObject';
import FormikFieldRenderer from '../FormikFieldRenderer';
import * as S from './style';

interface IProps {
  onSubmit: (values: any) => void;
  formObject: FormObject;
  variant?: 'login' | 'cadastro';
}

export default function AuthForm({
  onSubmit,
  formObject,
  variant = 'login',
}: IProps) {
  return (
    <Formik
      initialValues={formObject.initialValues}
      onSubmit={(values: any, { resetForm }) => {
        onSubmit(values);
        if (variant == 'login') {
          resetForm({
            values: {
              senha: '',
            },
          });
        }
      }}
      validationSchema={formObject.validationSchema}
    >
      {({ dirty, isValid }) => {
        return (
          <S.Form>
            {formObject.fields.map((field, i) => (
              <FormikFieldRenderer field={field} key={i} />
            ))}

            {variant == 'login' ? (
              <p>
                Não possui uma conta? <Link to='/register'>Cadastre-se</Link>!
              </p>
            ) : (
              <p>
                Já possui uma conta? <Link to='/login'>Faça login</Link>!
              </p>
            )}

            <button type='submit' disabled={!isValid || !dirty}>
              {variant == 'login' ? 'Entrar' : 'Cadastrar-se'}
            </button>
          </S.Form>
        );
      }}
    </Formik>
  );
}
