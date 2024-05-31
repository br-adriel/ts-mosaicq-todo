import AuthForm from '../components/AuthForm';
import AuthPageLayout from '../components/AuthPageLayout';
import { registerForm } from '../forms/register-form';

export default function Register() {
  return (
    <AuthPageLayout>
      <h2>Criar conta</h2>
      <AuthForm
        onSubmit={(values) => console.log(values)}
        formObject={registerForm}
        variant='cadastro'
      />
    </AuthPageLayout>
  );
}
