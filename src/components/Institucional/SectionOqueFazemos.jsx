import React from 'react';

import ColunaC1asset from '../../assets/images/ColunaC1.png';
import ColunaC2asset from '../../assets/images/ColunaC2.png';
import GrafismoDireitoAsset from '../../assets/images/grafismo-header-direito.svg';
import GrafismoEsquerdoAsset from '../../assets/images/grafismo-header-esquerdo.svg';
import {
  ContainerTextoSectionC,
  GrafismoDireito,
  GrafismoEsquerdo,
  HashTag,
  IconeSectionC,
  ImagemSectionC,
  SectionCstyled,
  TextoDestaque,
} from '../../containers/Institucional/style';
import Container from '../MaterialUI/Container';
import Grid from '../MaterialUI/Grid';
import Hidden from '../MaterialUI/Hidden';

const SectionOqueFazemos = ({ sectionRef, getIcone }) => (
  <SectionCstyled
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
        <Hidden smDown>
          <Grid item md={4}>
            <ImagemSectionC src={ColunaC1asset} />
          </Grid>
        </Hidden>
        <Grid
          item
          container
          xs={12}
          md={4}
          alignItems="center"
          justify="center"
          spacing={5}
        >
          <h1>
            <TextoDestaque>Como</TextoDestaque> gente impulsiona gente?
          </h1>
          <Grid container justify="space-around">
            <Grid item>
              <IconeSectionC src={getIcone('icone-cofre')} />
            </Grid>
            <Grid item>
              <IconeSectionC src={getIcone('icone-transacao')} />
            </Grid>
            <Grid item>
              <IconeSectionC src={getIcone('carteira-small')} />
            </Grid>
          </Grid>
          <ContainerTextoSectionC
            container
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <Grid item md={6}>
              <p>Pessoas que querem rendimentos com taxas maiores que o CDI.</p>
            </Grid>
            <Grid item md={6}>
              <p>
                Pessoas que querem empréstimos com taxas menores que os meios
                tradicionais.
              </p>
            </Grid>
          </ContainerTextoSectionC>
          <Grid container justify="center">
            <Grid item>
              <HashTag>#TodoMundoGanha</HashTag>
            </Grid>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item md={4}>
            <ImagemSectionC src={ColunaC2asset} />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  </SectionCstyled>
);

export default SectionOqueFazemos;
