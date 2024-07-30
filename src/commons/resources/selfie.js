import Api from './api/selfie-api';

export const saveSelfie = async (idNegociacao, fileBase64) => {
  await Api.request(`/storage/emprestimo/${idNegociacao}/selfie`, {
    method: 'POST',
    data: {
      fileBase64,
    },
  });
};

export const saveProofOfLife = async (idNegociacao, fileBase64, tipo) => {
  await Api.request(`/storage/emprestimo/${idNegociacao}/selfie`, {
    method: 'POST',
    data: {
      fileBase64,
      tipo,
    },
  });
};
