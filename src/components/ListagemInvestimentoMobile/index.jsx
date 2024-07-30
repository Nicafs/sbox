import React from 'react';

import Grid from 'components/MaterialUI/Grid';

import ItemListagemInvestimento from './ItemListagemInvestimento';

// import { Container } from './styles';

export default function ListagemInvestimentoMobile({ investimentos }) {
  return (
    <Grid container spacing={3} justify="center">
      {investimentos.map(investimento => (
        <Grid item xs={12}>
          <ItemListagemInvestimento investimento={investimento} />
        </Grid>
      ))}
    </Grid>
  );
}
