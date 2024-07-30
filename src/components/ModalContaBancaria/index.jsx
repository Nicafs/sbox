import React from 'react';

import Box from 'components/MaterialUI/Box';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import { Hidden } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ContaBancaria from '../../containers/ContaBancaria/ContaBancaria';
import LoaderCircular from '../LoaderCircular';
import {
  DivFormStyled,
  GridContainer,
  Icone,
  TypographyTituloStyled,
} from './style';

export default function ModalContaBancaria({
  handleAvancar,
  organizacao,
  loading,
  ...materialProps
}) {
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const {
    camposPersonalizados: {
      contaBancaria: camposContaBancaria = [],
      contaBancariaAdicionais: camposContaBancariaAdicionais = [],
    } = {},
  } = organizacao;

  const handleAvancarWrapper = values => {
    handleAvancar(values);
  };

  return (
    <Modal {...materialProps} loading={loading}>
      <Box mt={5} mb={5}>
        <GridContainer direction="column" spacing={1}>
          <Hidden smDown>
            <Grid item container justify="center" xs={12}>
              <Icone alt="icone-calendar" src={getIcone('banco-carteira')} />
            </Grid>
          </Hidden>
          <Grid container item xs={12}>
            {loading && (
              <Box mt={4} width="100%">
                <Grid
                  container
                  spacing={4}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <LoaderCircular />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">
                      Atualizando sua nova conta bancária, por favor, aguarde...
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
            <DivFormStyled loading={loading}>
              <TypographyTituloStyled
                variant="h4"
                color="primary"
                align="center"
              >
                Informe sua conta
              </TypographyTituloStyled>
              <Typography variant="body1" color="textSecondary" align="center">
                Precisamos que você reenvie seus dados bancários para realizar a
                transferência do seu empréstimo
              </Typography>
              <ContaBancaria
                valoresCamposPadroes={{ tipoConta: 'CORRENTE' }}
                valoresCamposAdicionais={{}}
                configCamposContaBancaria={camposContaBancaria}
                configCamposContaBancariaAdicionais={
                  camposContaBancariaAdicionais
                }
                onFormikSubmit={handleAvancarWrapper}
                paginaTitulo={null}
              />
            </DivFormStyled>
          </Grid>
        </GridContainer>
      </Box>
    </Modal>
  );
}

ModalContaBancaria.propTypes = {
  handleAvancar: PropTypes.func.isRequired,
};
