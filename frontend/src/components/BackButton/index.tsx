import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className='secondary' title='Voltar' onClick={() => navigate(-1)}>
      <ArrowLeft size={24} />
      <span className='hide-sm'>Voltar</span>
    </button>
  );
}
