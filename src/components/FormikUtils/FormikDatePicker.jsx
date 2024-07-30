import React from 'react';

import { getIn } from 'formik';

import DatePicker from '../MaterialUI/DatePicker/DatePicker';

export default function FormikDatePicker({
  formik,
  name,
  enterHandler,
  label,
  cyElement,
  maxDate,
  minDate,
  customHandleChange,
  cleanErrorOnChange = false,
  ...otherProps
}) {
  const { values, setFieldValue, setFieldTouched } = formik;
  const valor = values[name];

  const { errors, touched } = formik;

  const possuiErro = getIn(errors, name) && getIn(touched, name);

  function gerarErro() {
    if (possuiErro) {
      const errorMsg = getIn(errors, name);
      if (errorMsg.includes('dataNascimento must be a `date` type')) {
        return { helperText: 'Data Inválida' };
      }
      return { helperText: errorMsg };
    }
    return {};
  }

  function handleChange(value) {
    if (customHandleChange) {
      setFieldValue(name, customHandleChange(value));
    } else {
      setFieldValue(name, value);
    }
    if (cleanErrorOnChange) {
      formik.setFieldError(name, undefined);
    }
  }

  const handleOnBlur = () => {
    setFieldTouched(name, true, true);
  };

  return (
    <DatePicker
      autoOk
      label={label}
      value={valor}
      name={name}
      onChange={data => handleChange(data)}
      onBlur={() => handleOnBlur()}
      enterHandler={enterHandler}
      cyElement={cyElement}
      maxDate={maxDate}
      minDate={minDate}
      error={possuiErro}
      {...gerarErro()}
      otherProps={otherProps}
    />
  );
}
