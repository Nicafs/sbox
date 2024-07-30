import Api from './api/general-api';

const path = '/empresa';

const Empresa = {
  getEmpresa(id) {
    return Api.request(`${path}/${id}`);
  },
};

export default Empresa;
