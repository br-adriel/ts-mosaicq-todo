import styled from 'styled-components';
import Container from '../Container';

export const Footer = styled.footer`
  background-color: var(--bg-footer);
  color: var(--text-footer);
  font-size: 0.7rem;

  ${Container} {
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
    }
  }
`;

export const Author = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;

  @media screen and (min-width: 768px) {
    align-items: flex-end;
    margin-top: 0;
  }

  div {
    display: flex;
    gap: 4px;
  }

  a {
    color: inherit;
    opacity: 0.7;
    transition: transform 300ms ease-out;
  }

  a:hover {
    transform: scale(0.97);
    opacity: 1;
  }
`;
