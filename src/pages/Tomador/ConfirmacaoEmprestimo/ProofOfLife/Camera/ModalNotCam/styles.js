import styled from 'styled-components';

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.7;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
`;

export const Content = styled.div`
  z-index: 2001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 70px;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;
