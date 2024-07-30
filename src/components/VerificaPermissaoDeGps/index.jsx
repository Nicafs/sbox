import React, { useEffect, useState } from 'react';

import { possuiPermissao } from '../../commons/utils/mediaDevices';
import ModalInstrucoesDePermissao from '../ModalInstrucoesDePermissao';

export default function VerificaPermissaoDeGps({
  onPermissaoAutorizadaHandler,
  children,
}) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState();
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);
  const [opcaoPularPermissao, setOpcaoPularPermissao] = useState(false);

  useEffect(() => {
    verificaPermissao();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const verificaPermissao = async () => {
    const permissaoAutorizada = await possuiPermissao('geolocation');
    if (permissaoAutorizada) {
      solicitaPermissao();
      setPermissaoConcedida(true);
    } else {
      setLoading(false);
    }
  };

  const solicitaPermissao = async () => {
    navigator.geolocation.getCurrentPosition(
      permissaoAutorizadaHandler,
      permissaoRecusadaHandler,
    );
  };

  const permissaoAutorizadaHandler = geoPosition => {
    setLoading(false);
    const { coords } = geoPosition;
    // const {
    //   accuracy, //: 1813
    //   altitude, //: null
    //   altitudeAccuracy, //: null
    //   heading, //: null
    //   latitude, //: -18.9202205
    //   longitude, //: -48.2313159
    //   speed, //: nu
    // } = coord;
    setPermissaoConcedida(true);
    onPermissaoAutorizadaHandler(coords);
  };

  const permissaoRecusadaHandler = () => {
    setLoading(false);
    setErro(true);
    setOpcaoPularPermissao(true);
  };

  const getModalTitulo = () => 'Permitir localização';

  const getModalInfo = () => (
    <>
      Para confirmar o empréstimo, clique em{' '}
      <strong>&quot;Permitir&quot;</strong> para que a Crédito Express tenha
      acesso a localização do seu dispositivo
    </>
  );

  if (loading) {
    return null;
  }

  if (permissaoConcedida || opcaoPularPermissao) {
    return children;
  }
  return (
    <>
      <ModalInstrucoesDePermissao
        erro={erro}
        solicitaPermissao={solicitaPermissao}
        titulo={getModalTitulo()}
        renderInfo={getModalInfo()}
      />
    </>
  );
}

VerificaPermissaoDeGps.defaultProps = {
  onPermissaoAutorizadaHandler: () => {},
  children: <></>,
};
