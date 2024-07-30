import React, { useEffect, useMemo, useState } from 'react';

import { getIn } from 'formik';
import PropTypes from 'prop-types';
import { remove } from 'remove-accents';

import FormControl from '../../MaterialUI/FormControl';
import FormHelperText from '../../MaterialUI/FormHelperText';
import InputLabel from '../../MaterialUI/InputLabel';
import Autocomplete from './AutoComplete';

function FormikAutoComplete({
  formik,
  name,
  label,
  fullWidth,
  fnListarOpcoes,
  fnBuscarOpcoes,
  fnPorId,
  placeholder,
  disabled,
  idInput,
  dependencias,
  async,
  opcoes = [],
}) {
  const [list, setList] = useState([]);
  const [selecionado, setSelecionado] = useState();
  const [isAsync, setAsync] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setFieldValue, setFieldTouched, values, errors, touched } = formik;
  const possuiErro = getIn(errors, name) && getIn(touched, name);
  const valorFormik = getIn(values, name);
  const valueDependecias = dependencias.map(d => getIn(values, d));
  const labelId = `select-${name}-label`;

  useMemo(() => {
    async function buscarLista() {
      if (opcoes.length > 0) {
        return opcoes;
      }
      setLoading(true);
      const listResult = await fnListarOpcoes();
      setList(listResult);
      // if (!disabled) {
      //   handleChange({});
      // }
      setLoading(false);
    }
    buscarLista();
  }, [...valueDependecias]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    buscarSelecionado();
  }, [list, valorFormik]); // eslint-disable-line react-hooks/exhaustive-deps

  async function buscarSelecionado() {
    setLoading(true);
    const { value = '' } = selecionado || {};
    if (valorFormik && valorFormik !== value) {
      if (fnPorId) {
        const result = await fnPorId(valorFormik);
        handleChange(result);
      } else if (list && list.length > 0) {
        const valoresEncontrado = list.filter(
          ({ encontrado }) => encontrado === valorFormik,
        );
        if (valoresEncontrado && valoresEncontrado.length > 0) {
          handleChange(valoresEncontrado[0]);
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (async) {
      setAsync(true);
    } else if (list.length > 50) {
      setAsync(true);
    }
    setLoading(false);
  }, [list, async, fnBuscarOpcoes]);

  function handleChange(novaSelecao) {
    if (!novaSelecao || Object.keys(novaSelecao).length === 0) {
      setSelecionado(null);
      setFieldValue(name, '');
    } else {
      setSelecionado(novaSelecao);
      setFieldValue(name, novaSelecao.value);
    }
  }

  async function buscaPadrao(inputBusca) {
    function containsBusca(dado, busca) {
      if (!dado || !busca) {
        return false;
      }
      return remove(dado.toLowerCase()).includes(remove(busca.toLowerCase()));
    }

    return list.filter(
      ({ label: labelList, value }) =>
        containsBusca(labelList, inputBusca) ||
        containsBusca(value, inputBusca),
    );
  }

  function shortList(l) {
    return l.length > 50 ? l.filter((c, idx) => idx < 51) : l;
  }

  return (
    <FormControl name={`form-${name}`} fullWidth={fullWidth} error={possuiErro}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Autocomplete
        name={name}
        idInput={idInput}
        placeholder={placeholder}
        value={selecionado}
        onChange={value => handleChange(value)}
        onBlur={() => setFieldTouched(name, true, true)}
        opcoes={shortList(list)}
        isDisabled={disabled}
        loadOptions={fnBuscarOpcoes || buscaPadrao}
        async={isAsync}
        isLoading={loading}
        openMenuOnClick={false}
        isClearable
      />
      {possuiErro && <FormHelperText>{getIn(errors, name)}</FormHelperText>}
    </FormControl>
  );
}

export default FormikAutoComplete;

/* eslint-disable react/forbid-prop-types */
FormikAutoComplete.propTypes = {
  dependencias: PropTypes.array,
  disabled: PropTypes.bool,
  fnListarOpcoes: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  idInput: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

FormikAutoComplete.defaultProps = {
  dependencias: [],
  disabled: false,
  fullWidth: false,
  idInput: 'idInput',
  label: '',
  placeholder: '',
};

FormikAutoComplete.whyDidYouRender = true;
