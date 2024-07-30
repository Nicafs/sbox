import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from 'components/Modal';

import PropTypes from 'prop-types';

import {
  BotoesAcaoContainer,
  BotaoContinuarSemSeguro,
  BotaoContinuarComSeguro,
} from './style';
import VantagensSeguroEp from './VantagensSeguroEp';

export default function ModalSeguro({
  continuarComSeguro,
  exibirBotoes,
  ocupacaoProfissional,
  ...materialProps
}) {
  return (
    <Modal {...materialProps}>
      <Box mt={1} mb={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom align="center">
              Deseja contratar o seguro de empréstimo?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="center">
              Confira os benefícios do seguro:
            </Typography>
            <VantagensSeguroEp ocupacaoProfissional={ocupacaoProfissional} />
          </Grid>
          {exibirBotoes && (
            <Box mt={2}>
              <BotoesAcaoContainer
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <BotaoContinuarComSeguro
                    name="botaoContinuarComSeguro"
                    rounded="true"
                    primary="true"
                    fullWidth
                    onClick={() => continuarComSeguro(true)}
                  >
                    CONTRATAR COM SEGURO
                  </BotaoContinuarComSeguro>
                </Grid>
                <Grid item>
                  <BotaoContinuarSemSeguro
                    name="botaoContinuarSemSeguro"
                    href="#"
                    color="secondary"
                    onClick={() => continuarComSeguro(false)}
                  >
                    CONTINUAR SEM SEGURO
                  </BotaoContinuarSemSeguro>
                </Grid>
              </BotoesAcaoContainer>
            </Box>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}

ModalSeguro.propTypes = {
  continuarComSeguro: PropTypes.func.isRequired,
};
