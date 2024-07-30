import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';

import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldUI from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const keyPressHandler = (ev, callback) => {
  if (ev.key === 'Enter') {
    if (callback) {
      callback();
    }
  }
};

const TextField = props => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    enterHandler,
    type,
    currency,
    onChangeCurrency,
    currencyRenderer,
    ...newProps
  } = props;

  if (type === 'password') {
    return (
      <TextFieldUI
        onKeyPress={e => keyPressHandler(e, enterHandler)}
        type={showPassword ? 'text' : 'password'}
        {...newProps}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  //
  if (currency) {
    return (
      <CurrencyFormat
        {...newProps}
        customInput={currencyRenderer || TextField}
        prefix=""
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale
        onValueChange={onChangeCurrency}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />
    );
  }

  return (
    <TextFieldUI
      onKeyPress={e => keyPressHandler(e, enterHandler)}
      type={type}
      {...newProps}
    />
  );
};

TextField.propTypes = {
  enterHandler: PropTypes.func,
  type: PropTypes.string,
};

TextField.defaultProps = {
  enterHandler: () => {},
  type: 'text',
};

export default TextField;
