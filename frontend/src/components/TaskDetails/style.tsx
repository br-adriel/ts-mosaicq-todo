import styled from 'styled-components';

export const Div = styled.div`
  margin-top: 8px;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--border-color);
`;

export const Acoes = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;

  div {
    display: flex;
    gap: 4px;
  }

  .date {
    border-radius: 8px;
    padding: 16px;
    border: 1px solid var(--border-color);
    flex-grow: 1;

    p {
      opacity: 0.6;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9rem;
    }
  }

  div button:last-of-type {
    background-color: #bd2828;
  }
`;
