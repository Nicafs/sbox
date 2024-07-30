import styled from 'styled-components';

import Paper from '../../../MaterialUI/Paper';
import Typography from '../../../MaterialUI/Typography';

export const InfoTransferenciaTituloTypography = styled(Typography)`
  text-align: center;
`;

export const InfoTransferenciaBodyTypography = styled(Typography)`
  text-align: left;
`;

export const PainelTransferenciaTituloTypography = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
  text-align: left;
`;

export const PainelTransferenciaPaper = styled(Paper)`
  background-color: #f7f7f7;
  padding: ${({ theme }) => theme.spacing(4)}px;
`;
