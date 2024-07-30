import calculaSimulacaoConsignado from '../../../commons/simulacao/CalculaSimulacaoConsignado';

export const realizaCalculoSimulacao = async (
  tipoCalculo,
  negociacao,
  empresa,
  taxaChequeEspecial,
  taxaCartaoCredito,
) => {
  const {
    simulacao: { parametrizacao: parametrizacaoCreditoExpress },
    valor: valorEmprestimo,
    qtdParcelas: quantidadeParcelas,
  } = negociacao;
  const parametrizacaoCheque = {
    ...parametrizacaoCreditoExpress,
    taxaJuros: taxaChequeEspecial,
    taxaAdm: 0,
  };
  const parametrizacaoCartaoCredito = {
    ...parametrizacaoCreditoExpress,
    taxaJuros: taxaCartaoCredito,
    taxaAdm: 0,
  };
  /* eslint-disable no-throw-literal */
  try {
    switch (tipoCalculo) {
      case 'creditoExpress':
        return await calculaSimulacaoConsignado({
          valorEmprestimo,
          quantidadeParcelas,
          parametrizacao: parametrizacaoCreditoExpress,
        });
      case 'chequeEspecial':
        return await calculaSimulacaoConsignado({
          valorEmprestimo,
          quantidadeParcelas,
          parametrizacao: parametrizacaoCheque,
          enviarTaxasParametrizacao: true,
        });
      case 'cartaoCredito':
        return await calculaSimulacaoConsignado({
          valorEmprestimo,
          quantidadeParcelas,
          parametrizacao: parametrizacaoCartaoCredito,
          enviarTaxasParametrizacao: true,
        });
      default:
        throw {
          erro: `realizaCalculoSimulacao: Tipo de calculo desconhecido: ${tipoCalculo}`,
        };
    }
  } catch (err) {
    if (err.erro) {
      throw {
        erro: err.erro,
        status: 400,
      };
    }
    if (err.status === 400) {
      throw {
        erro: `Erro ao calcular parcelas do empréstimo. ${err.response.data[0].message}`,
        status: 400,
      };
    }
    throw {
      erro: 'Erro inesperado ao calcular parcelas do empréstimo',
      status: 400,
    };
  }
};
