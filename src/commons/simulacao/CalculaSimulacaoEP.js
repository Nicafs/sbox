import Emprestimo from '../resources/emprestimo';
import { transformarDataApiParaDataLocal } from '../tratativasParaDatasApi';

const buscandoCalculo = async (retries, idConsulta) => {
  return new Promise((resolve, reject) => {
    Emprestimo.calcularSimulacaoEPResultado({ idConsulta })
      .then(response => {
        if (response.status === 'SUCESSO') {
          return resolve(response);
        }
        if (retries > 0) {
          setTimeout(() => {
            return resolve(buscandoCalculo(retries - 1, idConsulta));
          }, 500);
        } else {
          return null;
        }
      })
      .catch(error => {
        if (retries > 0) {
          setTimeout(() => {
            return resolve(buscandoCalculo(retries - 1, idConsulta));
          }, 500);
        } else {
          return reject(error);
        }
      });
  }).then(response => response);
};

const calcularSimulacaoViaAPI = async ({
  valor: valorParam,
  dataPrimeiraParcela: dataPrimeiraParcelaParam,
  comSeguro: comSeguroParam,
}) => {
  const { idConsulta } = await Emprestimo.calcularSimulacaoEP({
    valor: valorParam,
    dataPrimeiraParcela: dataPrimeiraParcelaParam,
    comSeguro: comSeguroParam,
  });

  if (idConsulta) {
    const { valor, dataPrimeiraParcela, parcelamento } = await buscandoCalculo(
      8,
      idConsulta,
    );

    const simulacaoCalculada = {
      valorParcela: parcelamento.valorParcela,
      valorEmprestimo: valor,
      dataPrimeiraParcela: transformarDataApiParaDataLocal(dataPrimeiraParcela),
      parcelamento,

      taxaIof: parcelamento.valorIof,
      cetMensal: parcelamento.cetMensal,
      cetAnual: parcelamento.cetAnual,
      dataUltimaParcela: parcelamento.dataUltimaParcela,
      quantidadeParcelas: parcelamento.qtdParcelas,
      juros: parcelamento.valorJuros,
      jurosAoMes: parcelamento.taxaJurosAoMes,
      valorIof: parcelamento.valorIof,
      valorIofAoDia: 0,
      despesas: parcelamento.valorDespesas,
      descricaoDespesas: '',
      totalApagar: parcelamento.valorParcela * parcelamento.qtdParcelas,
      valorSeguro: parcelamento.valorSeguroPlano,
      comSeguro: comSeguroParam,
      percSeguroConsignado: parcelamento.percSeguroPlano,
    };

    return simulacaoCalculada;
  }
  return null;
};

const calculaSimulacaoEP = async ({
  valorEmprestimo,
  dataPrimeiraParcela,
  comSeguro,
}) => {
  const dadosParaSimulacao = {
    valor: valorEmprestimo,
    dataPrimeiraParcela,
    comSeguro,
  };

  return calcularSimulacaoViaAPI(dadosParaSimulacao);
};

export default calculaSimulacaoEP;
