import React from 'react';

import PropTypes from 'prop-types';

import EnderecoApi from '../../commons/resources/endereco';
import FormikAutoComplete from './FormikAutocomplete';

export default function FormikCidadeAutocomplete({
  formik,
  name,
  dependecias,
  disabled,
  label,
  placeholder,
  fullWidth,
}) {
  async function buscarDados() {
    const { estado } = formik.values;
    if (estado) {
      const cidadesResult = await EnderecoApi.listarCidadesPorUF(estado);
      cidadesResult.sort((a, b) => a.nome.localeCompare(b.nome));
      return cidadesResult.map(({ id, nome }) => ({ value: id, label: nome }));
    }
    return [];
  }

  return (
    <FormikAutoComplete
      idInput="selectCidade"
      name={name}
      formik={formik}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      fnListarOpcoes={buscarDados}
      dependencias={dependecias}
    />
  );
}

/* eslint-disable react/forbid-prop-types */
FormikCidadeAutocomplete.propTypes = {
  dependecias: PropTypes.array,
  disabled: PropTypes.bool,
  formik: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

FormikCidadeAutocomplete.defaultProps = {
  dependecias: ['estado', 'uf'],
  disabled: false,
  fullWidth: false,
  label: 'Digite sua Cidade',
  placeholder: 'Digite sua Cidade',
};
