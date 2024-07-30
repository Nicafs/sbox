import confirmarCodigo from '../../../../commons/resources/confirmacaoContato';
import Pessoa from '../../../../commons/resources/pessoa';
import calculaSimulacaoConsignado from '../../../../commons/simulacao/CalculaSimulacaoConsignado';
import { inputDinheiroComCentavosZeradoParaNumerico } from '../../../../commons/utils/ManipulacaoUtils';
import pushRota from '../../../../routes/push';

const buildEstadoSimulacaoValues = simulacoes => {
  const possuiSimulacaoArray = simulacoes.length > 0;

  // Monta objeto do formulário de valores da primeira etapa
  if (possuiSimulacaoArray) {
    const [ultimaSimulacao] = simulacoes.reverse();
    const possuiSimulacao = Object.keys(ultimaSimulacao).length > 0;
    if (possuiSimulacao) {
      const {
        valor,
        qtdParcelas: parcelas,
        motivo: objetivo,
        contratouSeguro,
        percSeguroConsignado,
        valorSeguro,
      } = ultimaSimulacao;

      return {
        valor,
        parcelas,
        objetivo,
        comSeguro: contratouSeguro,
        percSeguroConsignado,
        valorSeguro,
      };
    }
  }

  return {};
};

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

const buildEstadoCalculo = async ({
  simulacaoValues,
  empresa,
  parametrizacao,
  organizacao,
}) => {
  if (simulacaoValues && Object.keys(simulacaoValues).length > 0) {
    const {
      valor: valorEmprestimo,
      parcelas: quantidadeParcelas,
      comSeguro,
    } = simulacaoValues;
    const calculoApi = await calculaSimulacaoConsignado({
      valorEmprestimo,
      quantidadeParcelas,
      empresa,
      parametrizacao,
      organizacao,
      comSeguro,
    });
    return calculoApi;
  }

  return undefined;
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
    percSeguroConsignado: simulacaoValues.percSeguroConsignado,
    valorSeguro: simulacaoValues.valorSeguro,
  };
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

export default async function ehEmailValidacaoContato(tokenData, dadosTomador) {
  const { codigoConfirmacaoEmail } = tokenData;

  if (codigoConfirmacaoEmail) {
    try {
      const { ofertaEmprestimo, organizacao } = dadosTomador;
      const { pessoa } = dadosTomador;
      const { parametrizacao, empresa } = dadosTomador;
      const { simulacoes = [] } = ofertaEmprestimo || {};

      // Confirma codigo no backend
      await confirmarCodigo('EMAIL', codigoConfirmacaoEmail);

      // Monta objeto do formulário de valores da primeira etapa
      const simulacaoValues = buildEstadoSimulacaoValues(simulacoes);

      // Monta objeto de calculo API e objeto emprestimo

      const calculoEmprestimo = await buildEstadoCalculo({
        simulacaoValues,
        empresa,
        parametrizacao,
        organizacao,
      });
      const emprestimo = buildEstadoEmprestimo(simulacaoValues);

      // Atualiza pessoa e adiciona email previamente informado ao objeto pessoa
      const emailConfirmado = await getEmailConfirmadoPreviamente();
      pessoa.email = emailConfirmado;

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
