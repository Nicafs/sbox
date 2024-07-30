import React from 'react';

import ModalSimulacaoEmprestimo from 'components/SolicitacaoEmprestimo/SimulacaoEmprestimo/ModalSimulacaoEmprestimo';
import PropTypes from 'prop-types';

import DialogAlertaSessao from '../../components/DialogAlertaSessao';
import DialogSessaoExpirada from '../../components/DialogSessaoExpirada';
import ModalFinal from '../../components/SolicitacaoEmprestimo/DadosFinais/ModalFinal';
import SolicitacaoEmprestimoHeader from '../../components/SolicitacaoEmprestimo/SolicitacaoEmprestimoHeader';
import VerificaPermissaoDeNotificacao from '../../components/VerificaPermissaoDeNotificacao';

const SolicitacaoEmprestimoPresenter = ({
  StepEmExibicao,
  exibirModal,
  exibirModalSessaoEncerrada,
  cancelarSessao,
  finalizarSessao,
  sobreporSessao,
  showModalPermissao,
  handleSolicitacaoPermissaoNotificacao,
  tokenAtualizado,
  realizarLogout,
  atualizarSimulacaoLocal,
  salvarHistoricoSimulacao,
  atualizarDadosLocal,
  headerEmprestimoVisivel,
  activeStep,
  steps,
  lazyLabels,
}) => {
  return (
    <>
      <DialogAlertaSessao
        open={exibirModal}
        cancelarSessao={cancelarSessao}
        sobreporSessao={sobreporSessao}
      />
      <DialogSessaoExpirada
        open={exibirModalSessaoEncerrada}
        finalizarSessao={finalizarSessao}
        sobreporSessao={sobreporSessao}
      />
      <ModalFinal tokenAtualizado={tokenAtualizado} />

      <ModalSimulacaoEmprestimo />

      {showModalPermissao && (
        <VerificaPermissaoDeNotificacao
          handleSolicitacaoPermissao={handleSolicitacaoPermissaoNotificacao}
        />
      )}
      {headerEmprestimoVisivel && (
        <SolicitacaoEmprestimoHeader
          steps={steps}
          lazyLabels={lazyLabels}
          logout={realizarLogout}
          activeStep={activeStep}
        />
      )}
      {!exibirModal && (
        <StepEmExibicao
          atualizarSimulacaoLocal={atualizarSimulacaoLocal}
          salvarHistoricoSimulacao={salvarHistoricoSimulacao}
          atualizarDadosLocal={atualizarDadosLocal}
        />
      )}
    </>
  );
};

SolicitacaoEmprestimoPresenter.propTypes = {
  StepEmExibicao: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]).isRequired,
  exibirModal: PropTypes.bool.isRequired,
  cancelarSessao: PropTypes.func.isRequired,
  sobreporSessao: PropTypes.func.isRequired,
  showModalPermissao: PropTypes.bool.isRequired,
  handleSolicitacaoPermissaoNotificacao: PropTypes.func.isRequired,
  tokenAtualizado: PropTypes.bool.isRequired,
  realizarLogout: PropTypes.func.isRequired,
  atualizarSimulacaoLocal: PropTypes.func.isRequired,
  salvarHistoricoSimulacao: PropTypes.func.isRequired,
  atualizarDadosLocal: PropTypes.func.isRequired,
  headerEmprestimoVisivel: PropTypes.bool.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node.isRequired,
      PropTypes.func.isRequired,
      PropTypes.object.isRequired,
    ]),
  ).isRequired,
  lazyLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SolicitacaoEmprestimoPresenter;
