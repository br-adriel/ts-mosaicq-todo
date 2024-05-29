import Tarefa from '../model/Tarefa';

export const sortByStatusAndDataCriacao = (a: Tarefa, b: Tarefa) => {
  if (a.status === b.status) {
    return (
      new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
    );
  } else {
    return b.status.localeCompare(a.status);
  }
};
