import Api from './api/general-api';

const OrgaoEmissor = {
  listEmissorRg(uf) {
    return Api.request(`/orgao-emissor/${uf || undefined}`, {
      method: 'GET',
    });
  },
};

export default OrgaoEmissor;
