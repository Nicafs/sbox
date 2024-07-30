import Container from 'components/MaterialUI/Container';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

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

const TypographyTitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;
`;

const HeaderMobileStyled = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  height: ${({ theme }) => theme.spacing(8)}px;
  justify-content: center;
`;

const HeaderDesktopStyled = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding-left: 20%;
`;

const MainContainerStyled = styled.div`
  height: 100%;
  margin: 0;
  min-height: 100%;
  padding: 0;
  white-space: break-spaces;
`;

const HeaderTextDesktopStyled = styled.p`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 4em;
  font-weight: bold;
`;

const HeaderTextStyled = styled.p`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 20px;
  font-weight: bold;
  margin: auto;
`;

const HeaderTextDescStyled = styled.p`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 2em;
  font-weight: lighter;
`;

const ContainerFormStyled = styled(Container)`
  max-width: 100%;
  max-height: 100%;
`;

const HeaderAuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  align-items: center;
`;

export {
  ContainerFormStyled,
  FormContainerStyled,
  HeaderAuthDiv,
  HeaderDesktopStyled,
  HeaderMobileStyled,
  HeaderTextDescStyled,
  HeaderTextDesktopStyled,
  HeaderTextStyled,
  MainContainerStyled,
  TypographyTitleStyled,
};
