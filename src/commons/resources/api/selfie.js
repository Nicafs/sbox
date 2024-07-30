import Api from './api';

export const saveSelfie = (idNegociacao, fileBase64) =>
  Api.request(`/storage/emprestimo/${idNegociacao}/selfie`, {
    method: 'POST',
    data: {
      fileBase64,
    },
  });
