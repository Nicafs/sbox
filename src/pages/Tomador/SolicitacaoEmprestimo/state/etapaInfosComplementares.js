import { getProximaEtapa, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';

export default function etapaInfosComplementares(
  novosValores,
  camposAdicionais,
  pessoa,
  organizacao,
) {
  return {
    camposAdicionais: { ...camposAdicionais, ...novosValores },
    etapaAtualObj: getProximaEtapa({
      idEtapaAtual: IDS_FLUXO_SIMULACAO_ENUM.INFORMACOES_COMPLEMENTARES,
      pessoa,
      organizacao,
    }),
  };
}
