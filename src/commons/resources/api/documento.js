import Api from './api';

export const saveDocument = (idNegociacao, fileBase64, lado) =>
  Api.request(`/storage/emprestimo/${idNegociacao}/documento/${lado}`, {
    method: 'POST',
    data: {
      fileBase64,
    },
  });
