import { SignOut } from '@phosphor-icons/react';

export default function LogoutButton() {
  const click = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  if (!localStorage.getItem('accessToken')) return null;
  return (
    <button onClick={click} title='Sair'>
      <SignOut size={24} />
    </button>
  );
}
