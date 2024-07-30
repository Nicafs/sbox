import React, { useState } from 'react';

import { getIn } from 'formik';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldUI from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { inputDinheiroComCentavosZerado } from '../../commons/utils/ManipulacaoUtils';
import { formikDefaultProps } from './FormikHandlers';

const keyPressHandler = (ev, callback) => {
  if (ev.key === 'Enter') {
    if (callback) {
      callback();
    }
  }
};

export default function FormikTextField({
  formik,
  name,
  type = 'text',
  enterHandler,
  monetario,
  centavosZerados,
  customHandleChange,
  customValueMask,
  startAdornment,
  endAdornment,
  ...otherProps
}) {
  const [showPassword, setShowPassword] = useState(false);

  const { errors, touched } = formik;

  const possuiErro = getIn(errors, name) && getIn(touched, name);

  function gerarErro() {
    if (possuiErro) {
      return { helperText: getIn(errors, name) };
    }
    return {};
  }

  function gerarInputProps() {
    let inputProps = { shrink: true };
    if (startAdornment) {
      inputProps = {
        ...inputProps,
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
      };
    }
    if (endAdornment) {
      inputProps = {
        ...inputProps,
        endAdornment: (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      };
    }
    return inputProps;
  }

  if (type === 'password') {
    return (
      <TextFieldUI
        InputLabelProps={{ shrink: true }}
        {...otherProps}
        error={possuiErro}
        {...gerarErro()}
        {...formikDefaultProps({
          formik,
          name,
          customHandleChange,
          customValueMask,
        })}
        onKeyPress={e => keyPressHandler(e, enterHandler)}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(bool => !bool)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  if (monetario) {
    return (
      <TextFieldUI
        {...otherProps}
        error={possuiErro}
        {...gerarErro()}
        {...formikDefaultProps({
          formik,
          name,
          customHandleChange: centavosZerados
            ? inputDinheiroComCentavosZerado
            : customHandleChange,
          customValueMask,
        })}
        onKeyPress={e => keyPressHandler(e, enterHandler)}
        type={type}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />
    );
  }

  return (
    <TextFieldUI
      {...otherProps}
      error={possuiErro}
      {...gerarErro()}
      {...formikDefaultProps({
        formik,
        name,
        customHandleChange,
        customValueMask,
      })}
      onKeyPress={e => keyPressHandler(e, enterHandler)}
      type={type}
      InputLabelProps={gerarInputProps()}
      style={{ marginBottom: '0px' }}
    />
  );
}

/* eslint-disable react/forbid-prop-types */
FormikTextField.propTypes = {
  centavosZerados: PropTypes.bool,
  customHandleChange: PropTypes.func,
  customValueMask: PropTypes.func,
  endAdornment: PropTypes.string,
  enterHandler: PropTypes.func,
  formik: PropTypes.object.isRequired,
  monetario: PropTypes.bool,
  name: PropTypes.string.isRequired,
  startAdornment: PropTypes.string,
  type: PropTypes.string,
};

FormikTextField.defaultProps = {
  centavosZerados: false,
  monetario: false,
  type: 'text',
  customHandleChange: undefined,
  customValueMask: undefined,
  endAdornment: undefined,
  enterHandler: undefined,
  startAdornment: undefined,
};
