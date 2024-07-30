import Typography from 'components/MaterialUI/Typography';
import styled from 'styled-components';

const TitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const SubtitleStyled = styled(Typography)``;

const FormContainerStyled = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: column;

  @media (min-device-width: 1200px) {
    padding: 30vh 15vw 15vw 10vh;
  }

  @media (min-device-width: 960px) {
    padding: 4vh 4vw 4vh 5vw;
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
  width: 100%;
  height: 100%;
  padding: 10%;
  position: fixed;
`;

const MainContainerStyled = styled.div`
  height: 100%;
  margin: 0;
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

export {
  TitleStyled,
  SubtitleStyled,
  FormContainerStyled,
  HeaderDesktopStyled,
  HeaderMobileStyled,
  HeaderTextDescStyled,
  HeaderTextDesktopStyled,
  HeaderTextStyled,
  MainContainerStyled,
};
