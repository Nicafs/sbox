import React from 'react';

import ColunaBasset from '../../assets/images/colunaB.png';
import GrafismoDireitoAsset from '../../assets/images/grafismo-header-direito.svg';
import GrafismoEsquerdoAsset from '../../assets/images/grafismo-header-esquerdo.svg';
import {
  GrafismoDireito,
  GrafismoEsquerdo,
  HashTag,
  SectionBstyled,
  TextoDestaque,
} from '../../containers/Institucional/style';
import Container from '../MaterialUI/Container';
import Grid from '../MaterialUI/Grid';
import Hidden from '../MaterialUI/Hidden';

const SectionQuemSomos = ({ sectionRef }) => (
  <SectionBstyled
    container
    justify="center"
    alignItems="center"
    ref={sectionRef}
  >
    <Hidden mdDown>
      <GrafismoEsquerdo top={1} src={GrafismoEsquerdoAsset} />
      <GrafismoDireito top={1} src={GrafismoDireitoAsset} />
    </Hidden>
    <Container maxWidth="lg">
      <Grid container justify="center" alignItems="center">
        <Grid item container xs={12} md={6} alignItems="center">
          <h1>
            Somos uma plataforma brasileira que faz{' '}
            <TextoDestaque>conexões financeiras</TextoDestaque> entre pessoas{' '}
          </h1>
          <HashTag>#GenteImpulsionandoGente</HashTag>
          <p>
            Em 2018, o Banco Central do Brasil autorizou que operações
            financeiras fossem realizadas através de plataformas digitais
            conhecidas como Fintechs, possibilitando a revolução financeira
            através da descentralização das operações de crédito.
          </p>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} md={6}>
            <img alt="Imagem" src={ColunaBasset} />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  </SectionBstyled>
);

export default SectionQuemSomos;
