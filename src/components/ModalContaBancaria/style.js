import styled from 'styled-components';

import { Grid, Typography } from '@material-ui/core';

export const Icone = styled.img`
  width: 192px;
  margin-bottom: 16px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 16px;
  }
`;

export const Texto = styled.p`
  font-size: 16px;
`;

export const GridContainer = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    text-align: center;
  }
`;

export const DivFormStyled = styled.div`
  width: 100%;
  height: 100%;
  display: ${({ loading }) => (loading ? 'none' : 'block')};
`;

export const TypographyTituloStyled = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 28px;
    margin-bottom: 8px;
  }
`;
