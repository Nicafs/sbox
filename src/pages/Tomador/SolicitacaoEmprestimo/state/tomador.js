import pushRota from '~/routes/push';

import apiEndpoints from '~/commons/constants/api-constants';
import SolicitacaoEmprestimoApi from '~/commons/resources/solicitacao-emprestimo';
import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';

export const parseDadosRg = ({ pessoaFisica }) => {
  const {
    dadosRg: {
      rg = '',
      emissor: emissorRg = '',
      ufEmissor: ufEmissorRg = '',
      dataEmissao: dataEmissaoRg,
    } = {},
  } = pessoaFisica;
  const dataEmissaoRgObj = dataEmissaoRg
    ? transformarDataApiParaDataLocal(dataEmissaoRg).toDate()
    : null;
  return {
    rg,
    emissorRg,
    ufEmissorRg,
    dataEmissaoRg: dataEmissaoRgObj,
  };
};

export const parseDadosNaturalidade = ({ pessoaFisica }) => {
  const {
    naturalidade: {
      cidade: cidadeNaturalidade = '',
      uf: ufNaturalidade = '',
    } = {},
  } = pessoaFisica;
  return {
    cidadeNaturalidade,
    ufNaturalidade,
  };
};

function buildEstadoDadosPessoa(pessoa) {
  const { pessoaFisica, dataAtualizacaoBigdatacorp = null } = pessoa;
  const { rg, emissorRg, ufEmissorRg, dataEmissaoRg } = parseDadosRg(pessoa);
  const { cidadeNaturalidade, ufNaturalidade } = parseDadosNaturalidade(pessoa);
  const dataAtualizacaoBigdatacorpObj = dataAtualizacaoBigdatacorp
    ? transformarDataApiParaDataLocal(dataAtualizacaoBigdatacorp).toDate()
    : null;
  const pessoaObj = {
    id: pessoa.id,
    documento: pessoa.documento,
    dataNascimento: pessoaFisica.dataNascimento,
    genero: pessoaFisica.genero,
    email: pessoa.email,
    emailCorporativo: pessoa.emailCorporativo,
    celular: pessoa.celular,
    nome: pessoa.nome,
    contatosConfirmacaos: pessoa.contatosConfirmacaos,
    profissaoId: pessoaFisica.profissao,
    estadoCivil: pessoaFisica.estadoCivil,
    nomeMae: pessoaFisica.nomeMae,
    possuiSenhaFirebase: pessoa.possuiSenhaFirebase,
    rg,
    emissorRg,
    ufEmissorRg,
    dataEmissaoRg,
    dataAtualizacaoBigdatacorp: dataAtualizacaoBigdatacorpObj,
    cargo: pessoaFisica.cargo,
    ufNaturalidade,
    cidadeNaturalidade,
  };
  const { endereco } = pessoa;

  if (endereco) {
    return [pessoaObj, endereco];
  }
  return [pessoaObj, undefined];
}

function buildEstadoParametrizacao(parametrizacao) {
  const { limites } = parametrizacao;
  const maxParcelas = limites[limites.length - 1].parcelas;
  const minParcelas = limites[0].parcelas;
  const valorMaximo = limites
    .map(({ valorMaximo: valorMax }) => valorMax)
    .reduce((a, b) => (a >= b ? a : b));
  const valorMinimo = limites
    .map(({ valorMinimo: valorMin }) => valorMin)
    .reduce((a, b) => (a <= b ? a : b));

  return {
    minParcelas,
    maxParcelas,
    limites,
    rendaMaxComprometida: parametrizacao.rendaMaxComprometida,
    valorMaximoParcela: parametrizacao.valorMaximoParcela,
    valorMaximo,
    valorMinimo,
    valorTed: parametrizacao.valorTed,
    taxaAdm: parametrizacao.taxaAdm,
    taxaJuros: parametrizacao.taxaJuros,
    taxaIof: parametrizacao.taxaIof,
    taxaIofDia: parametrizacao.taxaIofDia,
    despesasPercentual: parametrizacao.despesasPercentual,
    despesasFixas: parametrizacao.despesasFixas,
    descricaoDespesas: parametrizacao.descricaoDespesas,
    seguroConsignado: !!parametrizacao.seguroConsignado,
    percSeguroConsignado: parametrizacao.percSeguroConsignado,
    intervaloEntreParcelas: parametrizacao.intervaloEntreParcelas,
    diasCarenciaPrimeiraParcela: parametrizacao.diasCarenciaPrimeiraParcela,
    prazoAprovacaoRh: parametrizacao.prazoAprovacaoRh,
  };
}

export default async function getDadosTomadorViaApiParametrizacao(
  novaSimulacao,
  idNegociacao,
) {
  try {
    const result = await SolicitacaoEmprestimoApi.parametrosTomador(
      apiEndpoints.GET_PESSOA_PARAMETRIZACAO,
      novaSimulacao,
      idNegociacao,
    );

    const {
      parametrizacao,
      pessoa,
      empresa,
      ofertaEmprestimo,
      organizacao,
    } = result;

    return {
      parametrizacao: buildEstadoParametrizacao(parametrizacao),
      empresa,
      pessoa: buildEstadoDadosPessoa(pessoa)[0],
      ofertaEmprestimo,
      organizacao,
      camposAdicionais: pessoa.camposAdicionais,
    };
  } catch (err) {
    console.error('Ocorreu um erro ao buscar a parametrização: ', err);
    if (
      err.erro ===
      'Cliente já possui um máximo de solicitações/empréstimos em andamento.'
    ) {
      pushRota('/meus-emprestimos');
      return null;
    }
    if (err.erro) {
      let errorReturn = {
        err: err.erro,
        logout: true,
      };
      if (err.status === 400) {
        errorReturn = {
          ...errorReturn,
          fnErr: () => pushRota('/logout'),
        };
      }
      return errorReturn;
    }
    throw err.erro;
  }
}

export async function getDadosTomadorEP(pessoa) {
  try {
    const result = await SolicitacaoEmprestimoApi.parametrosTomadorEP();

    const { parametrizacao, ofertaEmprestimo } = result;

    return {
      parametrizacao,
      pessoa: buildEstadoDadosPessoa(pessoa)[0],
      ofertaEmprestimo,
      camposAdicionais: pessoa.camposAdicionais,
    };
  } catch (err) {
    console.error('Ocorreu um erro ao buscar a parametrização: ', err);
    if (
      err.erro ===
      'Cliente já possui um máximo de solicitações/empréstimos em andamento.'
    ) {
      pushRota('/meus-emprestimos');
      return null;
    }
    if (err.erro) {
      let errorReturn = {
        err: err.erro,
        logout: true,
      };
      if (err.status === 400) {
        errorReturn = {
          ...errorReturn,
          fnErr: () => pushRota('/logout'),
        };
      }
      return errorReturn;
    }
    throw err.erro;
  }
}
