import React from 'react';

import { GridTexto, Texto } from './style';

const MensagemCodigoEnviado = ({ tipoValidacao, contato }) => {
  if (tipoValidacao === 'EMAIL') {
    return (
      <GridTexto item xs={12}>
        <Texto>{`Um e-mail foi enviado para ${contato}`}</Texto>
        <Texto>Acesse-o para verificá-lo</Texto>
      </GridTexto>
    );
  }
  return (
    <GridTexto item xs={12}>
      <Texto>{`Um código foi enviado para o número ${contato}`}</Texto>
      <Texto>Acesse-o para verificá-lo</Texto>
    </GridTexto>
  );
};

export default MensagemCodigoEnviado;
