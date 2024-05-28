export default interface Tarefa {
  id: string;
  titulo: string;
  descicao: string;
  status: TarefaStatus;
  dataCriacao: Date;
}

export type TarefaStatus = 'EM_PROGRESSO' | 'PENDENTE' | 'CONCLUIDA';
