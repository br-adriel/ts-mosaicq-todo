import { Plus } from '@phosphor-icons/react';
import * as S from './style';

export default function TasksHeading() {
  return (
    <S.Div>
      <h2>Suas tarefas</h2>
      <button className='secondary' title='Nova tarefa'>
        <Plus size={24} />
        <span className='hide-sm'>Nova tarefa</span>
      </button>
    </S.Div>
  );
}
