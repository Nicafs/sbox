import React from 'react';

import PropTypes from 'prop-types';

import MensagemDeErro from '../MensagemDeErro';

export default function ExibicaoErros({ formik }) {
  const { errors, touched } = formik;
  return (
    <>
      {Object.keys(errors)
        .filter(err => Object.keys(touched).includes(err))
        .map(key => (
          <div cy-element="errorMessage" key={key}>
            <MensagemDeErro>{errors[key]}</MensagemDeErro>
          </div>
        ))}
    </>
  );
}

/* eslint-disable react/forbid-prop-types */
ExibicaoErros.propTypes = {
  formik: PropTypes.object.isRequired,
};
