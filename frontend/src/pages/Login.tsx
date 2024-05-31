import AuthPageLayout from '../components/AuthPageLayout';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <AuthPageLayout>
      <h2>Fazer login</h2>
      <LoginForm onSubmit={(values) => console.log(values)} />
    </AuthPageLayout>
  );
}
