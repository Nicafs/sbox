import React, { useEffect, useMemo, useState } from 'react';

import {
  useAuth,
  useCreditoExpress,
  useFirebase,
} from '@credito-express/ce-components';

import {
  atualizarAutorizacao,
  subscribeToNotifications,
} from '../../commons/utils/notificacao';
import Loading from '../../components/Loading';
import usePersisteDadosTomador from '../../hooks/usePersisteDadosTomador';
import usePersisteHistoricoSimulacao from '../../hooks/usePersisteHistoricoSimulacao';
import useSingleSession from '../../hooks/useSingleSession';
import {
  getEtapasDisponiveis,
  IDS_FLUXO_SIMULACAO_ENUM,
} from '../../pages/Tomador/SolicitacaoEmprestimo/etapas';
import { useSimulacaoState } from '../../pages/Tomador/SolicitacaoEmprestimo/state';
import { useAppGlobal } from '../../providers/AppGlobal';
import pushRota from '../../routes/push';
import SolicitacaoEmprestimoPresenter from './presenter';

const SolicitacaoEmprestimoContainer = ({ idNegociacao, cpfBuscado }) => {
  const firebase = useFirebase();
  const {
    state: { pessoa },
    dispatch,
  } = useCreditoExpress();
  const {
    usuarioFirebase: usuarioFirebaseComNovaSenha,
    autenticarComCustomToken,
    signout,
  } = useAuth({});
  const {
    organizacao,
    loading,
    actions: { exibirAlerta },
  } = useAppGlobal();

  const [tokenAtualizado, setTokenAtualizado] = useState(false);
  const etapasDisponiveis = useMemo(() => {
    const etapas = getEtapasDisponiveis({ pessoa, organizacao, idNegociacao });
    return etapas;
  }, [getEtapasDisponiveis, pessoa, organizacao]); // eslint-disable-line react-hooks/exhaustive-deps

  const [fluxoPermissao, setFluxoPermissao] = useState(false);
  const [showModalPermissao, setShowModalPermissao] = useState(false);
  const [
    {
      msg,
      logout,
      etapaAtualObj,
      persistido,
      novoCustomToken,
      pessoa: { id: idPessoa },
    },
    { init },
  ] = useSimulacaoState();

  const {
    exibirModal,
    exibirModalSessaoEncerrada,
    sobreporSessao,
    cancelarSessao,
    finalizarSessao,
    cleanUp: singleCleanUp,
  } = useSingleSession(
    'simulacaoEmprestimo',
    idPessoa,
    ![
      IDS_FLUXO_SIMULACAO_ENUM.LOADING_INICIAL,
      IDS_FLUXO_SIMULACAO_ENUM.AUTENTICACAO,
    ].includes(etapaAtualObj.id),
  );

  const {
    atualizarSimulacaoLocal,
    salvarHistoricoSimulacao,
    cleanUp: historicoCleanUp,
  } = usePersisteHistoricoSimulacao(
    'simulacaoEmprestimo',
    etapaAtualObj && etapaAtualObj.id === IDS_FLUXO_SIMULACAO_ENUM.VALORES,
  );

  const persisteDadosObj = () => {
    const idxEtapaAtual = etapasDisponiveis.indexOf(etapaAtualObj);
    const idxEtapaValores = etapasDisponiveis.findIndex(
      e => e.id === IDS_FLUXO_SIMULACAO_ENUM.VALORES,
    );

    if (idxEtapaAtual >= idxEtapaValores) return true;
    return false;
  };

  const { atualizarDadosLocal } = usePersisteDadosTomador(
    'dadosTomador',
    etapaAtualObj && persisteDadosObj(),
  );

  const realizarLogout = async () => {
    await historicoCleanUp();
    await singleCleanUp();
    await signout();

    dispatch({
      type: 'ATUALIZAR_DADOS_AUTENTICACAO',
      payload: {
        usuarioFirebase: {},
        pessoa: {},
      },
    });
    pushRota('/');
  };

  useEffect(() => {
    firebase.analytics().logEvent('acessou_quero_emprestimo');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Inicializa o App
  useEffect(() => {
    if (!etapaAtualObj.id) {
      init(pessoa, organizacao, idNegociacao, cpfBuscado);
    }
  }, [pessoa, etapaAtualObj, organizacao, idNegociacao]); // eslint-disable-line react-hooks/exhaustive-deps

  // Para exibir alertas vindas do reducer
  useEffect(() => {
    if (Object.keys(msg).length > 0) {
      exibirAlerta(msg.err, msg.tipo);
    }
  }, [msg]); // eslint-disable-line react-hooks/exhaustive-deps

  // Para executar logout vindo do reducer
  useEffect(() => {
    if (logout) {
      realizarLogout();
    }
  }, [logout]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (persistido) {
      if (novoCustomToken) {
        autenticarComCustomToken(novoCustomToken);
      }
      setFluxoPermissao(true);
    }
  }, [persistido]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      fluxoPermissao &&
      !loading &&
      'Notification' in window &&
      Notification.permission !== 'denied'
    ) {
      if (Notification.permission === 'granted') {
        handleSolicitacaoPermissaoNotificacao(true);
      } else {
        setShowModalPermissao(true);
      }
    }
  }, [fluxoPermissao, loading]);

  useEffect(() => {
    // Tomador cadastro nova senha então é necessário atualizar o usuario firebase novamente
    if (usuarioFirebaseComNovaSenha) {
      dispatch({
        type: 'ATUALIZAR_DADOS_AUTENTICACAO',
        payload: {
          pessoa,
          organizacao,
          usuarioFirebase: usuarioFirebaseComNovaSenha,
        },
      });
      setTokenAtualizado(true);
    }
  }, [usuarioFirebaseComNovaSenha]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSolicitacaoPermissaoNotificacao = async autorizacaoNotificacao => {
    const atualizado = await atualizarAutorizacao(autorizacaoNotificacao);
    if (atualizado && autorizacaoNotificacao) {
      subscribeToNotifications();
    }
    setShowModalPermissao(false);
  };

  const getStepEmExibicao = () => {
    if (etapaAtualObj.id) {
      const etapa = etapasDisponiveis.find(({ id }) => etapaAtualObj.id === id);
      return etapa.container;
    }

    return Loading;
  };

  const StepEmExibicao = getStepEmExibicao();

  return (
    <SolicitacaoEmprestimoPresenter
      StepEmExibicao={StepEmExibicao}
      exibirModal={exibirModal}
      exibirModalSessaoEncerrada={exibirModalSessaoEncerrada}
      cancelarSessao={cancelarSessao}
      finalizarSessao={finalizarSessao}
      sobreporSessao={sobreporSessao}
      showModalPermissao={showModalPermissao}
      handleSolicitacaoPermissaoNotificacao={
        handleSolicitacaoPermissaoNotificacao
      }
      tokenAtualizado={tokenAtualizado}
      realizarLogout={realizarLogout}
      atualizarSimulacaoLocal={atualizarSimulacaoLocal}
      salvarHistoricoSimulacao={salvarHistoricoSimulacao}
      atualizarDadosLocal={atualizarDadosLocal}
      headerEmprestimoVisivel={etapaAtualObj.exibirSteper} // 2 = Etapa de valores
      steps={etapasDisponiveis
        .filter(({ exibirSteper }) => exibirSteper)
        .map(({ container }) => container)}
      lazyLabels={etapasDisponiveis
        .filter(({ exibirSteper }) => exibirSteper)
        .map(({ label }) => label)}
      activeStep={
        etapasDisponiveis.indexOf(etapaAtualObj) -
        etapasDisponiveis.filter(({ exibirSteper }) => !exibirSteper).length
      }
    />
  );
};

SolicitacaoEmprestimoContainer.propTypes = {};

export default SolicitacaoEmprestimoContainer;
