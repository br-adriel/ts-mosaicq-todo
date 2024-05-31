import styled from 'styled-components';
import Container from '../Container';

export const Header = styled.header`
  background-color: var(--bg-header);
  color: var(--text-header);

  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    gap: 32px;
  }

  h1 {
    font-size: 1.7rem;
  }

  button {
    padding: 8px;
    border: none;
  }

  a {
    color: inherit;
  }
`;
