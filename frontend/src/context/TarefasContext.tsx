import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../lib/axios';
import Tarefa, { TarefaData } from '../model/Tarefa';
import { sortByStatusAndDataCriacao } from '../utils/tarefas';

interface TarefasContextData {
  tarefas: Tarefa[];
  isLoading: boolean;
  fetchAll: () => Promise<void>;
  create: (tarefa: TarefaData) => Promise<void>;
  update: (id: string, tarefa: Partial<TarefaData>) => Promise<void>;
}

const TarefasContext = createContext<TarefasContextData>(
  {} as TarefasContextData
);

interface IProps {
  children: ReactNode;
}

const handleError = (err: any) => {
  if (err.response) {
    toast.error('Um erro ocorreu: ' + err.response.data.error);
  } else {
    toast.error('Um erro ocorreu!');
  }
};

export const TarefasProvider = ({ children }: IProps) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('tarefas');
      setTarefas(data.tarefas);
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const create = async (tarefa: TarefaData) => {
    try {
      setIsLoading(true);
      const { data } = await api.post<Tarefa>('tarefas', tarefa);
      setTarefas((prev) => {
        const newTarefas = [...prev, data];
        return newTarefas.sort(sortByStatusAndDataCriacao);
      });
      toast.success('Tarefa criada!');
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: string, tarefa: Partial<TarefaData>) => {
    try {
      setIsLoading(true);
      const { data } = await api.patch('tarefas/' + id, tarefa);
      setTarefas((prev) => {
        return prev
          .map((t) => {
            if (t.id == data.id) return data;
            return t;
          })
          .sort(sortByStatusAndDataCriacao);
      });
      toast.success('Tarefa atualizada!');
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TarefasContext.Provider
      value={{
        tarefas,
        isLoading,
        fetchAll,
        create,
        update,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
};

export default TarefasContext;
