import React from 'react';

import Box from 'components/MaterialUI/Box';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import {
  BotoesAcaoContainer,
  BotaoContinuarSemSeguro,
  Texto,
  BotaoContinuarComSeguro,
} from './style';
import VantagensSeguroConsignado from './VantagensSeguroConsignado';

export default function ModalSeguroInfo({
  continuarComSeguro,
  exibirBotoes,
  ...materialProps
}) {
  return (
    <Modal {...materialProps}>
      <Box mt={1} mb={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <Texto>Deseja contratar o seguro de empréstimo?</Texto>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="center">
              Confira os benefícios do seguro:
            </Typography>
            <VantagensSeguroConsignado />
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

ModalSeguroInfo.propTypes = {
  continuarComSeguro: PropTypes.func.isRequired,
};
