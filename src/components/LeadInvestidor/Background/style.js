import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const TypographyTituloStyled = styled(Typography)`
  font-size: 4em;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: bold;
`;

export const TypographyParagrafoStyled = styled(Typography)`
  font-size: 2em;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const TypographyFooterStyled = styled(Typography)`
  font-size: 2em;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const GridContainerStyled = styled(Grid)`
  white-space: break-spaces;
  padding-left: 10%;
`;
