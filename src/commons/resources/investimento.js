import Api from './api/negociacao-api';

const path = '/investimento';

const Investimento = {
  getFiltrosDeInvestimentos() {
    const data = {};
    return Api.request(`${path}/filtro`, {
      method: 'POST',
      data,
    });
  },
  getInvestimentos({ filtros, ordenacao, paginaNumero, paginaTamanho }) {
    const data = {
      filtros,
      ordenacao,
      paginaNumero,
      paginaTamanho,
    };
    return Api.request(`${path}/buscar`, {
      data,
      method: 'POST',
    });
  },
  getDetalhesDoInvestimento(id) {
    return Api.request(`${path}/${id}`, {
      method: 'GET',
    });
  },
  getDadosContrato(id) {
    return Api.request(`${path}/${id}/contrato`, {
      method: 'GET',
    });
  },
  investir(data) {
    return Api.request(`${path}/investir`, {
      method: 'POST',
      data,
    });
  },
  simularInvestimento(idNegociacao) {
    return Api.request(`${path}/${idNegociacao}/calculo`, {
      method: 'GET',
    });
  },
};

export default Investimento;
