import { ArrowLeft } from '@phosphor-icons/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import Heading from '../components/Heading';
import TarefaForm from '../components/TarefaForm';
import TarefasContext from '../context/TarefasContext';
import { api } from '../lib/axios';
import Tarefa, { TarefaData } from '../model/Tarefa';

export default function UpdateTarefa() {
  const { id } = useParams<{ id: string }>();

  const { update, isLoading } = useContext(TarefasContext);

  const [isStarting, setIsStarting] = useState(true);
  const [initialValues, setInitialValues] = useState<TarefaData>({
    titulo: '',
    descricao: '',
    status: 'PENDENTE',
  });

  const getInitialValues = async (id: string) => {
    setIsStarting(true);
    const { data } = await api.get<Tarefa>('tarefas/' + id);
    setInitialValues({
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status,
    });
    setIsStarting(false);
  };

  const submit = async (values: TarefaData) => {
    if (id) {
      await update(id, values);
      getInitialValues(id);
    }
  };

  useEffect(() => {
    if (id) {
      getInitialValues(id);
    }
  }, [id]);

  return (
    <Main>
      <Container>
        <Heading>
          <Link to='/' className='btn secondary' title='Voltar'>
            <ArrowLeft size={24} />
            <span className='hide-sm'>Voltar</span>
          </Link>
          <h2>Atualizar tarefa</h2>
        </Heading>
        {isLoading ? (
          <h3>Salvando...</h3>
        ) : isStarting ? (
          <h3>Carregando...</h3>
        ) : (
          <TarefaForm onSubmit={submit} initialValues={initialValues} />
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
