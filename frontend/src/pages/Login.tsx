import AuthPageLayout from '../components/AuthPageLayout';
import AuthForm from '../components/AuthForm';
import { loginForm } from '../forms/login-form';

export default function Login() {
  return (
    <AuthPageLayout>
      <h2>Fazer login</h2>
      <AuthForm
        onSubmit={(values) => console.log(values)}
        formObject={loginForm}
      />
    </AuthPageLayout>
  );
}
