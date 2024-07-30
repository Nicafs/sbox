import Grid from 'components/MaterialUI/Grid';
import styled, { css } from 'styled-components';

import grey from '@material-ui/core/colors/grey';
import TableCell from '@material-ui/core/TableCell';

import { red, green } from '../../MaterialUI/Colors';

export const LabelStatus = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${green[500]};
  padding: 4px 8px;
  color: ${green[500]};
  display: inline-block;
  margin-left: 10px;
`;

export const TituloHeaderTabela = styled.p`
  font-size: 20px;
  margin-top: 0px;
  color: ${grey[500]};
`;

export const TabelaTextoStyled = styled.p`
  font-size: 18px;
  margin: 0;
`;

export const GridItemStyled = styled(Grid)`
  margin-bottom: 8px;
`;

export const TableCellStyled = styled(TableCell)``;

export const CelulaStyled = styled.div`
  ${({ theme, id, value }) =>
    id === 'status' &&
    css`
      background-color: ${value === 'PAGO' ? green[400] : red[400]};
      color: ${theme.palette.common.white}
      padding: 6px;
      border-radius: 4px;
      font-weight: bold;
      min-width: 100px;
      display: inline-block;
      text-align: center;
  `}
`;
