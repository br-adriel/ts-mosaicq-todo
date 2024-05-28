import { Link } from 'react-router-dom';
import Tarefa, { TarefaStatus } from '../../model/Tarefa';
import TaskStatusButton from '../TaskStatusButton';
import * as S from './style';

interface IProps {
  tarefa: Tarefa;
}

const className: Record<TarefaStatus, string> = {
  PENDENTE: 'pending',
  EM_PROGRESSO: 'progress',
  CONCLUIDA: 'done',
};

export default function TaskItem({ tarefa }: IProps) {
  return (
    <S.Div className={className[tarefa.status]}>
      <TaskStatusButton status={tarefa.status} id={tarefa.id} />
      <div>
        <Link to={'/tasks/' + tarefa.id}>
          <h3>{tarefa.titulo}</h3>
        </Link>
      </div>
    </S.Div>
  );
}
