import React from 'react';

import { gerarJsxCamposAdicionais } from 'commons/utils/camposPersonalizadosUtil';
import DetalhesDesktop from 'components/QueroEmprestimo/ConfirmacaoDados/DetalhesDesktop';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';
import PropTypes from 'prop-types';

import { Hidden } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import { celularMask, onlyNumber } from '../../../commons/utils/MaskHandle';
import FormikTextField from '../../FormikUtils/FormikTextField';
import Button from '../../MaterialUI/Button';
import Container from '../../MaterialUI/Container';
import InputLabel from '../../MaterialUI/InputLabel';
import ExibicaoErros from '../ExibicaoErros';
import { Titulo, ContainerStyled, FormContainer } from './styles';

export default function CadastroContatos({ formik, taxaJuros, organizacao }) {
  const [
    {
      organizacao: {
        camposPersonalizados: { contato = [], contatoAdicionais = [] } = {},
      } = {},
      loading,
    },
  ] = useSimulacaoState();
  let exibirEmail = true;
  let exibirCelular = true;

  if (contato.length > 0) {
    if (
      !contato.find(({ nome, disponivel }) => nome === 'email' && disponivel)
    ) {
      exibirEmail = false;
    }
    if (
      !contato.find(({ nome, disponivel }) => nome === 'celular' && disponivel)
    ) {
      exibirCelular = false;
    }
  }

  return (
    <ContainerStyled container>
      <FormContainer
        item
        container
        xs={12}
        md={6}
        justify="center"
        alignItems="center"
      >
        <Container maxWidth="sm">
          <Titulo>Informe seus contatos</Titulo>
          <Grid container direction="column" spacing={2}>
            {exibirCelular && (
              <Grid container item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Digite o número do seu celular</InputLabel>
                  <FormikTextField
                    required
                    formik={formik}
                    cy-element="inputCelular"
                    type="tel"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    id="celular"
                    label="Celular"
                    name="celular"
                    customHandleChange={onlyNumber}
                    customValueMask={celularMask}
                  />
                </FormControl>
              </Grid>
            )}
            {exibirEmail && (
              <Grid container item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Digite seu e-mail pessoal</InputLabel>
                  <FormikTextField
                    required
                    cy-element="inputEmailPessoal"
                    type="email"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    id="emailPessoal"
                    label="E-mail pessoal"
                    name="email"
                    formik={formik}
                  />
                </FormControl>
              </Grid>
            )}
            {gerarJsxCamposAdicionais(contatoAdicionais, formik)}
            <Hidden smDown>
              <Grid container direction="row-reverse">
                <Grid item container xs={12} md={3} direction="row-reverse">
                  <Box mt={2}>
                    <Button
                      id="avancarContato"
                      cy-element="btnSubmit"
                      rounded="true"
                      secondary="true"
                      disabled={!formik.isValid || loading}
                      loading={loading}
                      fullWidth
                      onClick={formik.submitForm}
                    >
                      Avançar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Hidden>
            <ExibicaoErros formik={formik} />
          </Grid>
        </Container>
      </FormContainer>
      <Hidden smDown>
        <DetalhesDesktop taxaJuros={taxaJuros} organizacao={organizacao} />
      </Hidden>
    </ContainerStyled>
  );
}

/* eslint-disable react/forbid-prop-types */
CadastroContatos.propTypes = {
  formik: PropTypes.object.isRequired,
  organizacao: PropTypes.object.isRequired,
  taxaJuros: PropTypes.number.isRequired,
};
