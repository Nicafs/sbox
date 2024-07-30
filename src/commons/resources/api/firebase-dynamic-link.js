import api from './base';

const baseApi = api(
  `${process.env.REACT_APP_FIREBASE_DYNAMIC_URL}?key=${process.env.REACT_APP_API_KEY}`,
  {},
  false,
  false,
  {
    Accept: 'application/json',
    'Accept-Language': 'pt-BR',
  },
);

const Api = {
  request(path, options) {
    return baseApi.request(path, options);
  },
};

export default Api;
