import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import TarefaForm from '../components/TarefaForm';
import TarefasContext from '../context/TarefasContext';
import { api } from '../lib/axios';
import Tarefa, { TarefaData } from '../model/Tarefa';

export default function UpdateTarefa() {
  const { id } = useParams<{ id: string }>();
  const { update, isLoading } = useContext(TarefasContext);

  const navigate = useNavigate();

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

  const submit = (values: TarefaData) => {
    if (id) {
      update(id, values).then(() => navigate('/tasks/' + id));
    }
  };

  useEffect(() => {
    if (id) {
      getInitialValues(id);
    }
  }, [id]);

  useEffect(() => {
    document.title = 'Atualizar tarefa | Mosaicq Tasks';
  }, []);

  return (
    <Main>
      <Container>
        <Heading>
          <BackButton />
          <h2>Atualizar tarefa</h2>
        </Heading>
        {isLoading ? (
          <Loading message='Salvando...' />
        ) : isStarting ? (
          <Loading />
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
