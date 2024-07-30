import { publicCert } from 'commons/constants/certificados';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function getQueryParam(key) {
  const queryParams = new URLSearchParams(document.location.search);
  return queryParams.get(key);
}

function getDecodedToken() {
  const tokenRaw = getQueryParam('token');
  if (!tokenRaw) {
    return {};
  }

  try {
    const jwtDecoded = jwt.verify(tokenRaw, publicCert, {
      algorithms: ['ES512'],
    });
    const md5Raw = getQueryParam('md5');
    const md5Hash = crypto.createHash('md5').update(tokenRaw).digest('hex');
    if (md5Raw !== md5Hash) {
      return {};
    }
    return jwtDecoded;
  } catch (e) {
    console.error(e);
    return {};
  }
}

export default function getTokenOfUrl() {
  const tokenPayload = getDecodedToken();

  if (!tokenPayload || !tokenPayload.id) {
    return;
  }

  const {
    token,
    taxa_juros: taxaJuros,
    id: idToken,
    data_expiracao: dtExpiracao,
    codigo_confirmacao: codigoConfirmacaoEmail,
    valor,
    quantidade_parcelas: quantidadeParcelas,
    origem,
  } = tokenPayload;

  const dataExpiracao = dtExpiracao ? new Date(dtExpiracao * 1000) : null;

  return {
    token,
    taxaJuros,
    idToken,
    dataExpiracao,
    codigoConfirmacaoEmail,
    valor: valor ? Number(valor) : undefined,
    quantidadeParcelas: quantidadeParcelas
      ? Number(quantidadeParcelas)
      : undefined,
    origem,
  };
}
