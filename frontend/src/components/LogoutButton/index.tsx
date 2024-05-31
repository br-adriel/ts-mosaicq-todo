import { SignOut } from '@phosphor-icons/react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function LogoutButton() {
  const { updateAuth, accessToken } = useContext(AuthContext);

  const click = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    updateAuth();
  };

  if (!accessToken) return null;
  return (
    <button onClick={click} title='Sair'>
      <SignOut size={16} />
    </button>
  );
}
