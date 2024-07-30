import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

export const GridTomadorStyled = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: center;
    margin-top: 30px;
  }
`;

export const TypographyBlackStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.black};
`;
