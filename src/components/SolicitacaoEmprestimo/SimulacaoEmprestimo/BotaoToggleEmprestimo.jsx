import React from 'react';

import PropTypes from 'prop-types';

import BotaoCalcularEmprestimo from './BotaoCalcularEmprestimo';
import BotaoSolicitacaoEmprestimo from './BotaoSolicitacaoEmprestimo';

export default function BotaoToggleEmprestimo({
  isDisable,
  isCalculoParcela,
  isMobile,
  resumoCompleto,
}) {
  if (isCalculoParcela) {
    return (
      <BotaoCalcularEmprestimo isMobile={isMobile} isDisable={isDisable} />
    );
  }
  return (
    <BotaoSolicitacaoEmprestimo
      isMobile={isMobile}
      resumoCompleto={resumoCompleto}
    />
  );
}

BotaoToggleEmprestimo.defaultProps = {
  isMobile: false,
};

BotaoToggleEmprestimo.propTypes = {
  isCalculoParcela: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
};
