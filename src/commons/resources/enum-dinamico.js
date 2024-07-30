import Api from './api/general-api';

const path = '/enumDinamico';

const EnumDinamico = {
  listNacionalidade() {
    return Api.request(`${path}/NACIONALIDADE`, { method: 'GET' });
  },
  listMotivosCancelamento() {
    return Api.request(`${path}/MOTIVO_REJEICAO`, { method: 'GET' });
  },
};

export default EnumDinamico;
