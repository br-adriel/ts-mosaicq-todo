import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../lib/axios';
import Tarefa from '../model/Tarefa';

interface TarefasContextData {
  tarefas: Tarefa[];
  isLoading: boolean;
  fetchAll: () => Promise<void>;
  update: (tarefa: Tarefa) => Promise<void>;
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

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('tarefas');
      setTarefas(data.tarefas);
    } catch (err: any) {
      toast.error('Não foi possível recuperar as tarefas.');
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (tarefa: Tarefa) => {
    try {
      const { data } = await api.patch('tarefas/' + tarefa.id, tarefa);
      setTarefas((prev) => {
        return prev
          .map((t) => {
            if (t.id == data.id) return data;
            return t;
          })
          .sort((a, b) => {
            if (a.status === b.status) {
              return (
                new Date(b.dataCriacao).getTime() -
                new Date(a.dataCriacao).getTime()
              );
            } else {
              return b.status.localeCompare(a.status);
            }
          });
      });
    } catch (err: any) {
      toast.error('Não foi possível atualizar a tarefa.');
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <TarefasContext.Provider
      value={{
        tarefas,
        isLoading,
        fetchAll,
        update,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
};

export default TarefasContext;
