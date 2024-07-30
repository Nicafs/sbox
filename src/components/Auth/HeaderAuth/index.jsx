import React from 'react';

import Grid from '../../MaterialUI/Grid';
import HeaderAuthItem from '../HeaderAuthItem';

const HeaderAuth = ({
  telaSelecionada,
  btnEntrarClickHandler,
  btnCadastroClickHandler,
}) => (
  <Grid container justify="space-between">
    <Grid item xs={5} container justify="flex-start" direction="column">
      <HeaderAuthItem
        name="botaoEntrar"
        titulo="Entrar"
        onClick={() => btnEntrarClickHandler(1)}
        selecionado={telaSelecionada === 1}
      />
    </Grid>
    <Grid item xs={7} container justify="flex-end">
      <HeaderAuthItem
        name="botaoCadastro"
        titulo="Cadastre-se"
        onClick={btnCadastroClickHandler}
        selecionado={telaSelecionada === 2}
      />
    </Grid>
  </Grid>
);

export default HeaderAuth;
