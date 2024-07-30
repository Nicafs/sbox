import Api from './api/general-api';

const path = '/bancos';

const Banco = {
  listBancos() {
    return Api.request(path);
  },
  validarContaBancaria(params) {
    return Api.request(`${path}/conta-bancaria/validar`, {
      method: 'POST',
      data: params,
    });
  },
};

export default Banco;
