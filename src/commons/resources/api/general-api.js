import env from '../../../environment';
import api from './base';

const baseApi = api(`${env.api.baseUrl}`);

const Api = {
  request(path, options) {
    return baseApi.request(path, options);
  },
};

export default Api;
