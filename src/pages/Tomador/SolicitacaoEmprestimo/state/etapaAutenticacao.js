import pushRota from '~/routes/push';

import NegociacaoApi from '~/commons/resources/negociacao';

import { getEtapaPorId, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';
import contatoEstaConfirmado from './contatoEstaConfirmado';
import ehEmailValidacaoContato from './ehEmailValidacaoContato';
import buscarParametrosSistema from './parametros';
import getDadosTomadorViaApiParametrizacao from './tomador';

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
      tipoFluxo: dadosTomador?.organizacao?.tipoFluxoEp
        ? dadosTomador?.organizacao?.tipoFluxoEp
        : dadosTomador?.organizacao?.tipoFluxoEcp,
    };
  }
  return dadosValidacaoEmail;
};

export default async function etapaAutenticacao(tokenData) {
  try {
    const { itens: negociacoesArr } = await NegociacaoApi.get({
      paginaNumero: 1,
      paginaTamanho: 20,
    });
    if (negociacoesArr && negociacoesArr.length > 0) {
      pushRota('/meus-emprestimos');
      return null;
    }
  } catch (e) {
    console.error(e);
  }

  const dadosTomador = await getDadosTomadorViaApiParametrizacao();
  const { pessoa, fnErr } = dadosTomador;
  if (fnErr) {
    return dadosTomador;
  }
  const parametrosSistema = await buscarParametrosSistema();
  const possuiTokenValido = !!tokenData;

  if (possuiTokenValido) {
    const dadosValidacaoEmail = await ehEmailValidacaoContato(
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
      organizacao: dadosTomador.organizacao,
    }),
    tipoFluxo: dadosTomador?.organizacao?.tipoFluxoEp
      ? dadosTomador?.organizacao?.tipoFluxoEp
      : dadosTomador?.organizacao?.tipoFluxoEcp,
  }; // Etapa valores
}
