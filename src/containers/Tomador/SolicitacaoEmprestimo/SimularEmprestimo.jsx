import React from 'react';

import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';

import SimularECP from './SimularEmprestimo/SimularECP';
import SimularEP from './SimularEmprestimo/SimularEP';

export default function SimularEmprestimoContainer({
  atualizarSimulacaoLocal,
  salvarHistoricoSimulacao,
  atualizarDadosLocal,
}) {
  const [{ tipoFluxo }] = useSimulacaoState();

  return (
    <>
      {tipoFluxo === 'BANCO_SEMEAR' ? (
        <SimularEP
          atualizarSimulacaoLocal={atualizarSimulacaoLocal}
          salvarHistoricoSimulacao={salvarHistoricoSimulacao}
          atualizarDadosLocal={atualizarDadosLocal}
        />
      ) : (
        <SimularECP
          atualizarSimulacaoLocal={atualizarSimulacaoLocal}
          salvarHistoricoSimulacao={salvarHistoricoSimulacao}
        />
      )}
    </>
  );
}
