export default interface Tarefa {
  id: string;
  titulo: string;
  descicao: string;
  status: TarefaStatus;
  dataCriacao: string;
}

export type TarefaStatus = 'EM_PROGRESSO' | 'PENDENTE' | 'CONCLUIDA';
