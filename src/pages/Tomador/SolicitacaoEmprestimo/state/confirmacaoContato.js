import ENDPOINTS from 'commons/constants/api-constants';
import api from 'commons/resources/api/general-api';
import { onlyNumber } from 'commons/utils/MaskHandle';

export async function verificaContatoEnviado(contato, confirmacaoContato = {}) {
  const isEmail = contato.indexOf('@') > -1;
  try {
    const url = `${
      isEmail
        ? ENDPOINTS.EMAIL_VERIFICA_ENVIO
        : ENDPOINTS.TELEFONE_VERIFICA_ENVIO
    }/${isEmail ? contato : onlyNumber(contato)}`;
    const { enviado } = await api.request(url);

    return {
      ...confirmacaoContato,
      [contato]: { ...confirmacaoContato[contato], enviado },
    };
  } catch (err) {
    return {
      ...confirmacaoContato,
      [contato]: { ...confirmacaoContato[contato], enviado: false },
    };
  }
}

export async function verificaContatoConfirmado(
  contato,
  confirmacaoContato = {},
) {
  const isEmail = contato.indexOf('@') > -1;
  try {
    const url = `${
      isEmail
        ? ENDPOINTS.EMAIL_VERIFICA_CONFIRMACAO
        : ENDPOINTS.TELEFONE_VERIFICA_CONFIRMACAO
    }/${isEmail ? contato : onlyNumber(contato)}`;
    const { confirmado } = await api.request(url);

    return {
      ...confirmacaoContato,
      [contato]: {
        ...confirmacaoContato[contato],
        confirmado,
      },
    };
  } catch (err) {
    return {
      ...confirmacaoContato,
      [contato]: { ...confirmacaoContato[contato], confirmado: false },
    };
  }
}

export async function enviarConfirmacaoContato(
  tokenEmail,
  contato,
  confirmacaoContato = {},
  force = false,
  origem,
) {
  const isEmail = contato.indexOf('@') > -1;
  const { [contato]: confirmacao = {} } = confirmacaoContato;
  if (confirmacao.enviado && !force) {
    return {};
  }
  const params = isEmail
    ? {
        email: contato,
        tokenEmail: origem !== 'CHAT' ? tokenEmail : undefined,
      }
    : {
        telefone: contato,
      };
  try {
    await api.request(
      isEmail
        ? ENDPOINTS.EMAIL_CONFIRMACAO_LINK
        : ENDPOINTS.TELEFONE_CONFIRMACAO,
      {
        data: params,
        method: 'POST',
      },
    );
    return {
      ...confirmacaoContato,
      modal: {
        ...confirmacaoContato.modal,
        enviado: true,
        confirmado: false,
        podeReenviar: false,
      },
      [contato]: {
        ...confirmacaoContato[contato],
        enviado: true,
        confirmado: false,
      },
    };
  } catch (e) {
    return {
      ...confirmacaoContato,
      modal: {
        ...confirmacaoContato.modal,
        enviado: false,
        confirmado: false,
        podeReenviar: true,
      },
      [contato]: {
        ...confirmacaoContato[contato],
        enviado: false,
        confirmado: false,
      },
    };
  }
}
