import Container from 'components/MaterialUI/Container';
import styled from 'styled-components';

import { Avatar } from '@material-ui/core';

import Grid from '../MaterialUI/Grid';

const GridMenuItensStyled = styled(Grid)`
  color: white;
  margin: 0;
  padding: 0;
  height: 100%;
`;
export { GridMenuItensStyled };

const DivMenuItemStyled = styled.div`
  color: ${props =>
    props.selecionado
      ? ({ theme }) => theme.palette.primary.background
      : ({ theme }) => theme.palette.primary.unselected};
  font-weight: ${props => (props.selecionado ? 'bold' : 'normal')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export { DivMenuItemStyled };

const NomeSpanStyled = styled.span`
  font-weight: normal;
  font-size: 1.5em;
`;
const AvatarStyled = styled(Avatar)`
  margin: 10px;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.palette.primary.selected};
`;

export { NomeSpanStyled, AvatarStyled };

const BoxSubMenu = styled.div`
  padding: 1% 0 0.8% 8%;
  div {
    font-size: 1.2em;
    max-width: 100%;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.primary.selected};
  }
  background-color: white;
  box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, 0.17);
`;
const DivUnderlineSelectorItemStyled = styled.div`
  a {
    font-size: 0.8em;
    color: ${({ selecionado }) =>
      selecionado
        ? ({ theme }) => theme.palette.primary.selected
        : ({ theme }) => theme.palette.primary.unselected};
    font-weight: ${({ selecionado }) => (selecionado ? 'bold' : 'normal')};
  }
  .selector {
    display: flex;
    padding-top: 5%;
    justify-content: center;
  }
`;

const HeaderStyled = styled(Container)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 0;
  margin: 0;
  max-width: 100%;
`;
const LogoHeaderStyled = styled.img`
  left: 0;
  height: 80%;
  position: absolute;
  margin-left: ${({ theme }) => theme.spacing(3)}px;
`;

export {
  BoxSubMenu,
  DivUnderlineSelectorItemStyled,
  HeaderStyled,
  LogoHeaderStyled,
};
