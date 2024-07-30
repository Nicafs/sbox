import styled from 'styled-components';

import Button from '../../MaterialUI/Button';
import Paper from '../../MaterialUI/Paper';
import Typography from '../../MaterialUI/Typography';

export const PagamentosPaperStyled = styled(Paper)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)}px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

export const ButtonStyled = styled(Button)`
  ${({ ativo, theme }) =>
    ativo === 'true' &&
    `color: ${theme.palette.primary.main};
     border-color: ${theme.palette.primary.main};`}
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`;

export const InfoTransferenciaTituloTypography = styled(Typography)`
  text-align: center;
`;

export const InfoTransferenciaBodyTypography = styled(Typography)`
  text-align: left;
`;

export const PainelTransferenciaTituloTypography = styled(Typography)`
  font-weight: bold;
`;
