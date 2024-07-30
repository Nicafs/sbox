import { transformarDataApiParaDataLocal } from 'commons/tratativasParaDatasApi';

import confirmarCodigo from '../../../../commons/resources/confirmacaoContato';
import Pessoa from '../../../../commons/resources/pessoa';
import { inputDinheiroComCentavosZeradoParaNumerico } from '../../../../commons/utils/ManipulacaoUtils';
import pushRota from '../../../../routes/push';

const getEmailConfirmadoPreviamente = async () => {
  const { pessoa: { contatosConfirmacaos = [] } = {} } = await Pessoa.get();
  const contatoEmail = contatosConfirmacaos
    .reverse()
    .find(
      ({ tipoContato, confirmado }) => confirmado && tipoContato === 'EMAIL',
    );
  if (contatoEmail) {
    const { contato: email } = contatoEmail;
    return email;
  }

  return '';
};

const buildRetornoErroParaReducer = err => {
  const erroPadrao = {
    err: 'Erro ao validar código de confirmação de e-mail recebido via link. ',
  };

  if (err.status === 400) {
    return { ...erroPadrao, fnErr: () => pushRota('/') };
  }

  return erroPadrao;
};

const buildEstadoSimulacaoValues = ultimaSimulacao => {
  // Monta objeto do formulário de valores da primeira etapa
  const {
    valor,
    qtdParcelas,
    motivo: objetivo,
    contratouSeguro,
    dataPrimeiraParcela,
  } = ultimaSimulacao;

  return {
    valor,
    parcelamento: qtdParcelas,
    parcelas: qtdParcelas,
    objetivo,
    dataPrimeiraParcela,
    comSeguro: contratouSeguro,
    percSeguroConsignado: 0,
    valorSeguro: 0,
  };
};

const buildEstadoCalculo = async ultimaSimulacao => {
  const {
    valor,
    dataPrimeiraParcela,
    // parcelamento = [],
    descricaoDesesas,
    qtdParcelas,
    taxaAdm,
    taxaIof,
    valorDaParcela,
    valorDespesas,
    valorIof,
    valorJuros,
    taxaJuros,
    valorTotalAPagar,
    cetMensal,
    cetAnual,
    dataUltimaParcela,
    valorContrato,
    valorSeguro,
    percSeguroConsignado,
  } = ultimaSimulacao;

  const calculoEmprestimo = {
    valorParcela: valorDaParcela,
    valorEmprestimo: valor,
    dataPrimeiraParcela: transformarDataApiParaDataLocal(dataPrimeiraParcela),
    parcelamento: [],
    quantidadeParcelas: qtdParcelas,
    juros: valorJuros,
    jurosAoMes: taxaJuros,
    taxaAdm,
    valorIof,
    valorIofAoDia: 0,
    despesas: valorDespesas,
    descricaoDespesas: descricaoDesesas,
    totalApagar: valorTotalAPagar,
    ...(valorSeguro && { valorSeguro }),
    comSeguro: false,
    ...(percSeguroConsignado && { percSeguroConsignado }),
    taxaIof,
    ...(cetMensal && { cetMensal }),
    ...(cetAnual && { cetAnual }),
    ...(dataUltimaParcela && { dataUltimaParcela }),
    ...(valorContrato && { valorContrato }),
  };

  return calculoEmprestimo;
};

const buildEstadoEmprestimo = simulacaoValues => {
  return {
    valor:
      typeof simulacaoValues.valor === 'number'
        ? simulacaoValues.valor
        : inputDinheiroComCentavosZeradoParaNumerico(simulacaoValues.valor),
    objetivo: simulacaoValues.objetivo,
    parcelas: simulacaoValues.parcelas,
    comSeguro: simulacaoValues.comSeguro,
    // percSeguroConsignado: simulacaoValues.percSeguroConsignado,
    // valorSeguro: simulacaoValues.valorSeguro,
    dataVencimento: simulacaoValues.dataPrimeiraParcela,
  };
};

export default async function ehEmailValidacaoContatoEP(
  tokenData,
  dadosTomador,
) {
  const { codigoConfirmacaoEmail } = tokenData;

  if (codigoConfirmacaoEmail) {
    try {
      const { ofertaEmprestimo, pessoa } = dadosTomador;
      const { simulacoes = [] } = ofertaEmprestimo || {};

      // Confirma codigo no backend
      await confirmarCodigo('EMAIL', codigoConfirmacaoEmail);

      // Atualiza pessoa e adiciona email previamente informado ao objeto pessoa
      const emailConfirmado = await getEmailConfirmadoPreviamente();
      pessoa.email = emailConfirmado;

      let simulacaoValues = {};
      let calculoEmprestimo;

      if (simulacoes && simulacoes.length > 0) {
        const [ultimaSimulacao] = simulacoes.reverse();
        const possuiSimulacao = Object.keys(ultimaSimulacao).length > 0;
        if (possuiSimulacao) {
          // Monta objeto do formulário de valores da primeira etapa
          simulacaoValues = await buildEstadoSimulacaoValues(ultimaSimulacao);

          // Monta objeto de calculo API e objeto emprestimo
          calculoEmprestimo = await buildEstadoCalculo(ultimaSimulacao);
        }
      }

      const emprestimo = buildEstadoEmprestimo(simulacaoValues);

      return {
        pessoa,
        dadosConfirmados: { email: true },
        simulacaoValues,
        calculoEmprestimo,
        emprestimo,
        prontoParaPersistir: false,
        resumeStatus: { isVisivel: true, isLoading: false },
      };
    } catch (err) {
      console.error(
        'ehEmailValidacaoContato: Ocorreu um erro ao confirmar código de email!',
        err,
      );
      return buildRetornoErroParaReducer(err);
    }
  }
  return undefined;
}
