import styled from 'styled-components';

export const Button = styled.button`
  padding: 8px;

  .done & {
    border-color: var(--btn-color-done);
    color: var(--btn-color-done);
    background-color: var(--btn-bg-done);
  }

  .pending & {
    border-color: var(--btn-color-pending);
    color: var(--btn-color-pending);
    background-color: var(--btn-bg-pending);
  }

  .progress & {
    border-color: var(--btn-color-progress);
    color: var(--btn-color-progress);
    background-color: var(--btn-bg-progress);
  }
`;
