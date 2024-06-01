import { Plus } from '@phosphor-icons/react';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import TasksList from '../components/TasksList';
import TarefasContext from '../context/TarefasContext';

export default function Home() {
  const { isLoading, fetchAll } = useContext(TarefasContext);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    document.title = 'Mosaicq Tasks';
  }, []);

  return (
    <Main>
      <Container>
        <Heading>
          <h2>Suas tarefas</h2>
          <Link to='/tasks/add' className='btn secondary' title='Nova tarefa'>
            <Plus size={24} />
            <span className='hide-sm'>Nova tarefa</span>
          </Link>
        </Heading>
        {isLoading ? <Loading /> : <TasksList />}
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
