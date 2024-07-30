import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const HeaderGridContainer = styled(Grid)``;

export const TituloTypographyStyled = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.dark};
  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: space-between;
    text-align: right;
  }
`;

export const ArrowBackIconStyled = styled(ArrowBackIcon)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
