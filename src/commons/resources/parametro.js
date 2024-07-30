import Api from './api/negociacao-api';

const path = '/parametro';

const Parametro = {
  buscarParametrosDoSistema() {
    return Api.request(`${path}/sistema`, {
      method: 'GET',
    });
  },
  buscaDinamicaDeParametros(query) {
    return Api.request(`${path}/sistema/buscar`, {
      method: 'POST',
      data: query,
    });
  },
};

export default Parametro;
