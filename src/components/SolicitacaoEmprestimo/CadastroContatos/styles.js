import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

export const ContainerStyled = styled(Grid)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 86.5vh;
  }
  ${({ theme }) => theme.breakpoints.up('xl')} {
    height: 91vh;
  }
`;

export const Titulo = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
  text-align: center;
`;

export const FormContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.background.default};
  align-items: flex-start;
  padding-top: 2rem;
  height: 100%;
`;
