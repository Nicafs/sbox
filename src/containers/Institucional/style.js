import Card from 'components/MaterialUI/Card';
import Grid from 'components/MaterialUI/Grid';
import styled from 'styled-components';

import devices from '../../commons/constants/devices';

const Section = styled(Grid)`
  min-height: 100vh;
  position: relative;

  @media ${devices.mobile} {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

const SectionAstyled = styled(Section)`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  position: relative;

  p {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 21px;
    text-align: center;
    line-height: 32px;
    margin-top: 40px;
  }
`;

export const GridContainerSectionAstyled = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-top: -80px;
  }
`;

const ContentSectionA = styled(Grid)`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const SectionBstyled = styled(Section)`
  background: ${({ theme }) => theme.palette.secondary.contrastText};

  h1 {
    font-weight: lighter;
    color: ${({ theme }) => theme.palette.primary.selected};
    font-size: 42px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      text-align: center;
    }
  }

  p {
    color: black;
    line-height: 32px;
    font-size: 20px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
      text-align: center;
    }
  }

  img {
    width: 512px;
  }
`;

const IconeSectionC = styled.img`
  width: 52px;
`;

const ImagemSectionC = styled.img`
  width: 380px;
`;

const SectionCstyled = styled(Section)`
  @media ${devices.tablet} {
    justify-content: center;
  }

  h1 {
    font-weight: lighter;
    color: ${({ theme }) => theme.palette.primary.selected};
    font-size: 42px;
    text-align: center;
  }

  p {
    color: black;
    line-height: 24px;
    font-size: 16px;
    text-align: center;
  }
`;

const ContainerTextoSectionC = styled(Grid)`
  @media ${devices.tablet} {
    justify-content: center;
  }
`;

const SectionDstyled = styled(Section)`
  background: ${({ theme }) => theme.palette.secondary.contrastText};

  h1 {
    font-weight: lighter;
    color: ${({ theme }) => theme.palette.primary.selected};
    font-size: 42px;
    text-align: center;
  }

  p {
    color: black;
    line-height: 30px;
    font-size: 20px;
    text-align: center;
    padding: 10px;
  }

  img {
    width: 380px;
  }
`;

const SectionEstyled = styled(Section)`
  h1 {
    font-weight: lighter;
    /* color: ${({ theme }) => theme.palette.primary.selected}; */
    font-size: 32px;
    text-align: center;
    color: black;
    margin-bottom: 80px;
  }
`;

const HashTag = styled.span`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 20px;
  letter-spacing: 0.5px;
  font-weight: bold;
  text-align: left;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-left: auto;
    margin-right: auto;
  }
`;

const TextoDestaque = styled.span`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: 5px;
`;

const TagGenteImpulsionandoGente = styled.span`
  padding: 8px 20px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: ${({ theme }) => theme.palette.secondary.main};
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
`;

export const TituloSectionAstyled = styled.h1`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 56px;
  text-align: center;
  margin: 15px 0px;

  ${({ theme }) => theme.breakpoints.between('sm', 'md')} {
    font-size: 42px;
    margin-top: 0px;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 28px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const CardSectionA = styled(Card)`
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  img {
    width: 128px;
  }

  h1 {
    color: ${({ theme }) => theme.palette.primary.dark};
    margin: 0;
    font-size: 36px;
    text-align: center;
  }

  p {
    color: ${({ theme }) => theme.palette.primary.dark};
    margin: 0;
    font-size: 18px;
  }

  button {
    background: ${({ theme }) => theme.palette.secondary.main};
    color: ${({ theme }) => theme.palette.secondary.contrastText};
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 18px;
    text-transform: capitalize;
    margin-top: 10px;
    transition: 0.1s;
    width: 80%;

    &:hover {
      background: ${({ theme }) => theme.palette.secondary.dark};
      transform: scale(1.03, 1.03);
    }
  }
`;

const CardContentSectionE = styled(Grid)`
  position: relative;

  span {
    padding: 5px 10px;
    color: ${({ theme }) => theme.palette.secondary.contrastText};
    background: ${({ theme }) => theme.palette.primary.main};
    position: absolute;
    height: 30px;
    top: -20px;
    left: 45px;
    font-size: 18px;
  }
`;

const CardSectionE = styled(Card)`
  min-height: 400px;
  width: 100%;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 60%;
  }

  p {
    font-size: 28px;
    padding: 20px 45px;
    margin: 0;
  }
`;

const Grafismo = styled.img`
  position: absolute;
  width: 128px !important;
  top: ${({ top }) => (top ? `${top}px` : 'unset')};
`;

const GrafismoEsquerdo = styled(Grafismo)`
  left: 0;
`;

const GrafismoDireito = styled(Grafismo)`
  right: 0;
`;

const Alert = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  padding: 5px 10px;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  background: ${({ theme }) => theme.palette.secondary.main};
`;

export {
  SectionAstyled,
  TagGenteImpulsionandoGente,
  CardSectionA,
  SectionBstyled,
  TextoDestaque,
  HashTag,
  SectionCstyled,
  IconeSectionC,
  ImagemSectionC,
  SectionDstyled,
  SectionEstyled,
  CardSectionE,
  CardContentSectionE,
  GrafismoEsquerdo,
  GrafismoDireito,
  ContentSectionA,
  ContainerTextoSectionC,
  Alert,
};
