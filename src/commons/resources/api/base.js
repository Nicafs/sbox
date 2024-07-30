import axios from 'axios';
import defaultsDeep from 'lodash.defaultsdeep';
import qs from 'qs';

import { validateRequest, errorHandler, successHandler } from './interceptors';

const getConfig = customHeaders => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Accept-Language': 'pt-BR',
    'X-Frame-Options': 'sameorigin',
    'X-content-type-options': 'nosniff',
  };
  const headers =
    customHeaders && Object.keys(customHeaders).length > 0
      ? customHeaders
      : defaultHeaders;
  return {
    headers,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };
};

const api = (
  baseURL,
  config,
  validarRequest = true,
  utilizarInterceptors = true,
  customHeaders = {},
) => {
  const axiosApi = axios.create({
    baseURL,
    ...config,
  });

  axiosApi.request = (path, options) => {
    const mergedOptions = defaultsDeep(options, getConfig(customHeaders));

    return axiosApi(path, mergedOptions).then(resp => resp.data);
  };

  if (utilizarInterceptors) {
    if (validarRequest) {
      axiosApi.interceptors.request.use(validateRequest);
    }
    axiosApi.interceptors.response.use(
      response => successHandler(response),
      error => errorHandler(error),
    );
  }

  return axiosApi;
};

export default api;
