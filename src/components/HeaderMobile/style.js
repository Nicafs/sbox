import Container from 'components/MaterialUI/Container';
import styled from 'styled-components';

import { Avatar, Drawer, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Dados Pessoa
const AvatarStyled = styled(Avatar)`
  width: 80px;
  height: 80px;
  @media (min-device-width: 600px) {
    width: 150px;
    height: 150px;
  }
  margin: 0 5% 0 5%;
`;

const DivUsuarioStyled = styled.div`
  width: 100%;
  height: 100%;
  @media (max-device-width: 400px) {
    padding: 10% 0 10% 0;
  }
  @media (min-device-width: 400px) {
    padding: 5% 0 5% 0;
  }
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  //box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, 0.17);

  .saldo {
    font-size: 0.8em;
  }
  h5 {
    @media (min-device-width: 450px) {
      font-size: 4em;
    }
    color: white;
  }
`;

export { AvatarStyled, DivUsuarioStyled };

// Drawer
const DrawerStyled = styled(Drawer)`
  div.drawerPaper {
    box-shadow: rgba(0, 0, 0, 0.54) 50px 0px 50px 20px;
  }
  div.drawerPaper {
    border-right: 0;
  }
`;
const GreenDivStyled = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 100%;
  height: fit-content;
  .gridBotoes {
    margin-bottom: 5%;
  }
  .divSeletor0 {
    background-color: #59b159;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //font-weight: bold;
    font-size: 0.9em;
    @media (min-device-width: 700px) {
      font-size: 1.2em;
    }
    border-radius: 25px;
    height: 50px;
    width: 90%;
    .iconDiv {
      padding-right: 5%;
    }
    //box-shadow: 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.2),
    //  0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -0.5px rgba(0, 0, 0, 0.12);
  }
`;
const MainGridDrawerStyled = styled(Grid)`
  width: 80vw;
  height: 100%;
  display: block;
  div.MuiGrid-item {
    width: inherit;
  }
`;

const HeaderStyled = styled(Container)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 2%;
  max-width: 100%;
  box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, 0.17);
  position: fixed;
  top: 0px;
  height: 60px;
  z-index: 5000;
`;
const HeaderStyledFix = styled.div`
  padding-top: 60px;
`;
const LogoHeaderStyled = styled.img`
  width: 32px;
  height: 32px;
  padding: 1% 1% 1% 0;
`;
const MenuIconStyled = styled(MenuIcon)`
  color: white;
  width: 32px;
`;

// Switch
const DivSeletor1Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5% 0 1.5%;
  border-radius: 25px;
  width: inherit;
  height: inherit;
  background-color: ${({ selecionado }) =>
    selecionado ? '#FFFFFF' : '#59b159'};
  color: ${({ selecionado, theme }) =>
    selecionado
      ? theme.palette.primary.selected
      : theme.palette.primary.background};
  transition: 0.3s;
  white-space: pre-line;
`;

export {
  DrawerStyled,
  GreenDivStyled,
  MainGridDrawerStyled,
  DivSeletor1Styled,
  HeaderStyled,
  LogoHeaderStyled,
  MenuIconStyled,
  HeaderStyledFix,
};
