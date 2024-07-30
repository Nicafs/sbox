import React from 'react';

import PropTypes from 'prop-types';

import EnderecoApi from '../../commons/resources/endereco';
import FormikAutoComplete from './FormikAutocomplete';

export default function FormikUfAutocomplete({
  formik,
  name,
  disabled,
  label,
  placeholder,
  fullWidth,
}) {
  async function buscarDados() {
    const result = await EnderecoApi.listEstados();
    return result.map(({ nome, uf }) => ({
      value: uf,
      label: nome,
    }));
  }
  return (
    <FormikAutoComplete
      idInput="selectUf"
      name={name}
      formik={formik}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      fnListarOpcoes={buscarDados}
    />
  );
}

/* eslint-disable react/forbid-prop-types */
FormikUfAutocomplete.propTypes = {
  disabled: PropTypes.bool,
  formik: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

FormikUfAutocomplete.defaultProps = {
  disabled: false,
  fullWidth: false,
  label: 'Digite seu Estado',
  placeholder: 'Digite seu Estado',
};
