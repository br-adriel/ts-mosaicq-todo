import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import Container from '../Container';
import * as S from './style';

export default function Footer() {
  return (
    <S.Footer>
      <Container>
        <div>
          <p>Site desenvolvido como desafio técnico para uma vaga de estágio</p>
        </div>

        <S.Author>
          <div>
            <a
              href='https://www.linkedin.com/in/adriel-fsantos/'
              target='_blank'
              title='LinkedIn'
            >
              <LinkedinLogo size={24} />
            </a>
            <a
              href='https://github.com/br-adriel'
              target='_blank'
              title='Github'
            >
              <GithubLogo size={24} />
            </a>
          </div>
          <p>Adriel Santos, {new Date().getFullYear()}</p>
        </S.Author>
      </Container>
    </S.Footer>
  );
}
