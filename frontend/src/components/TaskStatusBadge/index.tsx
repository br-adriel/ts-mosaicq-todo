import Tarefa from '../../model/Tarefa';
import TaskStatusButton, {
  statusContainerClassName,
} from '../TaskStatusButton';
import * as S from './style';

interface IProps {
  tarefa: Tarefa;
  onClick?: Function;
}

export default function TaskStatusBadge({ tarefa, onClick }: IProps) {
  return (
    <S.Div className={statusContainerClassName[tarefa.status]}>
      <TaskStatusButton tarefa={tarefa} showText onClick={onClick} />
    </S.Div>
  );
}
