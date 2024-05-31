import { ReactNode, createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../lib/axios';
import Tarefa, { TarefaData } from '../model/Tarefa';
import { sortByStatusAndDataCriacao } from '../utils/tarefas';
import AuthContext from './AuthContext';

interface TarefasContextData {
  tarefas: Tarefa[];
  isLoading: boolean;
  fetchAll: () => Promise<void>;
  create: (tarefa: TarefaData) => Promise<void>;
  update: (id: string, tarefa: Partial<TarefaData>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const TarefasContext = createContext<TarefasContextData>(
  {} as TarefasContextData
);

interface IProps {
  children: ReactNode;
}

export const TarefasProvider = ({ children }: IProps) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { updateAuth } = useContext(AuthContext);

  const handleError = (err: any) => {
    if (err.response && err.response.data.error) {
      if (err.status === 401) {
        updateAuth();
      }
      toast.error('Um erro ocorreu: ' + err.response.data.error);
    } else {
      toast.error('Um erro ocorreu!');
    }
  };

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
      throw err;
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
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setIsLoading(true);
      await api.delete('tarefas/' + id);
      setTarefas((prev) => prev.filter((t) => t.id != id));
      toast.success('Tarefa removida!');
    } catch (err: any) {
      handleError(err);
      throw err;
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
        remove,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
};

export default TarefasContext;
