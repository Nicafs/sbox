import React, { useEffect } from 'react';

import ContaBancariaContainer from 'containers/ContaBancaria/ContaBancaria';

import { useFirebase } from '@credito-express/ce-components';

import FormularioPublicoContainer from '../../../../layouts/FormularioPublicoContainer';
import { useSimulacaoState } from '../../../../pages/Tomador/SolicitacaoEmprestimo/state';

const ContaBancaria = ({ atualizarDadosLocal }) => {
  const firebase = useFirebase();
  const [
    {
      contaBancaria: reducerContaBancaria = {},
      organizacao: {
        camposPersonalizados: {
          contaBancaria: camposContaBancaria = [],
          contaBancariaAdicionais: camposContaBancariaAdicionais = [],
        } = {},
      },
      camposAdicionais: valoresCamposAdicionais,
    },
    { etapaContaBancaria },
  ] = useSimulacaoState();

  const getValoresCamposPadroes = () => {
    // Estado inicial de acordo com reducer state
    const {
      banco: { id: idBanco, nome: nomeBanco, data } = {},
      agencia: reducerAgencia = '',
      conta: reducerConta = '',
      tipoConta: reducerTipoConta = '',
      tipoOperacao: reducerTipoOperacao = '',
    } = reducerContaBancaria;

    const bancoObj = idBanco
      ? { label: nomeBanco, value: idBanco, data }
      : null;

    return {
      banco: bancoObj,
      tipoConta: reducerTipoConta,
      agencia: reducerAgencia,
      conta: reducerConta,
      tipoOperacao: reducerTipoOperacao,
    };
  };

  const onFormikSubmit = values => {
    const {
      banco,
      tipoConta,
      agencia,
      conta,
      tipoOperacao,
      ...valoresCamposAdicionaisRest
    } = values;

    const { label, value, data } = banco;
    const payload = {
      banco: {
        id: value,
        nome: label,
        data,
      },
      tipoConta,
      agencia,
      conta,
      camposAdicionais: valoresCamposAdicionaisRest,
      tipoOperacao,
    };
    etapaContaBancaria(payload);
  };

  useEffect(() => {
    firebase.analytics().logEvent('acessou_conta_bancaria');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormularioPublicoContainer
      formJustifyContent="center"
      formAlignItems="flex-start"
      formJustifyContentMobile={null}
      formAlignItemsMobile="flex-start"
      formulario={
        <ContaBancariaContainer
          valoresCamposPadroes={getValoresCamposPadroes()}
          valoresCamposAdicionais={valoresCamposAdicionais}
          configCamposContaBancaria={camposContaBancaria}
          configCamposContaBancariaAdicionais={camposContaBancariaAdicionais}
          onFormikSubmit={onFormikSubmit}
          atualizarDadosLocal={atualizarDadosLocal}
          exibirFooterSolicitacaoEmprestimo
        />
      }
    />
  );
};

ContaBancaria.label = 'Informe sua conta';
ContaBancaria.title = 'Informe a sua conta para receber o empréstimo';

export default ContaBancaria;
