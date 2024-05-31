import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

interface IProps {
  Page: any;
}

export default function WithoutAuth({ Page }: IProps) {
  const { accessToken } = useContext(AuthContext);
  return !accessToken ? Page : <Navigate to='/' />;
}
