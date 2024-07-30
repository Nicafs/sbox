import React from 'react';

import Grid from 'components/MaterialUI/Grid';

import { TypographySubtituloStyled, TypographyTituloStyled } from './style';

const HeaderModalAviso = ({ textEnvio = 'Reenvie' }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TypographyTituloStyled
          variant="h3"
          align="center"
          color="primary"
          paragraph
        >
          {textEnvio} seus documentos
        </TypographyTituloStyled>
      </Grid>
      <Grid item xs={12}>
        <TypographySubtituloStyled variant="h5" paragraph align="center">
          Para agilizar a aprovação do seu empréstimo, precisamos que você{' '}
          {textEnvio.toLowerCase()} uma foto legível da sua CNH ou RG
        </TypographySubtituloStyled>
      </Grid>
    </Grid>
  );
};

export default HeaderModalAviso;
