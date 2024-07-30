import Organizacao from 'commons/resources/organizacao';

import { getEtapaPorId, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';
import ehEmailValidacaoContatoEP from './ehEmailValidacaoContatoEP';
import buscarParametrosSistema from './parametros';
import getTokenOfUrl from './token';
import { getDadosTomadorEP } from './tomador';

const tokenEhInvalido = (tokenData, pessoa) => {
  const tokenInvalido =
    pessoa.id !== tokenData.idToken ||
    (tokenData.dataExpiracao && tokenData.dataExpiracao < new Date());

  return tokenInvalido;
};

const getOrigem = tokenData => {
  if (tokenData) {
    const { origem } = tokenData;
    return origem;
  }

  return 'SITE';
};

const getCamposAdicionaisPorOcupacao = async ocupacaoProfissional => {
  return Organizacao.getCamposPersonalizadosPorOcupacao(ocupacaoProfissional);
};

export default async function initEP(pessoa = {}, organizacao = {}) {
  const tokenData = getTokenOfUrl();
  const pessoaLogada = Object.keys(pessoa).length > 0;

  if (pessoaLogada) {
    organizacao.camposPersonalizados = await getCamposAdicionaisPorOcupacao(
      pessoa.camposAdicionais.ocupacaoProfissional,
    );
  }

  if (tokenData) {
    if (pessoaLogada) {
      if (tokenEhInvalido(tokenData, pessoa)) {
        return { logout: true };
      }

      const dadosTomador = await getDadosTomadorEP(pessoa);
      const origem = getOrigem(tokenData);
      const parametrosSistema = await buscarParametrosSistema();

      try {
        const retornoValidacaoEmail = await ehEmailValidacaoContatoEP(
          tokenData,
          dadosTomador,
        );

        if (retornoValidacaoEmail) {
          return {
            ...dadosTomador,
            ...retornoValidacaoEmail,
            tokenData,
            etapaAtualObj: getEtapaPorId({
              idBusca: IDS_FLUXO_SIMULACAO_ENUM.DADOS_PESSOAIS,
              pessoa,
              organizacao,
            }),
            organizacao,
            parametrosSistema,
            origem,
          };
        }
      } catch (ex) {
        console.error(
          '(isEmailValidacaoContato) Ocorreu um erro',
          ehEmailValidacaoContatoEP,
        );
      }

      if (tokenData.valor && tokenData.quantidadeParcelas) {
        const {
          valor,
          quantidadeParcelas: parcelas,
          dataPrimeiraParcela,
        } = tokenData;
        return {
          parametrosSistema,
          tokenData,
          simulacaoValues: { valor, parcelas, dataPrimeiraParcela },
          resumeStatus: { isVisivel: true },
          ...dadosTomador,
          etapaAtualObj: getEtapaPorId({
            idBusca: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
            pessoa,
            organizacao,
          }),
          organizacao,
          origem,
        };
      }

      return {
        parametrosSistema,
        tokenData,
        ...dadosTomador,
        etapaAtualObj: getEtapaPorId({
          idBusca: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
          pessoa,
          organizacao,
        }),
        organizacao,
        origem,
      };
    }

    if (tokenData.valor && tokenData.quantidadeParcelas) {
      const {
        valor,
        quantidadeParcelas: parcelas,
        dataPrimeiraParcela,
      } = tokenData;
      return {
        simulacaoValues: { valor, parcelas, dataPrimeiraParcela },
        tokenData,
        etapaAtualObj: getEtapaPorId({
          idBusca: IDS_FLUXO_SIMULACAO_ENUM.AUTENTICACAO,
          pessoa,
          organizacao,
        }),
        organizacao,
        ...(tokenData.origem ? { origem: tokenData.origem } : {}),
      };
    }

    return {
      tokenData,
      etapaAtualObj: getEtapaPorId({
        idBusca: IDS_FLUXO_SIMULACAO_ENUM.AUTENTICACAO,
        pessoa,
        organizacao,
      }),
      organizacao,
      ...(tokenData.origem ? { origem: tokenData.origem } : {}),
    };
  }

  if (pessoaLogada) {
    const parametrosSistema = await buscarParametrosSistema();
    const dadosTomador = await getDadosTomadorEP(pessoa);
    const origem = getOrigem(tokenData);
    return {
      etapaAtualObj: getEtapaPorId({
        idBusca: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
        pessoa,
        organizacao,
      }),
      organizacao,
      parametrosSistema,
      origem,
      ...dadosTomador,
    }; // Etapa valores
  }

  return {
    etapaAtualObj: getEtapaPorId({
      idBusca: IDS_FLUXO_SIMULACAO_ENUM.AUTENTICACAO,
      pessoa,
      organizacao,
    }),
    organizacao,
  }; // primeiro acesso (autenticacao)
}
