import history from './history';

function getUrlParams(search) {
  const hashes = search.slice(search.indexOf('?') + 1).split('&');
  const params = {};
  hashes.forEach(hash => {
    const [key, val] = hash.split('=');
    params[key] = decodeURIComponent(val);
  });
  return params;
}

export function getOrganizacaoDaUrl() {
  const params = getUrlParams(window.location.search);
  if (Object.keys(params).includes('organizacao')) {
    const { organizacao } = params;
    return organizacao;
  }
  return '';
}
export function getOrganizacaoQueryParam(pushParams = {}) {
  const params = getUrlParams(window.location.search);
  let queryParams = pushParams;
  if (Object.keys(params).includes('organizacao')) {
    const { organizacao } = params;
    queryParams = { ...queryParams, organizacao };
  }
  queryParams = Object.keys(queryParams)
    .map(k => `${k}=${queryParams[k]}`)
    .reduce((a, b) => `${a}${b}&`, '?');
  queryParams = queryParams.length > 0 ? queryParams.slice(0, -1) : undefined;
  return queryParams;
}

export function replaceRota(input) {
  if (input instanceof String) {
    history.replace({ pathname: input, search: getOrganizacaoQueryParam() });
  } else {
    const { pathname, search, ...others } = input;
    history.replace({
      pathname,
      search: getOrganizacaoQueryParam(search),
      ...others,
    });
  }
}

export function goBackRota() {
  history.goBack();
}

export default function pushRota(input, state) {
  if (typeof input === 'string') {
    history.push({
      pathname: input,
      search: getOrganizacaoQueryParam(),
      state,
    });
  } else {
    const { pathname, search, ...others } = input;
    history.push({
      pathname,
      search: getOrganizacaoQueryParam(search),
      ...others,
    });
  }
}
