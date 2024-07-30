import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export const TituloTypographyStyled = styled(Typography)`
  font-size: 18px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: space-between;
    text-align: center;
  }
`;

export const ArrowBackIconStyled = styled(ArrowBackIcon)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const ArrowForwardIconStyled = styled(ArrowForwardIcon)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
