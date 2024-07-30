import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';
// import green from '@material-ui/core/colors/green';

export const TypographyTabelaStyled = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.common.black};
`;

export const TypographyValorParcelaStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
`;

export const TypographyBlackStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.black};
`;
