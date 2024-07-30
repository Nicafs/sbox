import React from 'react';

import verificarCadastroInvestidorDisponivel from 'commons/utils/verificarCadastroInvestidorDisponivel';

import AuthContainer from '../../containers/Auth/Login';

function Auth() {
  const cadastroInvestidorEstaDisponivelApi = async () => {
    try {
      const estaDisponivel = await verificarCadastroInvestidorDisponivel();
      return estaDisponivel;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <AuthContainer
      cadastroInvestidorEstaDisponivelApi={cadastroInvestidorEstaDisponivelApi}
    />
  );
}

export default Auth;
