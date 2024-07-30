import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

const Texto = styled.p`
  font-size: 16px;
  text-align: center;
`;

const GridTexto = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

export { Texto, GridTexto };
