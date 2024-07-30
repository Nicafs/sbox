import Api from './api/general-api';

const path = '/reconhecimentoAudioAssinatura';

const ReconhecimentoAssinatura = {
  processarAssinatura(idNegociacao) {
    return Api.request(`${path}/${idNegociacao}`);
  },
};

export default ReconhecimentoAssinatura;
