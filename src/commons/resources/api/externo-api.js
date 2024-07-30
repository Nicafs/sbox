import api from './base';

const baseApi = api('', {}, true, false, {
  Accept: 'application/json',
});

const ExternoApi = {
  request(path, options) {
    return baseApi.request(path, options);
  },
  get(path) {
    return this.request(path, {});
  },
};

export default ExternoApi;
