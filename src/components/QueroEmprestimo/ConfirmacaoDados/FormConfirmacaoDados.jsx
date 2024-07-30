import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { cpfMask } from '../../../commons/utils/MaskHandle';
import AuthRodape from '../../AuthRodape';
import Button from '../../MaterialUI/Button';
import Container from '../../MaterialUI/Container';
import Divider from '../../MaterialUI/Divider';
import TextField from '../../MaterialUI/TextField';

const ButtonArrow = styled(Button)`
  width: 48px;
  height: 48px;
`;

const Titulo = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
  text-align: center;
`;

const FormConfirmacaoDados = ({
  cpf,
  setCpf,
  buscarTomadorPorCpf,
  loading,
}) => {
  return (
    <Container maxWidth="sm">
      <Titulo>Faça sua simulação</Titulo>
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
            enterHandler={buscarTomadorPorCpf}
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
                onClick={buscarTomadorPorCpf}
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
                onClick={buscarTomadorPorCpf}
              >
                Simule e compare!
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} />
        </Grid>
      </Hidden>
      <Grid container>
        <Grid item xs={12}>
          <Box mt={4} mb={4}>
            <Divider />
          </Box>
        </Grid>
      </Grid>
      <AuthRodape msg="Já possui uma conta?" />
    </Container>
  );
};

FormConfirmacaoDados.propTypes = {
  cpf: PropTypes.string.isRequired,
  buscarTomadorPorCpf: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setCpf: PropTypes.func.isRequired,
};

export default FormConfirmacaoDados;
