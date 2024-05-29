import { CalendarBlank, Pen, Trash } from '@phosphor-icons/react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TarefasContext from '../../context/TarefasContext';
import Tarefa from '../../model/Tarefa';
import * as S from './style';

interface IProps {
  tarefa: Tarefa;
}

export default function TaskDetails({ tarefa }: IProps) {
  const { remove } = useContext(TarefasContext);
  const navigate = useNavigate();

  return (
    <>
      <S.Div>
        <h3>Descrição:</h3>
        <p>{tarefa?.descricao || '-'}</p>
      </S.Div>

      <S.Acoes>
        <div className='date'>
          <p title='Data de adição'>
            <CalendarBlank size={24} />
            {tarefa && new Date(tarefa.dataCriacao).toLocaleDateString()}
          </p>
        </div>

        <div>
          <Link className='btn' to={'update'} title='Editar'>
            <Pen size={20} />
            <span className='hide-sm'>Editar</span>
          </Link>

          <button
            title='Apagar'
            onClick={() => remove(tarefa.id).then(() => navigate('/'))}
          >
            <Trash size={20} />
            <span className='hide-sm'>Apagar</span>
          </button>
        </div>
      </S.Acoes>
    </>
  );
}
