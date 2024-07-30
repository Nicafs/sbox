import React from 'react';

import Grid from 'components/MaterialUI/Grid';
import TextField from 'components/MaterialUI/TextField';

import FiltroItemTitulo from '../FiltroItemTitulo';

// import { Container } from './styles';

export default function FiltroItemInputMonetario({ titulo }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FiltroItemTitulo titulo={titulo} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Valor do investimento"
        />
      </Grid>
    </Grid>
  );
}
