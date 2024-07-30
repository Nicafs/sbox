import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getMessagingModule } from 'commons/hooks/Firebase/messaging';
import NotificacaoApi from 'commons/resources/notificacao';
import {
  subscribeToNotifications,
  atualizarAutorizacao,
} from 'commons/utils/notificacao';
import InfoNotificacao from 'components/InfoNotificacao';
import VerificaPermissaoDeNotificacao from 'components/VerificaPermissaoDeNotificacao';
import { useAppGlobal } from 'providers/AppGlobal';
import pushRota from 'routes/push';

import { useCreditoExpress } from '@credito-express/ce-components';

export default function NotificacaoApp() {
  const [showModalPermissao, setShowModalPermissao] = useState(false);
  const [novaMsg, setNovaMsg] = useState(null);
  const {
    state: {
      pessoa: { pessoaAutenticada },
    },
  } = useCreditoExpress();
  const {
    notificacao: { titulo, mensagem, acao, handleClose },
  } = useAppGlobal();

  const location = useLocation();

  const getNotificacaoAcao = clickAction => {
    const splitted = clickAction.split('/');
    const rota = `/${splitted[splitted.length - 1]}`;

    if (location.pathname === rota) {
      return {
        nome: 'Conferir',
        handler: () => window.location.reload(),
      };
    }
    return {
      nome: 'Conferir',
      handler: () => pushRota(rota),
    };
  };

  const messaging = getMessagingModule();

  if (messaging) {
    messaging.onTokenRefresh(() => {
      console.log('Atualizando token FCM');
      subscribeToNotifications();
    });

    messaging.onMessage(payload => {
      console.log('Mensagem recebida via FCM', payload);
      const evtMensagem = payload.data;

      const { idPessoa } = evtMensagem;
      const idPessoaAutenticada = pessoaAutenticada && pessoaAutenticada.id;

      if (idPessoa === idPessoaAutenticada) {
        const { clickAction } = evtMensagem;

        const evtAcao = getNotificacaoAcao(clickAction);

        setNovaMsg({
          titulo: evtMensagem.title,
          texto: evtMensagem.body,
          acao: evtAcao,
        });
      }
    });
  }

  const consultarAutorizacaoPrimeiraAnalise = async () => {
    try {
      const res = await NotificacaoApi.consultarSolicitacaoAutorizacaoPrimeiraAnalise();

      if (!messaging) {
        setShowModalPermissao(false);
        return;
      }

      if (!('Notification' in window) || Notification.permission === 'denied') {
        setShowModalPermissao(false);
        return;
      }

      if (Notification.permission === 'granted') {
        handleSolicitacaoPermissaoNotificacao(true);
        return;
      }

      if (res.solicitacaoAutorizacao) {
        setShowModalPermissao(false);
        return;
      }

      setShowModalPermissao(true);
    } catch (err) {
      console.error(err);
      const msgErro = `Erro ao consultar solicitação de autorização por primeiro acesso. ${
        err.response
          ? err.response.data.erros.map(
              e => `Código: ${e.codigo} - Descrição: ${e.descricao}.`,
            )
          : 'Erro inesperado.'
      }`;
      console.error(msgErro);
      setShowModalPermissao(false);
    }
  };

  const handleSolicitacaoPermissaoNotificacao = async autorizacaoNotificacao => {
    const atualizado = await atualizarAutorizacao(autorizacaoNotificacao);
    if (atualizado && autorizacaoNotificacao) {
      subscribeToNotifications();
    }
    setShowModalPermissao(false);
  };

  useEffect(() => {
    if (
      pessoaAutenticada &&
      Object.keys(pessoaAutenticada).length > 0 &&
      (pessoaAutenticada.perfilTomador || pessoaAutenticada.perfilTomadorEP)
    ) {
      consultarAutorizacaoPrimeiraAnalise();
    }
  }, [pessoaAutenticada]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {showModalPermissao && (
        <VerificaPermissaoDeNotificacao
          handleSolicitacaoPermissao={handleSolicitacaoPermissaoNotificacao}
        />
      )}
      {titulo && !showModalPermissao && (
        <InfoNotificacao
          titulo={titulo}
          mensagem={mensagem}
          acao={acao}
          handleClose={handleClose}
        />
      )}
      {novaMsg && !showModalPermissao && (
        <InfoNotificacao
          titulo={novaMsg.titulo}
          mensagem={novaMsg.texto}
          acao={novaMsg.acao}
          handleClose={() => setNovaMsg(null)}
        />
      )}
    </>
  );
}
