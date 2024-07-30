import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

export const GridContainerStyled = styled(Grid)`
  padding: 30px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 100%;
    padding: 0px 15px;
  }
`;
