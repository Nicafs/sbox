import qs from 'qs';

import Api from './api/general-api';

const path = '/profissao';

const Profissao = {
  buscarProfissoes(nome = '', paginaNumero = 1, paginaTamanho = 10) {
    const params = {
      nome,
      paginaNumero,
      paginaTamanho,
    };
    const querystring = qs.stringify(params);
    const pathUrl = `${path}?${querystring}`;
    return Api.request(pathUrl);
  },
  getProfissao(id) {
    return Api.request(`${path}/${id}`);
  },
};

export default Profissao;
