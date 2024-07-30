import React from 'react';

import PropTypes from 'prop-types';
import pushRota from 'routes/push';

import { Typography } from '@material-ui/core';

import LoaderCircular from '../../LoaderCircular';
import Grid from '../../MaterialUI/Grid';
import {
  ButtonLoginStyled,
  DivRodapeStyled,
  GridBotoesStyled,
  GridEsqueceuSenhaStyled,
  LinkRodapeStyled,
  LinkStyled,
} from './style';

const BotoesSubmit = ({ login, loading }) => {
  const resetarSenha = () => pushRota('/auth/senha/reset');

  return loading ? (
    <Grid container justify="center">
      <LoaderCircular />
    </Grid>
  ) : (
    <GridBotoesStyled container justify="space-between">
      <GridEsqueceuSenhaStyled item xs={6}>
        <LinkStyled href="#" onClick={resetarSenha} variant="body2">
          Esqueci minha senha
        </LinkStyled>
      </GridEsqueceuSenhaStyled>
      <Grid item xs={6} container justify="flex-end">
        <ButtonLoginStyled
          cy-element="btnSubmit"
          primary="true"
          onClick={login}
          loading={loading}
        >
          Entrar
        </ButtonLoginStyled>
      </Grid>
    </GridBotoesStyled>
  );
};

BotoesSubmit.propTypes = {
  login: PropTypes.func.isRequired,
};

const Rodape = ({ cadastroClickHandler }) => {
  const currentVersion = window.localStorage.getItem('appVersion');

  return (
    <DivRodapeStyled>
      <div className="pergunta">Ainda não é cadastrado?</div>
      <LinkRodapeStyled onClick={() => cadastroClickHandler()}>
        CADASTRE-SE
      </LinkRodapeStyled>
      <Typography color="textSecondary" variant="subtitle1" gutterBottom>
        v{currentVersion}
      </Typography>
    </DivRodapeStyled>
  );
};

export { BotoesSubmit, Rodape };
