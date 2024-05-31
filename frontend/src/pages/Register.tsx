import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthPageLayout from '../components/AuthPageLayout';
import Loading from '../components/Loading';
import AuthContext from '../context/AuthContext';
import { registerForm } from '../forms/register-form';
import { RegisterFormValues } from '../types/auth';

export default function Register() {
  const { isLoading, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = (values: RegisterFormValues) => {
    try {
      register(values).then(() => navigate('/'));
    } catch (err) {}
  };

  return (
    <AuthPageLayout>
      <h2>Criar conta</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <AuthForm
          onSubmit={submit}
          formObject={registerForm}
          variant='cadastro'
        />
      )}
    </AuthPageLayout>
  );
}
