import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const HeaderGridContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.common.white};
  height: 100%;
`;

export const TituloTypographyStyled = styled(Typography)`
  font-size: 18px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: space-between;
    text-align: right;
  }
`;

export const ArrowBackIconStyled = styled(ArrowBackIcon)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
