import Tarefa from '../../model/Tarefa';
import TaskItem from '../TaskItem';
import * as S from './style';

export default function TasksList() {
  const tarefas: Tarefa[] = [];

  if (!tarefas.length)
    return (
      <S.NoTasks>
        <p>Nenhuma tarefa encontrada</p>
      </S.NoTasks>
    );
  return (
    <S.List>
      {tarefas.map((tarefa) => (
        <TaskItem tarefa={tarefa} key={tarefa.id} />
      ))}
    </S.List>
  );
}
