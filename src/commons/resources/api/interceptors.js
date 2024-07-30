// import { getTokenAutenticacaoFirebase } from '@credito-express/ce-components';

import i18n from '../../i18n';

const isHandlerEnabled = (config = {}) =>
  !(config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled);

export const errorHandler = error => {
  const { response } = error;
  let statusCode;
  let erroDescricao = '';
  if (isHandlerEnabled(error.config) && response) {
    const { status } = response;
    statusCode = status;
    const { data } = response;
    const possuiCodigoDeErro =
      data &&
      data.erros &&
      Array.isArray(data.erros) &&
      data.erros[0].hasOwnProperty('codigo');
    if (possuiCodigoDeErro) {
      const codigoDeErro = data.erros[0].codigo;
      if (!codigoDeErro) {
        erroDescricao =
          'Não foi possível processar sua solicitação neste momento.';
      } else {
        erroDescricao = data.erros[0].descricao;
      }
    } else {
      switch (status) {
        case 400:
          erroDescricao = i18n.t('apiErrors.badRequest');
          break;
        case 401:
        case 403:
          erroDescricao = i18n.t('apiErrors.forbidden');
          break;
        case 404:
          erroDescricao = i18n.t('apiErrors.notFound');
          break;
        case 500:
        default:
          erroDescricao = i18n.t('apiErrors.internalServerError');
          break;
      }
    }
  }

  const erroObj = {
    ...error,
    status: statusCode,
    erro: erroDescricao,
  };

  return Promise.reject(erroObj);
};

export const successHandler = response => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

export const validateRequest = async config => {
  // const tokenAutenticacaoContexto = await getTokenAutenticacaoFirebase();
  const tokenAutenticacaoLocalStorage = window.localStorage.getItem(
    'tokenAutenticacao',
  );
  const e2eSessionId = window.localStorage.getItem('e2eSessionId');

  const tokenAutenticacao = tokenAutenticacaoLocalStorage;
  // tokenAutenticacaoContexto || tokenAutenticacaoLocalStorage;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: tokenAutenticacao
        ? `Bearer ${tokenAutenticacao}`
        : undefined,
      e2eSessionId: e2eSessionId || undefined,
    },
  };
};
