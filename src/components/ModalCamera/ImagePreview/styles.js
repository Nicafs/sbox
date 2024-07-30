import styled from 'styled-components';

import { Close, Check } from '@material-ui/icons';

export const Image = styled.img`
  max-width: 75%;
`;

export const CloseStyled = styled(Close)`
  font-size: 70px;
  color: #ff0000;
  border: solid #ff0000 1px;
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 600px) {
    margin-left: 50px;
    margin-bottom: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;

export const CheckStyled = styled(Check)`
  font-size: 70px;
  color: #04b74d;
  border: solid #04b74d 1px;
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 600px) {
    margin-right: 50px;
    margin-bottom: 50px;
    position: fixed;
    bottom: 0;
    right: 0;
  }
`;

export const Container = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100002;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  padding: 0 10px;
`;
