import React from 'react';
import { withRouter } from 'react-router-dom';

import SolicitacaoEmprestimoContainer from '../../../containers/SolicitacaoEmprestimo';
import SimulacaoStateProvider from './state';

function SolicitacaoEmprestimo({ location }) {
  const idNegociacao = location.state ? location.state.idNegociacao : undefined;
  const cpfBuscado = location.state ? location.state.cpf : undefined;

  return (
    <SimulacaoStateProvider>
      <SolicitacaoEmprestimoContainer
        idNegociacao={idNegociacao}
        cpfBuscado={cpfBuscado}
      />
    </SimulacaoStateProvider>
  );
}

export default withRouter(SolicitacaoEmprestimo);
