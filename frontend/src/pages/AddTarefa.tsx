import { ArrowLeft } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import Heading from '../components/Heading';
import TarefaForm, { SubmitValues } from '../components/TarefaForm';
import { api } from '../lib/axios';
import Tarefa from '../model/Tarefa';

export default function AddTarefa() {
  const [isLoading, setIsLoading] = useState(false);

  const save = async (values: SubmitValues) => {
    setIsLoading(true);
    const { data: tarefa } = await api.post<Tarefa>('tarefas', values);
    setIsLoading(false);
    console.log(tarefa);
  };

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
        {isLoading ? <h3>Salvando...</h3> : <TarefaForm onSubmit={save} />}
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
