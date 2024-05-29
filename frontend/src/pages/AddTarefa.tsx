import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Heading from '../components/Heading';
import styled from 'styled-components';
import Container from '../components/Container';
import TarefaForm from '../components/TarefaForm';

export default function AddTarefa() {
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
        <TarefaForm />
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
