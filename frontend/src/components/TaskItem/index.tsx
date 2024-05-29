import { Link } from 'react-router-dom';
import Tarefa from '../../model/Tarefa';
import TaskStatusButton, {
  statusContainerClassName,
} from '../TaskStatusButton';
import * as S from './style';

interface IProps {
  tarefa: Tarefa;
}

export default function TaskItem({ tarefa }: IProps) {
  return (
    <S.Div className={statusContainerClassName[tarefa.status]}>
      <TaskStatusButton tarefa={tarefa} />
      <div>
        <Link to={'/tasks/' + tarefa.id}>
          <h3>{tarefa.titulo}</h3>
        </Link>
      </div>
    </S.Div>
  );
}
