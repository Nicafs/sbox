import React from 'react';

import Grid from 'components/MaterialUI/Grid';

import {
  Imagem,
  GridContainer,
  TituloStyled,
  CardStyled,
  DescricaoStyled,
} from './style';

export default function CardBeneficio({ iconeAsset, titulo, texto }) {
  return (
    <CardStyled>
      <GridContainer container direction="row">
        <Grid item xs={2} container justify="center">
          <Imagem src={iconeAsset} />
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <TituloStyled variant="h5" gutterBottom>
                {titulo}
              </TituloStyled>
              <DescricaoStyled color="textSecondary" gutterBottom>
                {texto}
              </DescricaoStyled>
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
    </CardStyled>
  );
}
