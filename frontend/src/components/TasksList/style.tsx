import styled from 'styled-components';

export const NoTasks = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const List = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
