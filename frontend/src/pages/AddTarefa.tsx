import { ArrowLeft } from '@phosphor-icons/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import Heading from '../components/Heading';
import TarefaForm from '../components/TarefaForm';
import TarefasContext from '../context/TarefasContext';

export default function AddTarefa() {
  const { create, isLoading } = useContext(TarefasContext);

  return (
    <Main>
      <Container>
        <Heading>
          <Link to='/' className='btn secondary' title='Voltar'>
            <ArrowLeft size={24} />
            <span className='hide-sm'>Voltar</span>
          </Link>
          <h2>Adicionar tarefa</h2>
        </Heading>
        {isLoading ? <h3>Salvando...</h3> : <TarefaForm onSubmit={create} />}
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
