import * as S from './style';

interface IProps {
  message?: string;
}

export default function Loading({ message = 'Carregando...' }: IProps) {
  return (
    <S.Div>
      <h3>{message}</h3>
    </S.Div>
  );
}
