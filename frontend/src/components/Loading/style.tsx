import styled from 'styled-components';

export const BlankDiv = styled.div`
  width: 100%;
  text-align: center;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 8px;
`;

export const StyledDiv = styled(BlankDiv)`
  padding: 20px;
  border: 1px solid var(--border-color);
`;
