import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

export const GridContainerStyled = styled(Grid)`
  width: 100%;
  padding: 0;
`;

export const GridStepperContainerStyled = styled(Grid)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-bottom: 90px;
  }
`;

export const ContainerStyled = styled(Container)`
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 0px;
    padding-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

export const GridHeaderStyled = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-bottom: 0px !important;
  }
`;
