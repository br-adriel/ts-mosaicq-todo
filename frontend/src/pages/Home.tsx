import { Plus } from '@phosphor-icons/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import Heading from '../components/Heading';
import TasksList from '../components/TasksList';
import TarefasContext from '../context/TarefasContext';

export default function Home() {
  const { isLoading } = useContext(TarefasContext);
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
        {isLoading ? <h3>Carregando...</h3> : <TasksList />}
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
