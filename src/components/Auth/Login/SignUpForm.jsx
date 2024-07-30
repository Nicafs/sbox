import React from 'react';

import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import { ID_TELA_LOGIN } from '../../../commons/constants/menus';
import Grid from '../../MaterialUI/Grid';
import {
  ButtomCadastroStyled,
  DivRodapeStyled,
  GridBotoesStyled,
  LinkRodapeStyled,
} from './style';

const BotoesSubmit = ({ loading }) => (
  <GridBotoesStyled container justify="flex-end">
    <Grid item xs={12} md={4} container>
      <ButtomCadastroStyled
        name="botaoCriarConta"
        loading={loading}
        disabled={loading}
        type="submit"
        primary
        variant="contained"
        color="primary"
        // onClick={event => cadastrar(event)}
        fullWidth
      >
        Criar conta
      </ButtomCadastroStyled>
    </Grid>
  </GridBotoesStyled>
);

const Rodape = ({ handleMudancaTela }) => {
  const currentVersion = window.localStorage.getItem('appVersion');

  return (
    <DivRodapeStyled>
      <div className="pergunta">Já possui uma conta?</div>
      <LinkRodapeStyled onClick={() => handleMudancaTela(ID_TELA_LOGIN)}>
        ENTRAR
      </LinkRodapeStyled>
      <Typography color="textSecondary" variant="subtitle" gutterBottom>
        v{currentVersion}
      </Typography>
    </DivRodapeStyled>
  );
};

Rodape.propTypes = {
  handleMudancaTela: PropTypes.func.isRequired,
};

export { BotoesSubmit, Rodape };
