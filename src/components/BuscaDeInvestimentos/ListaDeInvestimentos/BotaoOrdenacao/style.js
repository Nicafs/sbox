import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const TextoOrdenacaoSelecionada = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.dark};
  cursor: pointer;
`;
