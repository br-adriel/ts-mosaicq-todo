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
  showText?: boolean;
  onClick?: Function;
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

export const statusContainerClassName: Record<TarefaStatus, string> = {
  PENDENTE: 'pending',
  EM_PROGRESSO: 'progress',
  CONCLUIDA: 'done',
};

const labels: Record<TarefaStatus, string> = {
  PENDENTE: 'Pendente',
  EM_PROGRESSO: 'Em progresso',
  CONCLUIDA: 'Concluida',
};

const nextStatus: Record<TarefaStatus, TarefaStatus> = {
  PENDENTE: 'EM_PROGRESSO',
  EM_PROGRESSO: 'CONCLUIDA',
  CONCLUIDA: 'PENDENTE',
};

export default function TaskStatusButton({
  tarefa,
  showText = false,
  onClick,
}: IProps) {
  const StatusIcon = icons[tarefa.status];
  const [isLoading, setIsLoading] = useState(false);

  const { update } = useContext(TarefasContext);

  const click = async () => {
    setIsLoading(true);
    await update(tarefa.id, { status: nextStatus[tarefa.status] });
    setIsLoading(false);
    onClick && onClick();
  };

  return (
    <S.Button type='button' onClick={click} title={titles[tarefa.status]}>
      {isLoading ? <HourglassSimpleLow size={24} /> : <StatusIcon size={24} />}
      {showText && (
        <span>{isLoading ? 'Carregando' : labels[tarefa.status]}</span>
      )}
    </S.Button>
  );
}
