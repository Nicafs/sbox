import React from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Button from '../../MaterialUI/Button';

export default function BotaoSolicitacaoEmprestimo({
  isMobile,
  resumoCompleto = true,
}) {
  let boxPros;
  if (isMobile) {
    boxPros = {
      m: 2,
    };
  } else {
    boxPros = {
      mt: 2,
      p: 2,
    };
  }
  return (
    <Grid container direction="row-reverse">
      <Grid item xs={12} md={4}>
        <Box {...boxPros}>
          <Button
            cy-element="btnSubmit"
            type="submit"
            secondary="true"
            rounded="true"
            fullWidth
          >
            {resumoCompleto ? 'SOLICITAR AGORA' : 'AVANÇAR'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
BotaoSolicitacaoEmprestimo.defaultProps = {
  isMobile: false,
};

BotaoSolicitacaoEmprestimo.propTypes = {
  isMobile: PropTypes.bool,
};
