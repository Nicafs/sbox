import React from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { cpfMask } from '~/commons/utils/MaskHandle';

import { useAppGlobal } from '~/providers/AppGlobal';

import AuthRodape from '~/components/AuthRodape';
import Button from '~/components/MaterialUI/Button';
import Container from '~/components/MaterialUI/Container';
import Divider from '~/components/MaterialUI/Divider';
import TextField from '~/components/MaterialUI/TextField';

import { ButtonArrow, SubTitulo, Titulo } from './style';
import TimerOferta from './TimerOferta';

const FormConfirmacaoDados = ({
  dataExpiracao,
  handleAvancar,
  loading,
  formTitulo,
  formSubTitulo,
  cpf,
  setCpf,
  textoBotao = 'Simule e Compare!',
}) => {
  const {
    organizacao: { tipoFluxoEcp, tipoFluxoEp },
  } = useAppGlobal();

  const configCE = tipoFluxoEcp === 'P2P' && tipoFluxoEp !== 'BANCO_SEMEAR';

  const ofertaExpirada = dataExpiracao && new Date() > dataExpiracao;

  return (
    <Container maxWidth="sm">
      <Titulo>{formTitulo}</Titulo>
      {formSubTitulo && <SubTitulo>{formSubTitulo}</SubTitulo>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={11}>
          <TextField
            cy-element="inputNumCpf"
            type="tel"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="numCpf"
            label="Qual o número do seu CPF?"
            name="numCpf"
            autoComplete="numCpf"
            autoFocus
            value={cpfMask(cpf)}
            onChange={evt => setCpf(evt.target.value)}
            enterHandler={handleAvancar}
          />
        </Grid>
        <Hidden smDown>
          <Grid
            item
            container
            xs={2}
            md={1}
            alignItems="center"
            justify="center"
          >
            <Box ml={2}>
              <ButtonArrow
                cy-element="btnSubmit"
                loading={loading}
                circle="true"
                primary="true"
                onClick={handleAvancar}
                disabled={ofertaExpirada || loading}
              >
                <ArrowForwardIcon />
              </ButtonArrow>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
      <Hidden mdUp>
        <Grid container>
          <Grid item xs={12}>
            <Box mt={2} mb={2}>
              <Button
                loading={loading}
                rounded="true"
                primary="true"
                fullWidth
                onClick={handleAvancar}
                disabled={ofertaExpirada || loading}
              >
                {textoBotao}
              </Button>
            </Box>
          </Grid>
          {dataExpiracao && (
            <Grid item xs={12}>
              <TimerOferta dataExpiracao={dataExpiracao} />
            </Grid>
          )}
        </Grid>
      </Hidden>
      <Grid container>
        <Grid item xs={12}>
          <Box mt={4} mb={4}>
            <Divider />
          </Box>
        </Grid>
      </Grid>
      <AuthRodape msg={configCE ? 'Já possui uma conta?' : null} />
    </Container>
  );
};

FormConfirmacaoDados.propTypes = {
  cpf: PropTypes.string.isRequired,
  handleAvancar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setCpf: PropTypes.func.isRequired,
};

export default FormConfirmacaoDados;
