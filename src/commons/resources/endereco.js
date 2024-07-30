import Api from './api/pessoa-api';

const path = '/endereco';

const Endereco = {
  consultarCep(cep) {
    return Api.request(`${path}/cep/${cep}`);
  },
  buscarCidadePorId(idCidade) {
    return Api.request(`${path}/cidade/${idCidade}`);
  },
  listarCidadesPorUF(uf) {
    return Api.request(`${path}/cidades/${uf}`);
  },
  listEstados() {
    return Api.request(`${path}/estados`);
  },
  getEnderecoAtualNoCadastro() {
    return Api.request(`${path}/atual`);
  },
};

export default Endereco;
