import React from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import Grid from '~/components/MaterialUI/Grid';

import FooterMobileSolicitacaoEmprestimo from '../../FooterMobileSolicitacaoEmprestimo';
import DetalhesDesktop from './DetalhesDesktop';
import FormDadosFinais from './FormDadosFinais';

export default function CadastroDadosPessoais({
  formik,
  empresa,
  logo,
  loading,
  organizacao,
  estados,
  orgaosEmisores,
  nacionalidades,
  renderCadastroAdicionais,
  renderEnderecoAdicionais,
}) {
  return (
    <>
      <Grid container>
        <Grid item md={7} sm={12}>
          <FormDadosFinais
            formik={formik}
            loading={loading}
            estados={estados}
            orgaosEmisores={orgaosEmisores}
            nacionalidades={nacionalidades}
            renderCadastroAdicionais={renderCadastroAdicionais}
            renderEnderecoAdicionais={renderEnderecoAdicionais}
          />
        </Grid>
        <Hidden smDown>
          <Grid item xs={5}>
            <DetalhesDesktop
              empresa={empresa}
              logo={logo}
              organizacao={organizacao}
            />
          </Grid>
        </Hidden>
      </Grid>
      <FooterMobileSolicitacaoEmprestimo
        getBotaoTexto={() => 'AVANÇAR'}
        getBotaoHabilitado={() => formik.isValid}
        handleNext={formik.submitForm}
      />
    </>
  );
}

/* eslint-disable react/forbid-prop-types */
CadastroDadosPessoais.propTypes = {
  empresa: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
  organizacao: PropTypes.object.isRequired,
};
