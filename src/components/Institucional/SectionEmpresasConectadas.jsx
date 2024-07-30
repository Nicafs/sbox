import React from 'react';

import LogoMagazineLuizaAsset from '../../assets/images/empresa-magazine-luiza.png';
import GrafismoDireitoAsset from '../../assets/images/grafismo-header-direito.svg';
import GrafismoEsquerdoAsset from '../../assets/images/grafismo-header-esquerdo.svg';
import {
  CardContentSectionE,
  CardSectionE,
  GrafismoDireito,
  GrafismoEsquerdo,
  SectionEstyled,
} from '../../containers/Institucional/style';
import Container from '../MaterialUI/Container';
import Grid from '../MaterialUI/Grid';
import GridList from '../MaterialUI/GridList';
import Hidden from '../MaterialUI/Hidden';

const SectionEmpresasConectadas = ({ sectionRef, nomeOrganizacao }) => (
  <SectionEstyled
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
      <h1>Empresas conectadas</h1>
      <GridList container spacing={3}>
        <Grid item xs={12} md={4}>
          <CardSectionE>
            <img alt="Empresa" src={LogoMagazineLuizaAsset} />
            <CardContentSectionE container>
              <Grid item xs={12}>
                <span>Parcerias</span>
                <p>Magazine Luiza começa a usar o {nomeOrganizacao}</p>
              </Grid>
            </CardContentSectionE>
          </CardSectionE>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardSectionE>
            <img alt="Empresa" src={LogoMagazineLuizaAsset} />
            <CardContentSectionE container>
              <Grid item xs={12}>
                <span>Parcerias</span>
                <p>Magazine Luiza começa a usar o {nomeOrganizacao}</p>
              </Grid>
            </CardContentSectionE>
          </CardSectionE>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardSectionE>
            <img alt="Empresa" src={LogoMagazineLuizaAsset} />
            <CardContentSectionE container>
              <Grid item xs={12}>
                <span>Parcerias</span>
                <p>Magazine Luiza começa a usar o {nomeOrganizacao}</p>
              </Grid>
            </CardContentSectionE>
          </CardSectionE>
        </Grid>
      </GridList>
    </Container>
  </SectionEstyled>
);

export default SectionEmpresasConectadas;
