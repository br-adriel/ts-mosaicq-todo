import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  gap: 8px;

  &.done {
    border-color: var(--btn-color-done);
  }

  &.pending {
    border-color: var(--btn-color-pending);
  }

  &.progress {
    border-color: var(--btn-color-progress);
  }

  div {
    flex-grow: 1;
    font-size: 1.1rem;

    a {
      color: inherit;
    }

    p {
      font-size: 0.9rem;
    }
  }

  @media screen and (min-width: 768px) {
    max-width: calc(50% - 4px);
  }

  @media screen and (min-width: 768px) {
    max-width: calc(25% - 6px);
  }
`;
