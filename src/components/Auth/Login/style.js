import styled from 'styled-components';

import Link from '@material-ui/core/Link';

import Button from '../../MaterialUI/Button';
import Grid from '../../MaterialUI/Grid';

const ButtonLoginStyled = styled(Button)`
  border-radius: 25px;
  height: 50px;
  width: 100px;
  color: ${({ theme }) => theme.palette.primary.background};
`;
const DivRodapeStyled = styled.div`
  margin-top: 3vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  .pergunta {
    color: ${({ theme }) => theme.palette.primary.unselected};
  }
`;
const GridBotoesStyled = styled(Grid)`
  padding-top: 15px;
`;
const GridEsqueceuSenhaStyled = styled(Grid)`
  padding-top: 15px;
`;
const LinkRodapeStyled = styled(Link)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.5em;
`;
const LinkStyled = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.selected};
`;
const ButtomCadastroStyled = styled(Button)`
  border-radius: 25px;
  height: 50px;
  // width: 130px;
`;

export {
  ButtonLoginStyled,
  DivRodapeStyled,
  GridBotoesStyled,
  GridEsqueceuSenhaStyled,
  LinkRodapeStyled,
  LinkStyled,
  ButtomCadastroStyled,
};
