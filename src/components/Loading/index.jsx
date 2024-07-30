import React from 'react';

import TipoLogo from 'commons/enums/TipoLogo';
import { useAppGlobal } from 'providers/AppGlobal';

import { useCreditoExpress } from '@credito-express/ce-components';

import LoadingStyled from './styled';

const Loading = () => {
  const {
    actions: { getLogo },
  } = useAppGlobal();

  const {
    state: { autenticacaoLoading, usuarioFirebase, pessoa },
  } = useCreditoExpress();

  const possuiConteudo = obj => obj && Object.keys(obj).length;

  const sistemaCarregado =
    !autenticacaoLoading &&
    ((possuiConteudo(usuarioFirebase) && possuiConteudo(pessoa)) ||
      (!possuiConteudo(usuarioFirebase) && !possuiConteudo(pessoa)));

  return !sistemaCarregado ? (
    <p>Carregando...</p>
  ) : (
    <LoadingStyled name="loading">
      <div className="divLogo">
        <img
          src={getLogo(TipoLogo.BRASAO_MONOCROMATICO)}
          className="logo"
          alt="Brasão Monocromático"
        />
      </div>
    </LoadingStyled>
  );
};

export default Loading;
