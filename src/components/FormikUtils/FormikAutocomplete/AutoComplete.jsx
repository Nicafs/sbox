import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

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

// import AsyncSelect from 'react-select/async/dist/react-select.esm';

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
export default function Autocomplete(props) {
  const {
    placeholder,
    opcoes,
    isMulti,
    mensagemSemOpcao,
    async,
    idInput,
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
          InputLabelProps: {
            htmlFor: { idInput },
            shrink: true,
          },
        }}
        placeholder={placeholder}
        options={opcoes}
        components={components}
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
        InputLabelProps: {
          htmlFor: idInput,
          shrink: true,
        },
      }}
      cacheOptions
      placeholder={placeholder}
      defaultOptions={opcoes}
      components={components}
      isMulti={isMulti}
      loadingMessage={() => <CircularProgress />}
      noOptionsMessage={() => mensagemSemOpcao}
    />
  );
}
