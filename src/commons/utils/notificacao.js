import { getToken } from 'commons/hooks/Firebase/messaging';
import NotificacaoApi from 'commons/resources/notificacao';

const subscribeToNotifications = async () => {
  const token = await getToken();

  if (token) {
    console.log('Registrando token na aplicação');
    try {
      await NotificacaoApi.cadastrarRegistrationToken(token);
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar token de notificação', error);
    }
  }
  return false;
};

const unsubscribeToNotifications = async () => {
  const token = await getToken();

  if (token) {
    console.log('Removendo token da aplicação');
    try {
      await NotificacaoApi.removerRegistrationToken(token);
      return true;
    } catch (error) {
      console.error('Erro ao remover token de notificação', error);
    }
  }
  return false;
};

const consultarAutorizacaoPeriodo = async () => {
  try {
    const res = await NotificacaoApi.consultarSolicitacaoAutorizacaoPeriodo();
    return res.solicitacaoAutorizacao;
  } catch (err) {
    console.error(err);
    const msgErro = `Erro ao consultar solicitação de autorização por período. ${
      err.response
        ? err.response.data.erros.map(
            e => `Código: ${e.codigo} - Descrição: ${e.descricao}.`,
          )
        : 'Erro inesperado.'
    }`;
    console.error(msgErro);
    return false;
  }
};

const atualizarAutorizacao = async autorizacaoNotificacao => {
  try {
    await NotificacaoApi.atualizarAutorizacao(autorizacaoNotificacao);
    return true;
  } catch (err) {
    console.error(err);
    const msgErro = `Erro ao atualizar autorização de notificação. ${
      err.response
        ? err.response.data.erros.map(
            e => `Código: ${e.codigo} - Descrição: ${e.descricao}.`,
          )
        : 'Erro inesperado.'
    }`;
    console.error(msgErro);
    return false;
  }
};

export {
  subscribeToNotifications,
  unsubscribeToNotifications,
  consultarAutorizacaoPeriodo,
  atualizarAutorizacao,
};
