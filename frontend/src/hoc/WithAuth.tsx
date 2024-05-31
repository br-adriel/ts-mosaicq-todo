import { Navigate } from 'react-router-dom';

interface IProps {
  Page: any;
}

export default function WithAuth({ Page }: IProps) {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? Page : <Navigate to='/login' />;
}
