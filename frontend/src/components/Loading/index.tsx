import * as S from './style';

interface IProps {
  message?: string;
  noStyle?: boolean;
}

export default function Loading({
  message = 'Carregando...',
  noStyle = false,
}: IProps) {
  if (noStyle)
    return (
      <S.BlankDiv>
        <h3>{message}</h3>
      </S.BlankDiv>
    );
  return (
    <S.StyledDiv>
      <h3>{message}</h3>
    </S.StyledDiv>
  );
}
