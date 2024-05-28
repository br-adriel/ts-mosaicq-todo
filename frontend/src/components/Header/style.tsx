import styled from 'styled-components';
import Container from '../Container';

export const Header = styled.header`
  background-color: var(--bg-header);
  color: var(--text-header);

  ${Container} {
    display: flex;
    justify-content: center;
    padding: 16px;
  }

  h1 {
    font-size: 1.5rem;
  }

  a {
    color: inherit;
  }
`;
