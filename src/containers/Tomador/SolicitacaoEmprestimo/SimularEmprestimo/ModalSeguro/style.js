import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const Icone = styled.img`
  width: 192px;
`;

const Texto = styled.h4`
  text-align: center;
`;

const BotaoContinuarSemSeguro = styled(Link)`
  font-size: 18px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`;

const BotaoContinuarComSeguro = styled(Button)`
  font-weight: bold;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`;

const BotoesAcaoContainer = styled(Grid)``;

export {
  Icone,
  Texto,
  BotaoContinuarSemSeguro,
  BotoesAcaoContainer,
  BotaoContinuarComSeguro,
};
