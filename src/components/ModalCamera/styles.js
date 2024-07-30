import styled from 'styled-components';

import { Close, HelpOutlineSharp } from '@material-ui/icons';

export const Container = styled.div`
  position: fixed;
  background-color: #000;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1100;
`;

export const Footer = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;

export const Capture = styled.button`
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  border: solid 3px #ffff;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
`;

export const CloseStyled = styled(Close)`
  color: #ffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const HelpStyled = styled(HelpOutlineSharp)`
  color: #ffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
`;

export const Mask = styled.div`
  position: relative;
  margin: 0 auto;
  overflow: hidden;

  :after {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 70%;
    height: 70%;
    border-radius: 10px;
    border: 10px solid ${({ theme }) => theme.palette.secondary.dark};
    box-shadow: 0px 0px 0px 2000px rgb(0 0 0 / 70%);
  }
`;
