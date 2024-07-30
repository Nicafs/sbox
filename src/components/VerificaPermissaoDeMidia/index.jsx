import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

import { possuiPermissaoDeMidia } from 'commons/utils/mediaDevices';
import PropTypes from 'prop-types';

import ModalInstrucoesDePermissao from '../ModalInstrucoesDePermissao';

const mediaTypes = ['audioinput', 'videoinput'];
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment',
};

export default function VerificaPermissaoDeMidia({
  mediaType,
  onPermissaoAutorizadaHandler,
  children,
}) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState();
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);
  const [webcamVisivel, setWebcamVisivel] = useState(false);
  const precisaSolicitarAudio = mediaType === 'audioinput';

  useEffect(() => {
    if (mediaTypes.includes(mediaType)) {
      verificaPermissao();
    } else {
      console.error(`Tipo de mídia inválido: ${mediaType}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const verificaPermissao = async () => {
    const permissaoAutorizada = await possuiPermissaoDeMidia(mediaType);
    if (permissaoAutorizada) {
      onPermissaoAutorizadaHandler();
      setPermissaoConcedida(true);
    }
    setLoading(false);
  };

  const solicitaPermissao = async () => {
    if (webcamVisivel) {
      setWebcamVisivel(false);
    }
    setWebcamVisivel(true);
  };

  const permissaoAutorizadaHandler = () => {
    setTimeout(() => {
      setPermissaoConcedida(true);
      onPermissaoAutorizadaHandler();
    }, 2000);
  };

  const permissaoRecusadaHandler = () => setErro(true);

  const getModalTitulo = () =>
    mediaType === 'audioinput' ? 'Permitir microfone' : 'Permitir câmera';

  const getModalInfo = () =>
    mediaType === 'audioinput' ? (
      <>
        Para gravar assinatura e confirmar o empréstimo, clique em{' '}
        <strong>&quot;Permitir&quot;</strong> para que a Crédito Express tenha
        acesso ao microfone do seu dispositivo
      </>
    ) : (
      <>
        Para tirar fotos e confirmar o empréstimo, clique em{' '}
        <strong>&quot;Permitir&quot;</strong> para que a Crédito Express tenha
        acesso à câmera do seu dispositivo
      </>
    );

  const renderWebcam = () => {
    if (webcamVisivel) {
      return (
        <Webcam
          audio={precisaSolicitarAudio}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          forceScreenshotSourceSize
          onUserMedia={permissaoAutorizadaHandler}
          onUserMediaError={permissaoRecusadaHandler}
        />
      );
    }
  };

  if (loading) {
    return null;
  }

  if (permissaoConcedida) {
    return children;
  }
  return (
    <>
      <div style={{ display: 'none' }}>{renderWebcam()}</div>
      <ModalInstrucoesDePermissao
        erro={erro}
        solicitaPermissao={solicitaPermissao}
        titulo={getModalTitulo()}
        renderInfo={getModalInfo()}
      />
    </>
  );
}

VerificaPermissaoDeMidia.propTypes = {
  mediaType: PropTypes.oneOf(['videoinput', 'audioinput']).isRequired,
  onPermissaoAutorizadaHandler: PropTypes.func,
};

VerificaPermissaoDeMidia.defaultProps = {
  onPermissaoAutorizadaHandler: () => {},
};
