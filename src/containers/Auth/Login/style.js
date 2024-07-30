import Container from 'components/MaterialUI/Container';
import styled from 'styled-components';

import { Divider } from '@material-ui/core';

const FormContainerStyled = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  display: flex;
  flex-direction: column;
  @media (min-device-width: 1200px) {
    padding: 30vh 15vw 15vw 10vh;
  }

  @media (min-device-width: 1024px) {
    padding: 15vh 7vw 7vh 5vw;
  }

  @media (min-device-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-device-width: 500px) and (orientation: portrait) {
    flex-direction: column;
    align-items: center;
  }
`;

const FormStyled = styled.form`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

const MainConteinerStyled = styled.div`
  height: 100%;
  margin: 0;
  min-height: 100%;
  padding: 0;
`;
const DivisoriaStyled = styled(Divider)`
  margin-top: 15%;
`;

const ContainerFormStyled = styled(Container)`
  max-width: 100%;
  max-height: 100%;
`;

const Titulo = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
  text-align: center;
`;

export {
  FormContainerStyled,
  FormStyled,
  MainConteinerStyled,
  DivisoriaStyled,
  ContainerFormStyled,
  Titulo,
};
