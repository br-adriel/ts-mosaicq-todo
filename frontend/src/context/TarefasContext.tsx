import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../lib/axios';
import Tarefa from '../model/Tarefa';

interface TarefasContextData {
  tarefas: Tarefa[];
  isLoading: boolean;
  fetchAll: () => Promise<void>;
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
      const { data } = await api.get('tarefas');
      setTarefas(data.tarefas);
    } catch (err: any) {
      toast.error('Não foi possível recuperar as tarefas.');
    } finally {
      setIsLoading(false);
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
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
};

export default TarefasContext;
