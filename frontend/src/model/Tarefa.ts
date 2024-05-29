export default interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  status: TarefaStatus;
  dataCriacao: string;
}

export type TarefaData = Omit<Omit<Tarefa, 'id'>, 'dataCriacao'>;

export type TarefaStatus = 'EM_PROGRESSO' | 'PENDENTE' | 'CONCLUIDA';
