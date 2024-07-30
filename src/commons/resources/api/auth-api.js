import api from './base';

// eslint-disable-next-line no-undef
const baseApi = api(`/api/auth`);

const Api = {
  request(path, options) {
    return baseApi.request(path, options);
  },
};

export default Api;
