import React from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import {
  ToastAnimated,
  showToast,
} from '@credito-express/ce-components/dist/components/Toast';

export default function AlertaApp() {
  const {
    alerta: {
      mensagem,
      variant,
      autoClose,
      position,
      onOpen,
      onClose,
      closeButton,
      horario,
    },
    actions: { fecharAlerta },
  } = useAppGlobal();

  if (horario) {
    showToast({
      variant,
      mensagem,
      ...(autoClose && { autoClose }),
      ...(position && { position }),
      ...(onOpen && { onOpen }),
      ...(onClose && { onClose }),
      ...(closeButton && { closeButton }),
    });
  }

  const handleOnClick = () => {
    fecharAlerta();
  };

  return (
    <>
      {horario && (
        <ToastAnimated
          onClick={handleOnClick}
          onOpen={handleOnClick}
          onClose={handleOnClick}
        />
      )}
    </>
  );
}
