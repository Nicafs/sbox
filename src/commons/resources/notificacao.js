import Api from './api/api';

const path = '/notificacao';

const NotificacaoApi = {
  cadastrarRegistrationToken(token) {
    const data = {
      registrationToken: token,
    };
    return Api.request(`${path}/token`, {
      method: 'POST',
      data,
    });
  },
  removerRegistrationToken(token) {
    const data = {
      registrationToken: token,
    };
    return Api.request(`${path}/token`, {
      method: 'DELETE',
      data,
    });
  },
  consultarAutorizacao() {
    return Api.request(`${path}/autorizacao`, {
      method: 'GET',
    });
  },
  atualizarAutorizacao(autorizacaoNotificacao) {
    const data = {
      autorizacaoNotificacao,
    };
    return Api.request(`${path}/autorizacao`, {
      method: 'PUT',
      data,
    });
  },
  consultarSolicitacaoAutorizacaoPeriodo() {
    return Api.request(`${path}/autorizacao/solicitacao/periodo`, {
      method: 'GET',
    });
  },
  consultarSolicitacaoAutorizacaoPrimeiraAnalise() {
    return Api.request(`${path}/autorizacao/solicitacao/primeira-analise`, {
      method: 'GET',
    });
  },
};

export default NotificacaoApi;
