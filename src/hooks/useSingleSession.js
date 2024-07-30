import { useEffect, useReducer } from 'react';

import pushRota from 'routes/push';
import { v1 as uuidv1 } from 'uuid';

import { useFirebase } from '@credito-express/ce-components';

export default function useSingleSession(fluxo, idPessoa, podeIniciar = true) {
  const firebase = useFirebase();
  const ignore = process.env.REACT_APP_ENV === 'e2e';

  if (!fluxo) {
    throw Error('Nome do Fluxo deve ser informado!');
  }

  const actions = {
    REGISTRAR: 'REGISTRAR',
    EXIBIR_MODAL: 'EXIBIR_MODAL',
    SOBREPOR_SESSAO: 'SOBREPOR_SESSAO',
    CANCELAR_SESSAO: 'CANCELAR_SESSAO',
    SESSAO_ENCERRADA: 'SESSAO_ENCERRADA',
    SESSAO_ENCERRADA_FINALIZAR: 'SESSAO_ENCERRADA_FINALIZAR',
  };

  const initialState = {
    sessionId: uuidv1(),
    registrado: false,
    dadosValidados: false,
    exibirModal: false,
    exibirModalSessaoEncerrada: false,
    sessaoCancelada: false,
    inicializado: false,
    realtimeDbRef: null,
  };

  const reducer = (state, action) => {
    const { type, payload } = action;
    if (type === actions.REGISTRAR) {
      const { onDisconnectRef } = payload;
      return {
        ...state,
        onDisconnectRef,
        registrado: true,
        dadosValidados: true,
        inicializado: true,
      };
    }

    if (type === actions.EXIBIR_MODAL) {
      return {
        ...state,
        exibirModal: true,
        exibirModalSessaoEncerrada: false,
        dadosValidados: true,
        inicializado: true,
      };
    }

    if (type === actions.SOBREPOR_SESSAO) {
      const { onDisconnectRef } = payload;
      return {
        ...state,
        onDisconnectRef,
        exibirModal: false,
        exibirModalSessaoEncerrada: false,
        registrado: true,
      };
    }

    if (type === actions.CANCELAR_SESSAO) {
      return {
        ...state,
        exibirModal: false,
        exibirModalSessaoEncerrada: false,
        sessaoCancelada: true,
      };
    }

    if (type === actions.SESSAO_ENCERRADA) {
      return {
        ...state,
        exibirModal: false,
        exibirModalSessaoEncerrada: true,
      };
    }

    if (type === actions.SESSAO_ENCERRADA_FINALIZAR) {
      pushRota('/logout');
    }

    if (type === actions.SALVAR_DB_REF) {
      return {
        ...state,
        realtimeDbRef: payload.realtimeDbRef,
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { sessionId, registrado, sessaoCancelada, realtimeDbRef } = state;

  useEffect(() => {
    if (idPessoa) {
      getDbRef(idPessoa, fluxo);
    }
  }, [idPessoa]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!ignore && idPessoa && podeIniciar && realtimeDbRef) {
      inicializar();
    }
  }, [idPessoa, fluxo, podeIniciar, realtimeDbRef]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (registrado && idPessoa && realtimeDbRef) {
      return () => {
        return removeSessao(sessionId, state.onDisconnectRef);
      };
    }
  }, [registrado, idPessoa, fluxo, realtimeDbRef]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (registrado && idPessoa && realtimeDbRef) {
      const unsubscribe = subscribeSessao(sessionId, state.onDisconnectRef);
      return () => {
        unsubscribe();
        cleanUp();
      };
    }
  }, [registrado, idPessoa, fluxo, realtimeDbRef]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (sessaoCancelada) {
      pushRota('/');
    }
  }, [sessaoCancelada]);

  const cleanUp = async () => {
    if (realtimeDbRef) {
      const onDisconnect = realtimeDbRef.onDisconnect();
      const promise = onDisconnect.cancel();

      return promise;
    }
  };

  const getDbRef = (paramUserId, paramFluxo) => {
    const ref = firebase
      .database()
      .ref(`users/${paramUserId}/sessions/${paramFluxo}`);
    dispatch({ type: actions.SALVAR_DB_REF, payload: { realtimeDbRef: ref } });

    return ref;
  };

  const registrarSessao = async paramSessionId => {
    await realtimeDbRef.set(paramSessionId);
    const onDisconnectRef = realtimeDbRef.onDisconnect();
    await onDisconnectRef.remove();
    return onDisconnectRef;
  };

  const existeSessaoAtiva = async paramSessionId => {
    const sessonIdRef = await realtimeDbRef.once('value');
    const sessonIdDB = sessonIdRef.val();
    return sessonIdDB && sessonIdDB !== paramSessionId;
  };

  const subscribeSessao = (paramSessionId, onDisconnectRef) => {
    const subscrFn = realtimeDbRef.on('value', async snapshot => {
      const sessonIdDB = snapshot.val();
      if (!sessonIdDB) {
        dispatch({ type: actions.SESSAO_ENCERRADA });
      } else if (sessonIdDB !== paramSessionId) {
        await onDisconnectRef.cancel();
        dispatch({ type: actions.CANCELAR_SESSAO });
      }
    });
    return () => realtimeDbRef.off('value', subscrFn);
  };

  const removeSessao = async (paramSessionId, onDisconnectRef) => {
    try {
      const sessonIdRef = await realtimeDbRef.once('value');
      const sessonIdDB = sessonIdRef.val();
      if (sessonIdDB === paramSessionId) {
        await realtimeDbRef.remove();
      }
      await onDisconnectRef.cancel();
    } catch (err) {
      console.error('removeSessao: Ocorreu um erro ao remover sessao', err);
    }
  };

  const sobreporSessao = async () => {
    const onDisconnectRef = await registrarSessao(sessionId);
    dispatch({ type: actions.SOBREPOR_SESSAO, payload: { onDisconnectRef } });
  };

  const cancelarSessao = () => {
    dispatch({ type: actions.CANCELAR_SESSAO });
  };

  const finalizarSessao = () => {
    dispatch({ type: actions.SESSAO_ENCERRADA_FINALIZAR });
  };

  async function inicializar() {
    const sessaoAtiva = await existeSessaoAtiva(sessionId);
    if (sessaoAtiva) {
      return dispatch({ type: actions.EXIBIR_MODAL });
    }
    const onDisconnectRef = await registrarSessao(sessionId);
    dispatch({ type: actions.REGISTRAR, payload: { onDisconnectRef } });
  }

  return {
    ...state,
    sobreporSessao,
    cancelarSessao,
    finalizarSessao,
    cleanUp,
  };
}
