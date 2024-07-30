import styled from 'styled-components';

import Grid from '../MaterialUI/Grid';

const Icone = styled.img`
  width: 192px;
`;

const Texto = styled.p`
  font-size: 16px;
  margin: 0;
`;

const BotoesAcaoContainer = styled(Grid)`
  justify-content: flex-end;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: center;
  }
`;

export { Icone, Texto, BotoesAcaoContainer };
