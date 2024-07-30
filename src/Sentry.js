import { useEffect } from 'react';

import { useCreditoExpress } from '@credito-express/ce-components';

import * as Sentry from '@sentry/react';

import { podeSalvarLogsNoSentry } from './sentryConfig';

export const inicializarRastreamentoDeErros = () => {
  if (podeSalvarLogsNoSentry()) {
    console.log('Inicializando Sentry tracking errors...');
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_INGESTION_URL,
      environment: process.env.REACT_APP_ENV,
      send_default_pii: true,
    });
  }
};

export const SentryApp = () => {
  const {
    state: { pessoa },
  } = useCreditoExpress();

  useEffect(() => {
    if (pessoa && Object.keys(pessoa).length) {
      const { id } = pessoa;
      Sentry.setTag('idPessoa', id);
    }
  }, [pessoa]);

  return null;
};
