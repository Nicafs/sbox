import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { publicCert } from '../constants/certificados';

export const getDecodedTokenJwt = (tokenRaw, md5Raw) => {
  if (!tokenRaw) {
    return {};
  }

  try {
    const jwtDecoded = jwt.verify(tokenRaw, publicCert, {
      algorithms: ['ES512'],
    });
    const md5Hash = crypto.createHash('md5').update(tokenRaw).digest('hex');
    if (md5Raw !== md5Hash) {
      return {};
    }
    return jwtDecoded;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const validaExpiracaoToken = expiracaoTimestamp => {
  const dataExpiracao = expiracaoTimestamp
    ? new Date(expiracaoTimestamp * 1000)
    : null;

  return !!dataExpiracao;
};
