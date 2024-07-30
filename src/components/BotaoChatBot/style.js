import styled, { keyframes } from 'styled-components';

const animacaoPadrao = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: 150px
  } 
`;

export const Container = styled.div`
  z-index: 999;
  position: fixed;
  left: 16px;
  bottom: 5px;
  width: 150px;
  cursor: pointer;
  transition: 0.5s;
  animation: ${animacaoPadrao} 0.5s;
  max-width: 200px;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const ImagemWhatsapp = styled.img`
  width: 100%;
`;
