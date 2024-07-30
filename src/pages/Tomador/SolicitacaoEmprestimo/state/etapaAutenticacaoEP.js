import pushRota from '~/routes/push';

import NegociacaoApi from '~/commons/resources/negociacao';
import Organizacao from '~/commons/resources/organizacao';

import { getEtapaPorId, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';
import contatoEstaConfirmado from './contatoEstaConfirmado';
import ehEmailValidacaoContatoEP from './ehEmailValidacaoContatoEP';
import buscarParametrosSistema from './parametros';
import { getDadosTomadorEP } from './tomador';

const getEstadoParaValidacaoDeEmail = ({
  dadosValidacaoEmail,
  pessoa,
  dadosTomador,
  parametrosSistema,
}) => {
  if (!dadosValidacaoEmail.err) {
    const { celular } = pessoa;
    const celularConfirmado = contatoEstaConfirmado(
      'TELEFONE',
      celular,
      pessoa,
    );
    if (celularConfirmado) {
      const { dadosConfirmados } = dadosValidacaoEmail;
      return {
        ...dadosTomador,
        ...dadosValidacaoEmail,
        parametrosSistema,
        dadosConfirmados: { ...dadosConfirmados, celular: true },
        etapaAtualObj: getEtapaPorId({
          idBusca: IDS_FLUXO_SIMULACAO_ENUM.DADOS_PESSOAIS,
          pessoa,
          organizacao: dadosTomador.organizacao,
        }),
        organizacao: dadosTomador.organizacao,
        tipoFluxo: dadosTomador?.organizacao?.tipoFluxoEp
          ? dadosTomador?.organizacao?.tipoFluxoEp
          : dadosTomador?.organizacao?.tipoFluxoEcp,
      };
    }
    return {
      ...dadosTomador,
      ...dadosValidacaoEmail,
      parametrosSistema,
      etapaAtualObj: getEtapaPorId({
        idBusca: IDS_FLUXO_SIMULACAO_ENUM.CONTATOS,
        pessoa,
        organizacao: dadosTomador.organizacao,
      }),
      organizacao: dadosTomador.organizacao,
      tipoFluxo: dadosTomador?.organizacao?.tipoFluxoEp
        ? dadosTomador?.organizacao?.tipoFluxoEp
        : dadosTomador?.organizacao?.tipoFluxoEcp,
    };
  }
  return dadosValidacaoEmail;
};

const getCamposAdicionaisPorOcupacao = async ocupacaoProfissional => {
  return Organizacao.getCamposPersonalizadosPorOcupacao(ocupacaoProfissional);
};

export default async function etapaAutenticacao(tokenData) {
  const { itens: negociacoesArr } = await NegociacaoApi.get({
    paginaNumero: 1,
    paginaTamanho: 20,
  });
  if (negociacoesArr && negociacoesArr.length > 0) {
    pushRota('/meus-emprestimos');
    return null;
  }

  const { pessoa: pesToken, organizacao: orgToken } = tokenData;
  const dadosTomador = await getDadosTomadorEP(pesToken);
  const { pessoa, fnErr } = dadosTomador;
  if (fnErr) {
    return dadosTomador;
  }

  orgToken.camposPersonalizados = await getCamposAdicionaisPorOcupacao(
    dadosTomador.camposAdicionais.ocupacaoProfissional,
  );

  const parametrosSistema = await buscarParametrosSistema();
  const possuiTokenValido = !!tokenData;

  if (possuiTokenValido) {
    const dadosValidacaoEmail = await ehEmailValidacaoContatoEP(
      tokenData,
      dadosTomador,
    );

    if (dadosValidacaoEmail) {
      return getEstadoParaValidacaoDeEmail({
        dadosValidacaoEmail,
        pessoa,
        dadosTomador,
        parametrosSistema,
      });
    }
  }

  return {
    ...dadosTomador,
    parametrosSistema,
    etapaAtualObj: getEtapaPorId({
      idBusca: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
      pessoa,
      organizacao: orgToken,
    }),
    organizacao: orgToken,
    tipoFluxo: orgToken.tipoFluxoEp
      ? orgToken.tipoFluxoEp
      : orgToken.tipoFluxoEcp,
  }; // Etapa valores
}
