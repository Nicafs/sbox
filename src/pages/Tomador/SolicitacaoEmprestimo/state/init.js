import { getEtapaPorId, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';
import ehEmailValidacaoContato from './ehEmailValidacaoContato';
import buscarParametrosSistema from './parametros';
import getTokenOfUrl from './token';
import getDadosTomadorViaApiParametrizacao from './tomador';

const tokenEhInvalido = (tokenData, pessoa) => {
  const tokenInvalido =
    pessoa.id !== tokenData.idToken ||
    (tokenData.dataExpiracao && tokenData.dataExpiracao < new Date());

  return tokenInvalido;
};

const getOrigem = (tokenData, empresa = {}) => {
  if (tokenData) {
    const { origem } = tokenData;
    return origem;
  }

  const { convenioPortocred: { tipoConvenio } = {} } = empresa;
  if (tipoConvenio === 'PORTOCRED') {
    return 'PORTOCRED';
  }

  return 'SITE';
};

export default async function init(
  pessoa = {},
  organizacao = {},
  novaSimulacao,
  idNegociacao,
) {
  const tokenData = getTokenOfUrl();
  const pessoaLogada = Object.keys(pessoa).length > 0;

  if (tokenData) {
    if (pessoaLogada) {
      if (tokenEhInvalido(tokenData, pessoa)) {
        return { logout: true };
      }

      let dadosTomador;
      try {
        dadosTomador = await getDadosTomadorViaApiParametrizacao();
      } catch (e) {
        console.error(
          'getDadosTomadorViaApiParametrizacao Ocorreu um erro: ',
          e.err,
        );
      }

      const { empresa } = dadosTomador;
      const origem = getOrigem(tokenData, empresa);
      const parametrosSistema = await buscarParametrosSistema();
      try {
        const retornoValidacaoEmail = await ehEmailValidacaoContato(
          tokenData,
          dadosTomador,
          parametrosSistema,
        );

        if (retornoValidacaoEmail) {
          return {
            ...dadosTomador,
            ...retornoValidacaoEmail,
            tokenData,
            etapaAtualObj: getEtapaPorId({
              idBusca: IDS_FLUXO_SIMULACAO_ENUM.DADOS_PESSOAIS,
              pessoa,
              organizacao: dadosTomador.organizacao,
            }),
            organizacao,
            parametrosSistema,
            origem,
          };
        }
      } catch (ex) {
        console.error(
          '(isEmailValidacaoContato) Ocorreu um erro',
          ehEmailValidacaoContato,
        );
      }

      if (tokenData.valor && tokenData.quantidadeParcelas) {
        const { valor, quantidadeParcelas: parcelas } = tokenData;
        return {
          parametrosSistema,
          tokenData,
          simulacaoValues: { valor, parcelas },
          resumeStatus: { isVisivel: true },
          ...dadosTomador,
          etapaAtualObj: getEtapaPorId({
            idBusca: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
            pessoa,
            organizacao: dadosTomador.organizacao,
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
          organizacao: dadosTomador.organizacao,
        }),
        organizacao,
        origem,
      };
    }
    if (tokenData.valor && tokenData.quantidadeParcelas) {
      const { valor, quantidadeParcelas: parcelas } = tokenData;
      return {
        simulacaoValues: { valor, parcelas },
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
    const dadosTomador = await getDadosTomadorViaApiParametrizacao(
      novaSimulacao,
      idNegociacao,
    );
    const { empresa } = dadosTomador;
    const origem = getOrigem(tokenData, empresa);
    return {
      etapaAtualObj: getEtapaPorId({
        idBusca: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
        pessoa,
        organizacao: dadosTomador.organizacao,
      }),
      organizacao: dadosTomador.organizacao,
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
