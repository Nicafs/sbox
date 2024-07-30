import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import CloseIcon from '@material-ui/icons/Close';

export const LogoEmpresa = styled.img`
  border-radius: 50%;
  width: 64px;
  height: 64px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 32px;
    height: 32px;
  }
`;

export const TypographyValorStyled = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
`;

export const TypographyRentabilidadeStyled = styled(Typography)`
  font-size: 16px;
`;

export const TypographyEmpresaStyled = styled(Typography)`
  font-size: 16px;
`;

export const CloseIconStyled = styled(CloseIcon)`
  margin: 2px 6px;
  font-size: 20px;
`;

export const GridInfoStyled = styled(Grid)`
  flex-grow: 1;
`;
