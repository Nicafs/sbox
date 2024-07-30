import React, { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import EnderecoApi from '../../commons/resources/endereco';
import Autocomplete from '../Autocomplete';

export default function UfSelect({ valor, handleChange, valorUf, disabled }) {
  const [estados, setEstados] = useState([]);
  useMemo(() => {
    const listarEstados = async () => {
      const estadosResult = await EnderecoApi.listEstados();
      setEstados(
        estadosResult.map(({ nome, uf }) => ({ value: uf, label: nome })),
      );
    };
    listarEstados();
  }, []);

  useEffect(() => {
    if (estados && estados.length > 0 && valorUf && disabled) {
      const estadoEncontrado = estados.filter(({ value }) => value === valorUf);
      if (estadoEncontrado && estadoEncontrado.length > 0) {
        handleChange(estadoEncontrado[0]);
      }
    }
  }, [estados, valorUf, valor, disabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Autocomplete
      idInput="selectUf"
      placeholder="Digite aqui seu Estado"
      valor={valor}
      handleChange={handleChange}
      opcoes={estados}
      isDisabled={disabled}
    />
  );
}

UfSelect.propTypes = {
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  valor: PropTypes.string.isRequired,
  valorUf: PropTypes.string.isRequired,
};

UfSelect.defaultProps = {
  disabled: false,
};
