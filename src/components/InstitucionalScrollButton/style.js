import styled, { keyframes } from 'styled-components';

const jump = keyframes`
  0% {
    margin-bottom: 0px;
  }
  50% {
    margin-bottom: 15px;
  }
  100% {
    margin-bottom: 0px;
  }
`;

export const IconContainer = styled.div`
  position: fixed;
  bottom: 35px;
  background: ${({ theme }) => theme.palette.secondary.main};
  padding: 15px;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 60px;
  min-width: 48px;
  max-height: 60px;
  min-height: 48px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${jump} 0.8s linear infinite;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.4);

  ${({ theme }) => theme.breakpoints.between('sm', 'md')} {
    width: 48px;
    height: 48px;
  }

  &:hover {
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.5);
    transition: 0.3s ease-out;
  }
`;
