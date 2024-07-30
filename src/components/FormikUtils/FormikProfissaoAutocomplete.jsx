import React from 'react';

import PropTypes from 'prop-types';

import ProfissaoApi from '../../commons/resources/profissao';
import FormikAutoComplete from './FormikAutocomplete';

export default function FormikProfissaoAutocomplete({
  formik,
  name,
  disabled,
  label,
  placeholder,
  fullWidth,
}) {
  async function buscarProfissoes(str = '') {
    const profissoesResponse = await ProfissaoApi.buscarProfissoes(str);
    return profissoesResponse.map(p => ({
      value: p.id,
      label: p.nome,
    }));
  }
  async function buscarProfissaoDoDB(valorId) {
    if (valorId) {
      const profissaoResult = await ProfissaoApi.getProfissao(valorId);
      const { id, nome } = profissaoResult;
      return { value: id, label: nome };
    }
  }

  return (
    <FormikAutoComplete
      idInput="selectProfissao"
      name={name}
      formik={formik}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      fnListarOpcoes={() => buscarProfissoes('')}
      fnBuscarOpcoes={buscarProfissoes}
      fnPorId={buscarProfissaoDoDB}
      async
    />
  );
}

/* eslint-disable react/forbid-prop-types */
FormikProfissaoAutocomplete.propTypes = {
  disabled: PropTypes.bool,
  formik: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

FormikProfissaoAutocomplete.defaultProps = {
  disabled: false,
  fullWidth: false,
  label: 'Digite sua profissão',
  placeholder: 'Digite aqui sua profissão',
};
