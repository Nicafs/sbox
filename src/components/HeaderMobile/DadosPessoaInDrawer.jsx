import React from 'react';

import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import Grid from '../MaterialUI/Grid';
import { AvatarStyled, DivUsuarioStyled } from './style';

const getPrimeiroNome = nome => {
  if (nome) {
    const splitedName = nome.split(' ');
    if (splitedName && splitedName.length > 0) {
      return splitedName[0];
    }
  }
  return nome;
};

const DadosPessoaInDrawer = ({ pessoa }) => (
  <DivUsuarioStyled>
    <AvatarStyled src={pessoa.avatarUrl} />
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5">{getPrimeiroNome(pessoa.nome)}</Typography>
      </Grid>
    </Grid>
  </DivUsuarioStyled>
);

DadosPessoaInDrawer.propTypes = {
  pessoa: PropTypes.shape({
    nome: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default DadosPessoaInDrawer;
