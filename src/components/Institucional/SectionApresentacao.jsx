import React from 'react';

import GrafismoDireitoAsset from '../../assets/images/grafismo-header-direito.svg';
import GrafismoEsquerdoAsset from '../../assets/images/grafismo-header-esquerdo.svg';
import {
  CardSectionA,
  GrafismoDireito,
  GrafismoEsquerdo,
  GridContainerSectionAstyled,
  SectionAstyled,
  TagGenteImpulsionandoGente,
  TituloSectionAstyled,
} from '../../containers/Institucional/style';
import pushRota from '../../routes/push';
import HeaderInstitucional from '../HeaderInstitucional';
import HeaderInstitucionalMobile from '../HeaderInstitucionalMobile';
import Button from '../MaterialUI/Button';
import CardContent from '../MaterialUI/CardContent';
import Container from '../MaterialUI/Container';
import Grid from '../MaterialUI/Grid';
import Hidden from '../MaterialUI/Hidden';

function RenderCardsContainerA({ getIcone }) {
  const onQueroInvestidorClickHandler = () => {
    return pushRota('/quero-investir');
  };

  return (
    <Container>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} md={5} lg={6}>
          <CardSectionA>
            <CardContent>
              <Grid container>
                <Grid
                  container
                  item
                  xs={12}
                  md={4}
                  justify="center"
                  alignItems="center"
                >
                  <img alt="Carteira" src={getIcone('porco-header')} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <h1>Rendimentos</h1>
                  <p>Taxas maiores que o CDI.</p>
                  <Grid container justify="center" mt={4}>
                    <Button onClick={onQueroInvestidorClickHandler}>
                      Quero investir
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardSectionA>
        </Grid>
        <Grid item xs={12} md={5} lg={6}>
          <CardSectionA>
            <CardContent>
              <Grid container>
                <Grid
                  container
                  item
                  xs={12}
                  md={4}
                  justify="center"
                  alignItems="center"
                >
                  <img alt="Carteira" src={getIcone('carteira-header')} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <h1>Empréstimos</h1>
                  <p>Juros abaixo dos tradicionais</p>
                  <Grid container justify="center" mt={4}>
                    <Button onClick={() => pushRota('/quero-emprestimo')}>
                      Quero empréstimo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardSectionA>
        </Grid>
      </Grid>
    </Container>
  );
}

const SectionApresentacao = ({ getIcone, sectionRef }) => (
  <SectionAstyled ref={sectionRef}>
    <Hidden smDown>
      <HeaderInstitucional />
    </Hidden>
    <Hidden mdUp>
      <HeaderInstitucionalMobile />
    </Hidden>
    <GridContainerSectionAstyled>
      <Hidden mdDown>
        <GrafismoEsquerdo src={GrafismoEsquerdoAsset} top={1} />
        <GrafismoDireito src={GrafismoDireitoAsset} top={1} />
      </Hidden>
      <TituloSectionAstyled>
        Faça parte da revolução financeira
      </TituloSectionAstyled>
      <Grid container justify="center">
        <TagGenteImpulsionandoGente>
          #GenteImpulsionandoGente
        </TagGenteImpulsionandoGente>
      </Grid>
      <Container maxWidth="md">
        <p>
          Somos uma plataforma que conecta gente que acredita em gente. Invista
          seu dinheiro ou contrate seu empréstimo de forma 100% digital e
          segura.
        </p>
      </Container>
      <RenderCardsContainerA getIcone={getIcone} />
    </GridContainerSectionAstyled>
  </SectionAstyled>
);

export default SectionApresentacao;
