import styled from 'styled-components';

const Heading = styled.div`
  display: flex;
  gap: 8px;

  h2 {
    flex-grow: 1;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }
`;

export default Heading;
