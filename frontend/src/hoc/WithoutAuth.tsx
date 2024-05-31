import { Navigate } from 'react-router-dom';

interface IProps {
  Page: any;
}

export default function WithoutAuth({ Page }: IProps) {
  const accessToken = localStorage.getItem('accessToken');
  return !accessToken ? Page : <Navigate to='/' />;
}
