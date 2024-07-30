import { goBackRota } from 'routes/push';

import { getEtapaAnterior, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';

export default function voltar({ etapaAtualObj, pessoa, organizacao }) {
  const { id: idEtapaAtual } = etapaAtualObj;

  if (idEtapaAtual === IDS_FLUXO_SIMULACAO_ENUM.VALORES) {
    return goBackRota();
  }

  const etapaAnteriorObj = getEtapaAnterior({
    idEtapaAtual,
    pessoa,
    organizacao,
  });

  return {
    etapaAtualObj: etapaAnteriorObj,
  };
}
