import Api from './api';
import { storageException } from './storageException';

export const buscarTextoAssinaturaAudio = idNegociacao => {
  return Api.request(
    `/reconhecimentoAudioAssinatura/textoAssinaturaAudio/${idNegociacao}`,
    { method: 'GET' },
  );
};

export const reconhecimentoAssinatura = idNegociacao => {
  return Api.request(`/reconhecimentoAudioAssinatura/${idNegociacao}`, {
    method: 'GET',
  });
};

export const saveAudio = async (idNegociacao, data, push) => {
  try {
    await Api.request(`/storage/emprestimo/${idNegociacao}/audio`, {
      method: 'POST',
      data,
    });
  } catch (error) {
    storageException({ error, push });
  }
};
