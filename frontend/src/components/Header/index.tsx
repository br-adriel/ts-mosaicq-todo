import { Link } from 'react-router-dom';
import Container from '../Container';
import * as S from './style';
import LogoutButton from '../LogoutButton';

export default function Header() {
  return (
    <S.Header>
      <Container>
        <h1>
          <Link to='/'>MosaicQ Tasks</Link>
        </h1>
        <LogoutButton />
      </Container>
    </S.Header>
  );
}
