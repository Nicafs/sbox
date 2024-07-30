export const calculaRendimentoPoupanca = ({
  valor,
  taxaSelic,
  taxaReferencial,
  qtdDias,
}) => {
  let taxaPoupancaAnual = 0;
  if (taxaSelic > 0.085) {
    taxaPoupancaAnual = 0.005 + taxaReferencial;
  } else {
    taxaPoupancaAnual = taxaSelic * 0.7;
  }

  const rendimento = ((taxaPoupancaAnual + 1) ** (qtdDias / 360) - 1) * valor;

  return rendimento;
};

export const calculaRendimentoTesouroDireto = ({
  valor,
  taxaSelic: taxaSelicAnual,
  qtdDias,
}) => {
  const rendimento = ((taxaSelicAnual + 1) ** (qtdDias / 360) - 1) * valor;
  return rendimento;
};

export const calculaSimulacaoInvestimento = async idNegociacao => {
  // eslint-disable-next-line global-require
  const InvestimentoApi = require('../resources/investimento').default;
  return InvestimentoApi.simularInvestimento(idNegociacao);
};
