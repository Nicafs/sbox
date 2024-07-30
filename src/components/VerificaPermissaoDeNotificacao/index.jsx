import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import ModalInstrucoesDePermissao from './ModalInstrucoesDePermissao';

export default function VerificaPermissaoDeNotificacao({
  mostrarAlertaErro,
  handleSolicitacaoPermissao,
}) {
  const [suporteNotificacoes, setSuporteNotificacoes] = useState(true);
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);
  const [permissaoBloqueada, setPermissaoBloqueada] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  const verificarPermissao = () => {
    if (!('Notification' in window)) {
      setSuporteNotificacoes(false);
    } else if (Notification.permission === 'granted') {
      setPermissaoConcedida(true);
    } else if (Notification.permission === 'denied') {
      setPermissaoBloqueada(true);
    } else {
      setSuporteNotificacoes(true);
      setPermissaoBloqueada(false);
      setPermissaoConcedida(false);
    }
  };

  const handlePermissao = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setLoading(true);
      handleSolicitacaoPermissao(true);
    } else {
      handleSolicitacaoPermissao(false);
    }
  };

  const getModalTitulo = () => 'Permitir notificações';

  const getModalInfo = () => (
    <>
      Deseja receber notificações sobre o status da sua solicitação de
      empréstimo? Caso sim, clique em <strong>&quot;Permitir&quot;</strong>{' '}
      quando solicitado.
    </>
  );

  useEffect(() => {
    verificarPermissao();
    return () => setLoading(false);
  }, []);

  useEffect(() => {
    if (!suporteNotificacoes && mostrarAlertaErro) {
      exibirAlerta(
        'Infelizmente, seu browser não suporta notificações',
        'error',
      );
    }
  }, [suporteNotificacoes]); // eslint-disable-line react-hooks/exhaustive-deps

  if (permissaoConcedida) {
    return <></>;
  }
  if (!permissaoBloqueada && suporteNotificacoes) {
    return (
      <ModalInstrucoesDePermissao
        titulo={getModalTitulo()}
        info={getModalInfo()}
        handlePermissao={handlePermissao}
        loading={loading}
      />
    );
  }
  return <></>;
}

VerificaPermissaoDeNotificacao.propTypes = {
  mostrarAlertaErro: PropTypes.bool,
  handleSolicitacaoPermissao: PropTypes.func,
};

VerificaPermissaoDeNotificacao.defaultProps = {
  mostrarAlertaErro: true,
  handleSolicitacaoPermissao: () => {},
};
