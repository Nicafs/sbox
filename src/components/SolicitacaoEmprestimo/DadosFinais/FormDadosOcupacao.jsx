import React from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import Grid from '@material-ui/core/Grid';

import Organizacao from '~/commons/resources/organizacao';

import { useSimulacaoState } from '~/pages/Tomador/SolicitacaoEmprestimo/state';

import FormikSelectAsyncList from '../../FormikUtils/FormikSelectAsyncList';

export default function FormDadosOcupacao({ formik, inputs }) {
  const {
    organizacao: { id: idOrganizacao },
  } = useAppGlobal();

  const [, { setOrganizacaoCamposPersonalizados }] = useSimulacaoState();

  const getListaOcupacao = async () => {
    const response = await Organizacao.getCampoPersonalizado(
      idOrganizacao,
      'cadastro_adicionais',
      'ocupacaoProfissional',
    );
    const { listaValores } = response;
    const list = Object.keys(listaValores).map(l => {
      return { value: l, label: listaValores[l] };
    });
    return list;
  };

  const customHandleChange = async value => {
    const response = await Organizacao.getCamposPersonalizadosPorOcupacao(
      value,
    );
    setOrganizacaoCamposPersonalizados(response);
  };

  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={6} alignItems="center">
        <FormikSelectAsyncList
          name="ocupacaoProfissional"
          inputRef={ref => (inputs.ocupacaoProfissional = ref)}
          fnBuscarOpcoes={() => getListaOcupacao()}
          formik={formik}
          customHandleChange={customHandleChange}
          fullWidth
          required
          label="Ocupação Profissional"
        />
      </Grid>
    </Grid>
  );
}

/* eslint-disable react/forbid-prop-types */
FormDadosOcupacao.propTypes = {
  formik: PropTypes.object,
  inputs: PropTypes.object,
};

FormDadosOcupacao.defaultProps = {
  formik: undefined,
  inputs: undefined,
};
