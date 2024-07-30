import React from 'react';
import ContentLoader from 'react-content-loader';

import Header from 'components/Header';
import Box from 'components/MaterialUI/Box';
import Card from 'components/MaterialUI/Card';
import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import ResumoEmprestimoLoader from 'components/ResumoEmprestimo/loader';
import styled from 'styled-components';

export const CardStyled = styled(Card)`
  cursor: pointer;
  //height: 100% !important;
  transition: 0.4s;
  padding: 20px;
  margin: 5px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: initial;
  }
`;

const renderInputs = () => (
  <ContentLoader
    height="100%"
    width="100%"
    speed={2}
    viewBox="0 0 400 200"
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
  >
    <rect x="0%" y="10" width="10%" height="2" rx="2" ry="2" />
    <rect x="30%" y="10" width="10%" height="2" rx="2" ry="2" />
    <rect x="60%" y="10" width="10%" height="2" rx="2" ry="2" />

    <rect x="0%" y="18" width="25%" height="20" rx="2" ry="2" />
    <rect x="30%" y="18" width="25%" height="20" rx="2" ry="2" />
    <rect x="60%" y="18" width="25%" height="20" rx="2" ry="2" />
    <rect x="60%" y="44" width="25%" height="1" rx="4" ry="4" />
  </ContentLoader>
);

const renderInputsMobile = () => (
  <ContentLoader
    viewBox="0 0 100 80"
    height="100%"
    width="100%"
    speed={1}
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
  >
    <rect x="0%" y="10" width="40%" height="2" rx="2" ry="2" />
    <rect x="0%" y="15" width="100%" height="10" rx="2" ry="2" />

    <rect x="0%" y="30" width="30%" height="2" rx="2" ry="2" />
    <rect x="0%" y="35" width="100%" height="10" rx="2" ry="2" />

    <rect x="0%" y="50" width="30%" height="2" rx="2" ry="2" />
    <rect x="0%" y="55" width="100%" height="10" rx="2" ry="2" />
    <rect x="0%" y="70" width="100%" height="1" rx="2" ry="2" />
  </ContentLoader>
);

const renderCharts = () => (
  <Grid container justify="center">
    <ContentLoader viewBox="0 0 400 200" height="100%" width="70%" speed={1}>
      <rect x="20" y="5" rx="0" ry="0" width="1" height="100%" />
      <rect x="20" y="175" rx="0" ry="0" width="100%" height="1" />

      <rect x="5%" y="75" rx="0" ry="0" width="5%" height="100" />
      <rect x="15%" y="125" rx="0" ry="0" width="5%" height="50" />
      <rect x="25%" y="105" rx="0" ry="0" width="5%" height="70" />
      <rect x="35%" y="35" rx="0" ry="0" width="5%" height="140" />
      <rect x="45%" y="55" rx="0" ry="0" width="5%" height="120" />
      <rect x="55%" y="15" rx="0" ry="0" width="5%" height="160" />
      <rect x="65%" y="135" rx="0" ry="0" width="5%" height="40" />
      <rect x="75%" y="85" rx="0" ry="0" width="5%" height="90" />
    </ContentLoader>
  </Grid>
);

const renderBotaoContinuar = () => (
  <Hidden mdDown>
    <ContentLoader viewBox="0 0 400 200" height="100%" width="100%" speed={1}>
      <rect x="70%" y="120" width="20%" height="15" rx="2" ry="2" />
    </ContentLoader>
  </Hidden>
);

export default function SimularEmprestimoLoader() {
  return (
    <Container maxWidth="lg">
      <Box m={3}>
        <Grid container justify="center">
          <Grid item md={12}>
            <Header logout={() => null} />
          </Grid>
          <Grid item md={8}>
            <Grid container direction="column">
              <Hidden mdUp>
                <Grid item>{renderInputsMobile()}</Grid>
              </Hidden>
              <Hidden mdDown>
                <Grid item>{renderInputs()}</Grid>
              </Hidden>
              <Grid item>{renderCharts()}</Grid>
              <Grid item>{renderBotaoContinuar()}</Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <ResumoEmprestimoLoader />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
