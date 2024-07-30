import styled from 'styled-components';

import { Grid } from '@material-ui/core';

export const Titulo = styled.h1`
  color: ${({ theme }) => theme.palette.common.black};
  font-size: min(5vw, 22px);
  font-weight: normal;
  margin: 20px auto;
  width: max-content;
  text-align: center;
`;

export const GridArrow = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border-radius: 50%;
  max-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  text-align: center;
  margin: auto;
`;

export const GridResumoAntigo = styled(Grid)`
  border-top-style: solid;
  border-top-width: 8px;
  border-top-color: ${({ theme }) => theme.palette.secondary.main};
`;

export const GridResumoNovo = styled(Grid)`
  border-top-style: solid;
  border-top-width: 8px;
  border-top-color: ${({ theme }) => theme.palette.primary.main};
`;
