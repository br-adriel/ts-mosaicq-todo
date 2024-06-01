import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import TaskDetails from '../components/TaskDetails';
import TaskStatusBadge from '../components/TaskStatusBadge';
import { api } from '../lib/axios';
import Tarefa from '../model/Tarefa';

export default function Details() {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [tarefa, setTarefa] = useState<Tarefa>();

  const getTarefa = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get<Tarefa>('tarefas/' + id);
      setTarefa(data);
    } catch (err: any) {
      toast.error('Um erro ocorreu ao recuperar a tarefa');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getTarefa();
  }, [id]);

  useEffect(() => {
    document.title = 'Visualizar tarefa | Mosaicq Tasks';
  }, []);

  return (
    <Main>
      <Container>
        {!isLoading && !tarefa ? (
          <Loading message='Tarefa não encontrada' />
        ) : (
          <>
            <Heading>
              <h2>{isLoading ? 'Carregando...' : tarefa!.titulo}</h2>
              {tarefa && (
                <TaskStatusBadge tarefa={tarefa} onClick={getTarefa} />
              )}
            </Heading>
            {isLoading ? <Loading /> : <TaskDetails tarefa={tarefa!} />}
          </>
        )}
      </Container>
    </Main>
  );
}

const Main = styled.main`
  margin: 24px 0;
  padding: 0 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  ${Container} {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
