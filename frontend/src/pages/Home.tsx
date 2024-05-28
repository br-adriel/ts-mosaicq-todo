import styled from 'styled-components';
import Container from '../components/Container';
import TasksHeading from '../components/TasksHeading';
import TasksList from '../components/TasksList';

export default function Home() {
  return (
    <Main>
      <Container>
        <TasksHeading />
        <TasksList />
      </Container>
    </Main>
  );
}

const Main = styled.main`
  margin: 24px 0;
  padding: 0 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  ${Container} {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
