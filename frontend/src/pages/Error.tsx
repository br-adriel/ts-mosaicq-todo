import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <>
      <Header />
      <Main>
        <h2>Ooops...</h2>
        <p>Erro: {error.statusText || error.message || 'Erro desconhecido'}</p>
        <p>
          Volte a <Link to='/'>página inicial</Link> e tente novamente mais
          tarde
        </p>
      </Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;

  h2 {
    font-size: 2rem;
    margin-bottom: 32px;
  }

  p {
    margin-bottom: 8px;
  }

  a {
    color: var(--btn-bg-primary);
  }
`;
