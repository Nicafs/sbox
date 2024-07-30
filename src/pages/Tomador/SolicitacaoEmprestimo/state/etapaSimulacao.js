import { inputDinheiroComCentavosZeradoParaNumerico } from '../../../../commons/utils/ManipulacaoUtils';
import { getEtapaPorId, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';
import contatoEstaConfirmado from './contatoEstaConfirmado';

const getEtapaAtual = ({
  emailConfirmado,
  celularConfirmado,
  pessoa,
  organizacao,
  novaSimulacao,
}) => {
  if (novaSimulacao) {
    return {
      prontoParaNovaSimulacao: true,
      etapaAtualObj: getEtapaPorId({
        idBusca: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
        pessoa,
        organizacao,
      }),
    };
  }
  if (emailConfirmado && celularConfirmado) {
    return {
      etapaAtualObj: getEtapaPorId({
        idBusca: IDS_FLUXO_SIMULACAO_ENUM.DADOS_PESSOAIS,
        pessoa,
        organizacao,
      }),
    };
  }
  return {
    etapaAtualObj: getEtapaPorId({
      idBusca: IDS_FLUXO_SIMULACAO_ENUM.CONTATOS,
      pessoa,
      organizacao,
    }),
  };
};

export default function etapaSimulacao(
  pessoa,
  empresa,
  simulacaoValues,
  organizacao,
  novaSimulacao,
) {
  const { email, celular } = pessoa;
  const { servicoEmailDisponivel, servicoSmsDisponivel } = empresa;
  const {
    valor,
    objetivo,
    parcelas,
    comSeguro,
    dataPrimeiraParcela: dataVencimento,
  } = simulacaoValues;

  const emailConfirmado = contatoEstaConfirmado('EMAIL', email, pessoa);
  const celularConfirmado = contatoEstaConfirmado('TELEFONE', celular, pessoa);

  const { etapaAtualObj, prontoParaNovaSimulacao = false } = getEtapaAtual({
    emailConfirmado,
    celularConfirmado,
    pessoa,
    organizacao,
    novaSimulacao,
  });

  const emprestimo = {
    valor: inputDinheiroComCentavosZeradoParaNumerico(valor),
    objetivo,
    parcelas,
    comSeguro,
    ...(dataVencimento && { dataVencimento }),
  };

  return {
    etapaAtualObj,
    prontoParaNovaSimulacao,
    dadosConfirmados: {
      email: emailConfirmado && servicoEmailDisponivel,
      celular: celularConfirmado && servicoSmsDisponivel,
    },
    emprestimo,
    resumeStatus: { isVisivel: true },
  };
}
