import api from '../base';

const baseUrl = '/api/portocred';

const baseApi = api(baseUrl, {});

const Api = {
  request(path, options) {
    return baseApi.request(path, options);
  },
};

export default Api;
