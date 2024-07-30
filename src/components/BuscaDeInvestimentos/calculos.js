import {
  calculaRendimentoPoupanca,
  calculaRendimentoTesouroDireto,
  calculaSimulacaoInvestimento,
} from '../../commons/simulacao/CalculaSimulacaoInvestimento';
import { transformarDataApiParaDataLocal } from '../../commons/tratativasParaDatasApi';

const buscarParametroSistema = (parametro, parametros) =>
  parseFloat(parametros.find(p => p.nome === parametro).valor);

export const calculaInvestimento = async (
  investimentoOriginal,
  parametrosSistema,
) => {
  const investimento = {
    ...investimentoOriginal,
  };
  const taxaSelic = buscarParametroSistema('TAXA_SELIC', parametrosSistema);
  const taxaReferencial = buscarParametroSistema(
    'TAXA_REFERENCIAL',
    parametrosSistema,
  );
  const { id: idNegociacao, valor, qtdParcelas } = investimento;
  const {
    investimento: {
      dataPrimeiraParcela,
      valorTotalAReceber: totalReceberCreditoExpress,
    },
    parcelas,
  } = await calculaSimulacaoInvestimento(idNegociacao);
  const [{ valorParcela: valorParcelaCreditoExpress }] = parcelas;
  const dataPrimeiraParcelaFormatada = transformarDataApiParaDataLocal(
    dataPrimeiraParcela,
  ).format('DD/MM/YYYY');
  const rendimentoCreditoExpress = totalReceberCreditoExpress - valor;
  const duration = parcelas
    .map(({ prazoDias }) => prazoDias)
    .reduce(
      (prazoDiasAnterior, prazoDiasAtual) => prazoDiasAnterior + prazoDiasAtual,
      0,
    );
  const rendimentoPoupanca = calculaRendimentoPoupanca({
    valor,
    qtdParcelas,
    taxaSelic,
    taxaReferencial,
    qtdDias: duration,
  });
  const totalReceberPoupanca = valor + rendimentoPoupanca;
  const rendimentoTesouro = calculaRendimentoTesouroDireto({
    valor,
    qtdParcelas,
    taxaSelic,
    qtdDias: duration,
  });
  const totalReceberTesouro = valor + rendimentoTesouro;
  const dadosComparativos = {
    poupanca: {
      totalReceber: totalReceberPoupanca,
      rendimento: rendimentoPoupanca,
    },
    tesouro: {
      totalReceber: totalReceberTesouro,
      rendimento: rendimentoTesouro,
    },
    creditoExpress: {
      totalReceber: totalReceberCreditoExpress,
      rendimento: rendimentoCreditoExpress,
    },
  };

  const parcelasFormatadas = formataParcelas(parcelas);

  investimento.simulacao = {
    dadosComparativos,
    valorTotalAreceber: totalReceberCreditoExpress,
    valorLucro: rendimentoCreditoExpress,
    valorParcela: valorParcelaCreditoExpress,
    dataPrimeiraParcela: dataPrimeiraParcelaFormatada,
    parcelas: parcelasFormatadas,
  };

  return investimento;
};

const formataParcelas = parcelas => {
  return parcelas.map(({ numeroParcela, valorParcela, dataDaParcela }) => ({
    numero: numeroParcela,
    valor: valorParcela,
    dataVencimento: dataDaParcela,
    dataVencimentoMoment: transformarDataApiParaDataLocal(dataDaParcela),
  }));
};
