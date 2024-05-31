import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthPageLayout from '../components/AuthPageLayout';
import Loading from '../components/Loading';
import AuthContext from '../context/AuthContext';
import { loginForm } from '../forms/login-form';
import { LoginFormValues } from '../types/auth';

export default function Login() {
  const { isLoading, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = (values: LoginFormValues) => {
    try {
      login(values).then(() => navigate('/'));
    } catch (err) {}
  };

  return (
    <AuthPageLayout>
      <h2>Fazer login</h2>
      {isLoading ? (
        <Loading noStyle />
      ) : (
        <AuthForm onSubmit={submit} formObject={loginForm} />
      )}
    </AuthPageLayout>
  );
}
