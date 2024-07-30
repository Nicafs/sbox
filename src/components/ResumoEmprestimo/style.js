import Card from 'components/MaterialUI/Card';
import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

import { Typography } from '@material-ui/core';

export const Titulo = styled.h1`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: normal;
  letter-spacing: 0.8px;
  margin-bottom: 16px;
  text-align: center;
  white-space: nowrap;
`;

export const DataPrimeiraParcela = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: normal;
  letter-spacing: 0.8px;
  margin-bottom: 35px;
  margin-top: 0px;
  text-align: center;

  strong {
    font-size: 20px;
  }
`;

export const Item = styled(Grid)`
  p {
    font-size: 14px;
    margin: 0;
  }

  h1 {
    font-size: 14px;
    margin: 0;
    color: rgba(0, 0, 0, 0.7);
  }

  h2 {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.primary.selected};
    margin: 0;
  }

  span {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
  }
`;

export const ValorParcela = styled.strong.attrs({
  'cy-element': 'valorParcela',
})`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.primary.selected};
  margin: 0;
`;

export const TypographyObsStyled = styled(Typography)`
  font-size: 12px !important;
`;

export const CardStyled = styled(Card)`
  cursor: pointer;
  //height: 100% !important;
  transition: 0.4s;
  padding: 20px;
  margin: 5px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: initial;
  }
`;
