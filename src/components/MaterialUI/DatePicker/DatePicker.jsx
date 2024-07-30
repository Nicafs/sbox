import React from 'react';

import brLocale from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const keyPressHandler = (ev, callback) => {
  if (ev.key === 'Enter') {
    if (callback) {
      callback();
    }
  }
};

const DatePicker = ({
  label,
  onChange,
  onBlur,
  value,
  enterHandler,
  cyElement,
  maxDate,
  minDate,
  error,
  helperText,
  otherProps,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
      <KeyboardDatePicker
        cy-element={cyElement}
        type="tel"
        autoOk
        fullWidth
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        views={['year', 'month', 'date']}
        label={label}
        value={value || null}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        onKeyPress={e => keyPressHandler(e, enterHandler)}
        maxDate={maxDate || '01/01/3000'}
        invalidDateMessage="Data inválida"
        maxDateMessage="Data maior que o permitido"
        minDateMessage="Data menor que o permitido"
        variant="inline"
        inputVariant="outlined"
        minDate={minDate}
        {...otherProps}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.defaultProps = {
  label: '',
  valor: null,
  enterHandler: () => {},
};

DatePicker.propTypes = {
  label: PropTypes.string,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  enterHandler: PropTypes.func,
  cyElement: PropTypes.string.isRequired,
};

export default DatePicker;
