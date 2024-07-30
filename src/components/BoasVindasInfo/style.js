import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const GridContainerStyled = styled(Grid)`
  // padding-top: 20px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-top: 0px;
  }
`;

export const NomeClienteStyled = styled(Typography)`
  font-size: 24px;
`;

export const TituloStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.dark};

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 22px;
  }
`;
