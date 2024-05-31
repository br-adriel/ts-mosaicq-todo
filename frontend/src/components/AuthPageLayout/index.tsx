import { PropsWithChildren } from 'react';
import * as S from './style';

export default function AuthPageLayout({ children }: PropsWithChildren) {
  return (
    <S.Main>
      <S.Container>{children}</S.Container>
    </S.Main>
  );
}
