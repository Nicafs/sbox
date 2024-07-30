import Emprestimo from '../resources/emprestimo';
import { transformarDataApiParaDataLocal } from '../tratativasParaDatasApi';

export const getMsgErro = apiErro => {
  try {
    return apiErro.response.data.erros[0].descricao;
  } catch (err) {
    return 'Ocorreu um erro ao calcular sua simulação tente novamente mais tarde!';
  }
};

const calcularSimulacaoViaAPI = async ({
  valor: paramValor,
  qtdParcelas: paramQtdParcelas,
  descricaoDespesas,
  comSeguro,
  percSeguroConsignado,
  taxaJuros,
  taxaAdm,
  idNegociacao,
}) => {
  const {
    emprestimo: {
      dataPrimeiraParcela,
      valorTotalAPagar,
      valorSeguro,
      valor,
      valorParcela,
      valorJuros,
    },
    taxas: {
      taxaJurosAoMes: retornoTaxaJurosAoMes,
      taxaAdm: retornoTaxaAdm,
      iofFlat,
      valorIofFlat,
      valorIofAoDia,
      valorDespesas,
      taxaVariavel,
    },
  } = await Emprestimo.calcularSimulacao({
    valor: paramValor,
    contratouSeguro: !!comSeguro,
    qtdParcelas: paramQtdParcelas,
    taxaJuros,
    taxaAdm,
    idNegociacao,
  });
  const simulacaoCalculada = {
    valorParcela,
    juros: valorJuros,
    jurosAoMes: retornoTaxaJurosAoMes,
    taxaAdm: retornoTaxaAdm,
    taxaIof: iofFlat,
    valorIof: valorIofFlat,
    valorIofAoDia,
    despesas: valorDespesas,
    descricaoDespesas,
    totalApagar: valorTotalAPagar,
    dataPrimeiraParcela: transformarDataApiParaDataLocal(dataPrimeiraParcela),
    valorEmprestimo: valor,
    quantidadeParcelas: paramQtdParcelas,
    comSeguro,
    valorSeguro,
    percSeguroConsignado,
    taxaVariavel: !!taxaVariavel,
  };
  return simulacaoCalculada;
};

const calculaSimulacaoConsignado = async ({
  valorEmprestimo,
  quantidadeParcelas,
  parametrizacao,
  comSeguro,
  enviarTaxasParametrizacao = false,
  idNegociacao,
}) => {
  const {
    descricaoDespesas,
    percSeguroConsignado,
    taxaAdm,
    taxaJuros,
  } = parametrizacao;
  const dadosParaSimulacao = {
    valor: valorEmprestimo,
    qtdParcelas: quantidadeParcelas,
    descricaoDespesas,
    comSeguro,
    percSeguroConsignado: Number(percSeguroConsignado),
    ...(enviarTaxasParametrizacao && { taxaAdm, taxaJuros }),
    idNegociacao,
  };

  return calcularSimulacaoViaAPI(dadosParaSimulacao);
};

export default calculaSimulacaoConsignado;
