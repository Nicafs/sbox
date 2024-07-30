import React, { useEffect } from 'react';

import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import { Hidden } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { FormEndereco } from '@credito-express/ce-components';

import Button from '../../MaterialUI/Button';
import Divider from '../../MaterialUI/Divider';
import ExibicaoErros from '../ExibicaoErros';
import FormDadosOcupacao from './FormDadosOcupacao';
import FormDadosPessoais from './FormDadosPessoais';

const SubTitulo = styled.p`
  color: ${({ theme }) => theme.palette.common.black};
`;

const Titulo = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
`;

export default function FormDadosFinais({
  formik,
  loading,
  estados,
  orgaosEmisores,
  nacionalidades,
  renderCadastroAdicionais,
  renderEnderecoAdicionais,
}) {
  const inputs = {};

  useEffect(() => {
    const inputNome = Object.keys(formik.errors)[0];
    if (document.getElementById(inputNome)) {
      document.getElementById(inputNome).focus();
    }
  }, [formik.submitCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const { tipoFluxo } = useAppGlobal();

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={10}>
        <Titulo>Cadastro</Titulo>
        <SubTitulo>
          Por favor, confira todas as informações do seu cadastro
        </SubTitulo>
        {tipoFluxo === 'BANCO_SEMEAR' && false && (
          <>
            <FormDadosOcupacao formik={formik} inputs={inputs} />
            <Box mt={3} mb={3}>
              <Divider dashed="true" />
            </Box>
          </>
        )}
        <FormDadosPessoais
          formik={formik}
          inputs={inputs}
          estados={estados}
          orgaosEmisores={orgaosEmisores}
          nacionalidades={nacionalidades}
        />
        {renderCadastroAdicionais()}
        <Box mt={3} mb={3}>
          <Divider dashed="true" />
        </Box>
        <SubTitulo>Endereço de residência</SubTitulo>
        <FormEndereco formik={formik} inputVariant="outlined" required />
        {renderEnderecoAdicionais()}
        <ExibicaoErros formik={formik} />
        <Hidden smDown>
          <Grid container direction="row-reverse">
            <Grid item xs={12} md={2}>
              <Box mt={4} mb={4}>
                <Button
                  cy-element="btnSubmit"
                  secondary="true"
                  rounded="true"
                  fullWidth
                  loading={loading}
                  onClick={() => formik.handleSubmit()}
                  disabled={!formik.isValid}
                >
                  Avançar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}
