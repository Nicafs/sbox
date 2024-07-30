import env from '../../../environment';
import api from './base';
// import { BASE_URL } from '../../constants/api-constants'

const baseApi = api(env.api.baseUrl);

const Api = {
  request(path, options) {
    return baseApi.request(path, options);
  },
};

export default Api;
