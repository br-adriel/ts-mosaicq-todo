import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../components/AuthForm';
import AuthPageLayout from '../components/AuthPageLayout';
import Loading from '../components/Loading';
import { loginForm } from '../forms/login-form';
import { api } from '../lib/axios';
import { LoginFormValues } from '../types/Auth';

export default function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const fazerLogin = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const { data } = await api.post<LoginResponse>('auth/login', values);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/');
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout>
      <h2>Fazer login</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <AuthForm onSubmit={fazerLogin} formObject={loginForm} />
      )}
    </AuthPageLayout>
  );
}
