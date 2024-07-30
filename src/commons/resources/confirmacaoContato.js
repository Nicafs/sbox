import ENDPOINTS from '../constants/api-constants';
import api from './api/general-api';

export default async function confirmarCodigo(tipoValidacao, codigo) {
  const params = {
    codigo: Number(codigo),
  };
  const endpoint =
    tipoValidacao === 'EMAIL'
      ? ENDPOINTS.EMAIL_CONFIRMACAO_CODIGO
      : ENDPOINTS.TELEFONE_CONFIRMACAO_CODIGO;
  return api.request(endpoint, {
    data: params,
    method: 'POST',
  });
}
