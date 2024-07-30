import Grid from 'components/MaterialUI/Grid';
import Link from 'components/MaterialUI/Link';
import styled from 'styled-components';

import Button from '../MaterialUI/Button';

const Icone = styled.img`
  width: 192px;
`;

const Texto = styled.p`
  font-size: 28px;
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
