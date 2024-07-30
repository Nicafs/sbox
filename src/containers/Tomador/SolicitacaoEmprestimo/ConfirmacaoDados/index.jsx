import React from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import ConfirmacaoECP from './ConfirmacaoECP';
import ConfirmacaoEP from './ConfirmacaoEP';

export default function ConfirmacaoDadosContainer() {
  const { tipoFluxo } = useAppGlobal();

  return (
    <>{tipoFluxo === 'BANCO_SEMEAR' ? <ConfirmacaoEP /> : <ConfirmacaoECP />}</>
  );
}
