import React, { useEffect, useState } from 'react';

import ModalConfirmacao from '../../components/ModalConfirmacao';

const VerificacaoNovaVersao = () => {
  const [versaoAtualizada, setVersaoAtualizada] = useState();
  const [modalAberto, setModalAberto] = useState(false);
  const [numeroNovaVersao, setNumeroNovaVersao] = useState();

  const getAppVersion = () => {
    const url = `/version.json`;
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    };

    return fetch(url, { headers }).then(response => response.json());
  };

  const handleScreenFocus = () => {
    if (process.env.REACT_APP_ENV === 'e2e') {
      console.log('Controle de cache desabilitado!!!');
      return;
    }

    if (window.location.pathname === '/') {
      return;
    }

    if (versaoAtualizada) {
      console.log('Versão atualizada!!!');
      return;
    }

    const currentVersion = window.localStorage.getItem('appVersion');

    getAppVersion().then(data => {
      const { version } = data;

      if (version === currentVersion) {
        setVersaoAtualizada(true);
      } else {
        setModalAberto(true);
        setNumeroNovaVersao(version);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('click', handleScreenFocus, false);
    return () => window.removeEventListener('click', handleScreenFocus, false);
  }, [versaoAtualizada]); // eslint-disable-line react-hooks/exhaustive-deps

  const btnSucessoClickHandler = async () => {
    if ('caches' in window) {
      // Service worker cache should be cleared with caches.delete()
      const cacheKeys = await window.caches.keys();
      await Promise.all(
        cacheKeys.map(key => {
          window.caches.delete(key);
          return null;
        }),
      );
    }

    // delete browser cache and hard reload
    window.localStorage.setItem('appVersion', numeroNovaVersao);
    window.location.reload();
  };

  return (
    <ModalConfirmacao
      open={modalAberto}
      handleClose={() => {}}
      btnSucessoClickHandler={btnSucessoClickHandler}
      btnCancelarClickHandler={() => {}}
      titulo="Atualização obrigatória"
      texto="Uma nova versão da plataforma foi encontrada, clique no botão abaixo para continuar"
      btnCancelarDisabled
      maxWidth="sm"
      btnCancelarDisplay="none"
    />
  );
};

export default VerificacaoNovaVersao;
