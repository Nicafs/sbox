import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CircularProgress } from '@material-ui/core';

import Control from './Control';
import Menu from './Menu';
import MultiValue from './MultiValue';
import NoOptionsMessage from './NoOptionsMessage';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';
import ValueContainer from './ValueContainer';

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const SelectStyled = styled(Select)`
  border-style: solid;
  border-width: 1px;
  padding: 10px;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-top: 16px;

  p {
    width: 100%;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // overflow: hidden;
  }

  input {
    color: ${({ theme }) => theme.palette.text.primary};
    '& input' {
      font: inherit;
    }
  }

  .MuiInput-underline:before {
    border-bottom: unset;
    content: unset;
  }
`;
const AsyncSelectStyled = styled(AsyncSelect)`
  border-style: solid;
  border-width: 1px;
  padding: 10px;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-top: 16px;

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  input {
    color: ${({ theme }) => theme.palette.text.primary};
    '& input' {
      font: inherit;
    }
  }

  .MuiInput-underline:before {
    border-bottom: unset;
    content: unset;
  }
`;
const Autocomplete = props => {
  const {
    placeholder,
    titulo,
    opcoes,
    valor,
    handleChange,
    isMulti,
    mensagemSemOpcao,
    async,
    buscarOpcoes,
    idInput,
    isLoading,
    ...othersProps
  } = props;

  if (!async) {
    return (
      <SelectStyled
        {...othersProps}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        inputId={idInput}
        TextFieldProps={{
          label: titulo,
          InputLabelProps: {
            htmlFor: { idInput },
            shrink: true,
          },
        }}
        placeholder={placeholder}
        options={opcoes}
        components={components}
        value={valor}
        onChange={handleChange}
        isMulti={isMulti}
        noOptionsMessage={() => mensagemSemOpcao}
      />
    );
  }

  return (
    <AsyncSelectStyled
      {...othersProps}
      menuPortalTarget={document.body}
      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      inputId={idInput}
      TextFieldProps={{
        label: titulo,
        InputLabelProps: {
          htmlFor: idInput,
          shrink: true,
        },
      }}
      cacheOptions
      placeholder={placeholder}
      defaultOptions={opcoes}
      loadOptions={buscarOpcoes}
      components={components}
      value={valor}
      onChange={handleChange}
      isMulti={isMulti}
      isLoading={isLoading}
      loadingMessage={() => <CircularProgress />}
      noOptionsMessage={() => mensagemSemOpcao}
    />
  );
};

Autocomplete.defaultProps = {
  titulo: '',
  isMulti: false,
  async: false,
  mensagemSemOpcao: 'Sem opções para serem listadas',
  buscarOpcoes: () => {},
  idInput: 'react-select',
  opcoes: [],
  buscaPorSimilaridade: true,
};

/* eslint-disable react/forbid-prop-types */
Autocomplete.propTypes = {
  titulo: PropTypes.string,
  placeholder: PropTypes.string,
  opcoes: PropTypes.array,
  valor: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
  async: PropTypes.bool,
  mensagemSemOpcao: PropTypes.string,
  buscarOpcoes: PropTypes.func,
  idInput: PropTypes.string,
  buscaPorSimilaridade: PropTypes.bool,
};
Autocomplete.defaultProps = {
  placeholder: undefined,
  valor: undefined,
};

export default Autocomplete;
