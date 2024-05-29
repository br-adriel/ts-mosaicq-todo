import {
  CheckCircle,
  Clock,
  HourglassSimpleLow,
  Icon,
  SpinnerGap,
} from '@phosphor-icons/react';
import { useContext, useState } from 'react';
import TarefasContext from '../../context/TarefasContext';
import Tarefa, { TarefaStatus } from '../../model/Tarefa';
import * as S from './style';

interface IProps {
  tarefa: Tarefa;
}

const icons: Record<TarefaStatus, Icon> = {
  PENDENTE: Clock,
  EM_PROGRESSO: SpinnerGap,
  CONCLUIDA: CheckCircle,
};

const titles: Record<TarefaStatus, string> = {
  PENDENTE: 'Pendente, clique para marcar como iniciada',
  EM_PROGRESSO: 'Em progresso, clique para marcar como concluida',
  CONCLUIDA: 'Tarefa concluida, clique para voltar ao estado de pendente',
};

const nextStatus: Record<TarefaStatus, TarefaStatus> = {
  PENDENTE: 'EM_PROGRESSO',
  EM_PROGRESSO: 'CONCLUIDA',
  CONCLUIDA: 'PENDENTE',
};

export default function TaskStatusButton({ tarefa }: IProps) {
  const StatusIcon = icons[tarefa.status];
  const [isLoading, setIsLoading] = useState(false);

  const { update } = useContext(TarefasContext);

  const onClick = async () => {
    setIsLoading(true);
    await update(tarefa.id, { status: nextStatus[tarefa.status] });
    setIsLoading(false);
  };

  return (
    <S.Button type='button' onClick={onClick} title={titles[tarefa.status]}>
      {isLoading ? <HourglassSimpleLow size={24} /> : <StatusIcon size={24} />}
    </S.Button>
  );
}
