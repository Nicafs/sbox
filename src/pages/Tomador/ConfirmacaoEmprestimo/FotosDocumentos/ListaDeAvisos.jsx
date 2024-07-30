import React from 'react';

import AvisosList from 'components/AvisosList';

export default function ListaDeAvisos({
  exibirContinuarNoCelular,
  data,
  comCheckbox,
  toggleItemListaDeAvisos,
  ModalHeaderComponent,
  textEnvio = 'Reenvie',
}) {
  return (
    <>
      {ModalHeaderComponent && <ModalHeaderComponent textEnvio={textEnvio} />}
      <AvisosList
        exibirContinuarNoCelular={exibirContinuarNoCelular}
        data={data}
        comCheckbox={comCheckbox}
        toggleItemListaDeAvisos={toggleItemListaDeAvisos}
      />
    </>
  );
}

ListaDeAvisos.defaultProps = {
  exibirContinuarNoCelular: true,
};
