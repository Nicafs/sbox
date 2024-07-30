import styled from 'styled-components';

const LoadingStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  .divLogo {
    width: 120px;
    height: 120px;
  }
  .logo {
    width: 100%;
    height: 100%;
    animation: pulse 3s infinite;
    margin: 0 auto;
    display: table;
    margin-top: 50px;
    animation-direction: alternate;
    -webkit-animation-name: logo;
    animation-name: logo;
  }

  @-webkit-keyframes logo {
    0% {
      -webkit-transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes logo {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default LoadingStyled;
