import Grid from 'components/MaterialUI/Grid';
import Link from 'components/MaterialUI/Link';
import styled from 'styled-components';

const Icone = styled.img`
  width: 192px;
`;

const Texto = styled.p`
  font-size: 16px;
`;

const LinkEsqueciSenhaStyled = styled(Link)`
  font-size: 18px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`;

const BotoesAcaoContainer = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column-reverse;
  }
`;

export { Icone, Texto, LinkEsqueciSenhaStyled, BotoesAcaoContainer };
