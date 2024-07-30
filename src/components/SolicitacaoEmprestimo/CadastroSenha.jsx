import React from 'react';

import FormikTextField from 'components/FormikUtils/FormikTextField';
import Button from 'components/MaterialUI/Button';
import Container from 'components/MaterialUI/Container';
import { InputLabel } from 'components/MaterialUI/InputLabel/style';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import FooterMobileSolicitacaoEmprestimo from '../FooterMobileSolicitacaoEmprestimo';
import DetalhesDesktop from './DetalhesDesktop';

const ContainerStyled = styled(Grid)`
  align-items: flex-start;
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 86.5vh;
  }
  ${({ theme }) => theme.breakpoints.up('xl')} {
    height: 91vh;
  }
`;
const Titulo = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;
  text-align: center;
`;

const FormContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.background.default};
`;

const ContainerSenha = styled(Container)`
  padding-top: 2rem;
`;

export default function CadastroSenha({
  taxaJuros,
  formik,
  organizacao,
  disableForm,
  loading,
}) {
  return (
    <>
      <ContainerStyled container>
        <FormContainer
          item
          container
          xs={12}
          md={6}
          justify="center"
          alignItems="center"
        >
          <ContainerSenha maxWidth="sm">
            <Titulo>Cadastre sua senha</Titulo>
            <form
              onSubmit={e => {
                e.preventDefault();
                formik.submitForm();
              }}
            >
              <Grid container direction="column">
                <Grid container item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Digite sua senha</InputLabel>
                    <FormikTextField
                      formik={formik}
                      cy-element="inputSenha"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      required
                      fullWidth
                      id="senha"
                      label="Digite sua senha"
                      name="senha"
                      disabled={disableForm}
                    />
                  </FormControl>
                </Grid>
                <Grid container item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Digite sua senha novamente</InputLabel>
                    <FormikTextField
                      formik={formik}
                      cy-element="inputSenha2"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      required
                      fullWidth
                      id="senha2"
                      label="Confirme sua senha"
                      name="senha2"
                      disabled={disableForm}
                    />
                  </FormControl>
                </Grid>
                <Hidden smDown>
                  <Grid container direction="row-reverse">
                    <Grid item container xs={12} md={3} direction="row-reverse">
                      <Box mt={2}>
                        <Button
                          cy-element="btnSubmit"
                          rounded="true"
                          secondary="true"
                          fullWidth
                          type="submit"
                          loading={loading}
                        >
                          Avançar
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
            </form>
          </ContainerSenha>
        </FormContainer>
        <Hidden smDown>
          <DetalhesDesktop taxaJuros={taxaJuros} organizacao={organizacao} />
        </Hidden>
        <FooterMobileSolicitacaoEmprestimo
          getBotaoTexto={() => 'AVANÇAR'}
          getBotaoHabilitado={() => formik.isValid}
          handleNext={formik.submitForm}
        />
      </ContainerStyled>
    </>
  );
}

/* eslint-disable react/forbid-prop-types */
CadastroSenha.propTypes = {
  disableForm: PropTypes.bool.isRequired,
  formik: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  organizacao: PropTypes.object.isRequired,
  taxaJuros: PropTypes.number.isRequired,
};

CadastroSenha.defaultProps = {
  loading: false,
};
