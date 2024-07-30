import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import FormikSelect from './FormikSelect';

export default function FormikSelectAsyncList({
  formik,
  name,
  customHandleChange,
  cleanErrorOnChange,
  label,
  fullWidth,
  fnBuscarOpcoes,
  ...otherProps
}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    loadList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadList() {
    const novaLista = await fnBuscarOpcoes();
    setList(novaLista);
  }
  return (
    <FormikSelect
      formik={formik}
      name={name}
      customHandleChange={customHandleChange}
      cleanErrorOnChange={cleanErrorOnChange}
      fullWidth={fullWidth}
      label={label}
      list={list}
      {...otherProps}
    />
  );
}

/* eslint-disable react/forbid-prop-types */
FormikSelectAsyncList.propTypes = {
  cleanErrorOnChange: PropTypes.bool,
  customHandleChange: PropTypes.func,
  fnBuscarOpcoes: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

FormikSelectAsyncList.defaultProps = {
  cleanErrorOnChange: false,
  fullWidth: false,
  label: '',
  customHandleChange: undefined,
};
