import { Formik } from 'formik';
import { loginForm } from '../../forms/login-form';
import { LoginFormValues } from '../../types/Auth';
import FormikFieldRenderer from '../FormikFieldRenderer';
import * as S from './style';
import { Link } from 'react-router-dom';

interface IProps {
  onSubmit: (values: LoginFormValues) => void;
}

export default function LoginForm({ onSubmit }: IProps) {
  return (
    <Formik
      initialValues={loginForm.initialValues}
      onSubmit={(values: any, { resetForm }) => {
        onSubmit(values);
        resetForm({
          values: {
            password: '',
          },
        });
      }}
      validationSchema={loginForm.validationSchema}
    >
      {({ dirty, isValid }) => {
        return (
          <S.Form>
            {loginForm.fields.map((field, i) => (
              <FormikFieldRenderer field={field} key={i} />
            ))}

            <p>
              Não possui uma conta? <Link to='/register'>Cadastre-se</Link>!
            </p>

            <button type='submit' disabled={!isValid || !dirty}>
              Entrar
            </button>
          </S.Form>
        );
      }}
    </Formik>
  );
}
