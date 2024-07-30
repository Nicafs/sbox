import React, { useEffect, useState } from 'react';

import LeadInvestidorContainer from 'containers/Investidor/LeadInvestidor';

import Negociacao from '../../../commons/resources/negociacao';
import verificarCadastroInvestidorDisponivel from '../../../commons/utils/verificarCadastroInvestidorDisponivel';
import Loading from '../../../components/Loading';
import pushRota from '../../../routes/push';

const LeadInvestidor = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificarSeCadastroInvestidorEstaDisponivel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const verificarSeCadastroInvestidorEstaDisponivel = async () => {
    try {
      setLoading(true);
      const cadastroDisponivel = await verificarCadastroInvestidorDisponivel();
      processaResultadoCadastroDisponivel(cadastroDisponivel);
    } catch (ex) {
      processaResultadoCadastroDisponivel(false);
    }
  };

  const processaResultadoCadastroDisponivel = cadastroEstaDisponivel => {
    if (cadastroEstaDisponivel) {
      pushRota('/investidor/busca-investimentos-disponiveis');
      setLoading(false);
    } else {
      pushRota('/quero-investir');
      setLoading(false);
    }
  };

  const persistirLead = async ({ nome, celular, cpf }) => {
    const params = {
      nomeCliente: nome,
      cpfCliente: cpf,
      celularCliente: celular,
      tipoLead: 'INVESTIDOR',
    };
    return Negociacao.cadastrarLead(params);
  };

  if (loading) {
    return <Loading />;
  }
  return <LeadInvestidorContainer persistirLead={persistirLead} />;
};

export default LeadInvestidor;
