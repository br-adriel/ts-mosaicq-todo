import styled from 'styled-components';
import DefaultContainer from '../Container';

export const Main = styled.main`
  margin: 24px 0;
  padding: 0 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const Container = styled(DefaultContainer)`
  max-width: 500px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 16px;
  }
`;
