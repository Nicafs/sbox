import Api from '../api/organizacao/portCredApi';

const PortoCredApi = {
  getCalculoEmprestimo(data) {
    return Api.request('/calculo-emprestimo', {
      data,
      method: 'POST',
    });
  },
};

export default PortoCredApi;
