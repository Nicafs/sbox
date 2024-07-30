import Api from './api/general-api';

const path = '/organizacao';

const Organizacao = {
  getTemaPorCodigo(codigo) {
    return Api.request(`${path}/tema/${codigo}`);
  },
  getCampoPersonalizado(id, nomeCampo, nomeItem) {
    return Api.request(
      `${path}/campos-personalizados/${id}/${nomeCampo}/${nomeItem}`,
      {
        method: 'GET',
      },
    );
  },
  getCamposPersonalizadosPorOcupacao(ocupacaoProfissional) {
    return Api.request(`/camposPersonalizados/busca`, {
      method: 'POST',
      data: {
        ocupacaoProfissional,
      },
    });
  },
};

export default Organizacao;
