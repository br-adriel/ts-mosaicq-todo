import { CheckCircle, Clock, Icon, SpinnerGap } from '@phosphor-icons/react';
import { TarefaStatus } from '../../model/Tarefa';
import * as S from './style';

interface IProps {
  status: TarefaStatus;
  id: string;
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

const nextStage: Record<TarefaStatus, TarefaStatus> = {
  PENDENTE: 'EM_PROGRESSO',
  EM_PROGRESSO: 'CONCLUIDA',
  CONCLUIDA: 'PENDENTE',
};

export default function TaskStatusButton({ id, status }: IProps) {
  const StatusIcon = icons[status];

  const onClick = async () => {};

  return (
    <S.Button type='button' onClick={onClick} title={titles[status]}>
      <StatusIcon size={24} />
    </S.Button>
  );
}
