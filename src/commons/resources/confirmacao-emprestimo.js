import Api from './api/confirmacao-emprestimo-api';

const path = '/confirmacaoEmprestimo';

const ConfirmacaoEmprestimo = {
  confirmaTipoDocumento({ idNegociacao, tipoDocumento }) {
    return Api.request(`${path}/${idNegociacao}/tipoDoc`, {
      data: { tipoDoc: tipoDocumento },
      method: 'PUT',
    });
  },

  confirmaDocFrente({ idNegociacao, capturaAutomatica }) {
    return Api.request(`${path}/${idNegociacao}/docFrente`, {
      data: { capturaAutomatica: !!capturaAutomatica },
      method: 'PUT',
    });
  },

  confirmaDocVerso({ idNegociacao, capturaAutomatica }) {
    return Api.request(`${path}/${idNegociacao}/docVerso`, {
      data: { capturaAutomatica: !!capturaAutomatica },
      method: 'PUT',
    });
  },

  confirmaSelfie({ idNegociacao }) {
    return Api.request(`${path}/${idNegociacao}/selfie`, { method: 'PUT' });
  },

  confirmaAudio({ idNegociacao }) {
    return Api.request(`${path}/${idNegociacao}/audio`, { method: 'PUT' });
  },

  confirmaContaBancaria({ idNegociacao }) {
    return Api.request(`${path}/${idNegociacao}/contaBancaria`, {
      method: 'PUT',
    });
  },
};

export default ConfirmacaoEmprestimo;
