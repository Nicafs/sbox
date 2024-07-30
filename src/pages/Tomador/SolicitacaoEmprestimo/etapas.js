import { lazy } from 'react';

import SimularEmprestimoLoader from '../../../containers/Tomador/SolicitacaoEmprestimo/SimularEmprestimoLoader';

const ConfirmacaoDadosContainer = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/ConfirmacaoDados'),
);
const SimularEmprestimoContainer = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/SimularEmprestimo'),
);
const CadastroContatosContainer = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/CadastroContatos'),
);
const DadosPessoaisContainer = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/DadosPessoais'),
);
const InformacoesComplementaresContainer = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/InformacoesComplementares'),
);
const ContaBancariaContainer = lazy(() =>
  import(
    'containers/Tomador/SolicitacaoEmprestimo/SolicitacaoEmprestimoContaBancaria/ContaBancaria'
  ),
);
const CadastroSenhaContainer = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/CadastroSenha'),
);
const FotosDocumentosVerso = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/Documentos/DocumentoVerso'),
);
const FotosDocumentosFrente = lazy(() =>
  import('containers/Tomador/SolicitacaoEmprestimo/Documentos/DocumentoFrente'),
);
const CadastroEp = lazy(() => import('containers/Tomador/CadastroEp'));

export const IDS_FLUXO_SIMULACAO_ENUM = {
  LOADING_INICIAL: 'loadingInicial',
  AUTENTICACAO: 'autenticacao',
  CADASTROEP: 'cadastroep',
  VALORES: 'valores',
  CONTATOS: 'contatos',
  DADOS_PESSOAIS: 'dadosPessoais',
  INFORMACOES_COMPLEMENTARES: 'informacoesComplementares',
  DOCUMENTO_FRENTE: 'documentoFrente',
  DOCUMENTO_VERSO: 'documentoVerso',
  CONTA_BANCARIA: 'contaBancaria',
  SENHA: 'senha',
};

export const stepsFluxoSimulacaoEP = [
  // Etapa 0
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.LOADING_INICIAL,
    label: 'Carregando simulação',
    container: SimularEmprestimoLoader,
    exibirSteper: false,
  },
  // Etapa 1
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.AUTENTICACAO,
    label: 'Autenticacao',
    container: ConfirmacaoDadosContainer,
    exibirSteper: false,
  },
  // Etapa 2
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.CADASTROEP,
    label: 'Cadastro',
    container: CadastroEp,
    exibirSteper: false,
  },
  {
    // Etapa 3
    id: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
    label: 'Simulação de empréstimo',
    container: SimularEmprestimoContainer,
    exibirSteper: true,
  },
  {
    // Etapa 4
    id: IDS_FLUXO_SIMULACAO_ENUM.CONTATOS,
    label: 'Informe seus contatos',
    container: CadastroContatosContainer,
    exibirSteper: true,
  },
  {
    // Etapa 5
    id: IDS_FLUXO_SIMULACAO_ENUM.DADOS_PESSOAIS,
    label: 'Cadastro de dados pessoais',
    container: DadosPessoaisContainer,
    exibirSteper: true,
  },
  {
    // Etapa 6
    id: IDS_FLUXO_SIMULACAO_ENUM.INFORMACOES_COMPLEMENTARES,
    label: 'Informações Complementares',
    container: InformacoesComplementaresContainer,
    exibirSteper: true,
  },
  {
    // Etapa 7
    id: IDS_FLUXO_SIMULACAO_ENUM.CONTA_BANCARIA,
    label: 'Conta Bancária',
    container: ContaBancariaContainer,
    exibirSteper: true,
  },
  {
    // Etapa 8
    id: IDS_FLUXO_SIMULACAO_ENUM.DOCUMENTO_FRENTE,
    label: 'Documento',
    container: FotosDocumentosFrente,
    exibirSteper: true,
  },
  {
    // Etapa 9
    id: IDS_FLUXO_SIMULACAO_ENUM.DOCUMENTO_VERSO,
    label: 'Documento Verso',
    container: FotosDocumentosVerso,
    exibirSteper: true,
  },
  {
    // Etapa 10
    id: IDS_FLUXO_SIMULACAO_ENUM.SENHA,
    label: 'Cadastro de senha',
    container: CadastroSenhaContainer,
    exibirSteper: true,
  },
];

export const stepsFluxoSimulacao = [
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.LOADING_INICIAL,
    label: 'Carregando simulação',
    container: SimularEmprestimoLoader,
    exibirSteper: false,
  },
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.AUTENTICACAO,
    label: 'Autenticacao',
    container: ConfirmacaoDadosContainer,
    exibirSteper: false,
  },
  {
    // Etapa 2
    id: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
    label: 'Simulação de empréstimo',
    container: SimularEmprestimoContainer,
    exibirSteper: true,
  },
  {
    // Etapa 3
    id: IDS_FLUXO_SIMULACAO_ENUM.CONTATOS,
    label: 'Informe seus contatos',
    container: CadastroContatosContainer,
    exibirSteper: true,
  },
  {
    // Etapa 4
    id: IDS_FLUXO_SIMULACAO_ENUM.DADOS_PESSOAIS,
    label: 'Cadastro de dados pessoais',
    container: DadosPessoaisContainer,
    exibirSteper: true,
  },
  {
    // Etapa 5
    id: IDS_FLUXO_SIMULACAO_ENUM.INFORMACOES_COMPLEMENTARES,
    label: 'Informações Complementares',
    container: InformacoesComplementaresContainer,
    exibirSteper: true,
  },
  {
    // Etapa 6
    id: IDS_FLUXO_SIMULACAO_ENUM.CONTA_BANCARIA,
    label: 'Conta Bancária',
    container: ContaBancariaContainer,
    exibirSteper: true,
  },
  {
    // Etapa 7
    id: IDS_FLUXO_SIMULACAO_ENUM.SENHA,
    label: 'Cadastro de senha',
    container: CadastroSenhaContainer,
    exibirSteper: true,
  },
];

export const stepsFluxoNovaSimulacao = [
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.LOADING_INICIAL,
    label: 'Carregando simulação',
    container: SimularEmprestimoLoader,
    exibirSteper: false,
  },
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.AUTENTICACAO,
    label: 'Autenticacao',
    container: ConfirmacaoDadosContainer,
    exibirSteper: false,
  },
  {
    id: IDS_FLUXO_SIMULACAO_ENUM.VALORES,
    label: 'Simulação de empréstimo',
    container: SimularEmprestimoContainer,
    exibirSteper: false,
  },
];

export const getEtapasDisponiveis = ({ pessoa, organizacao, idNegociacao }) => {
  let stepsDisponiveis;
  const { tipoFluxoEp } = organizacao;
  if (tipoFluxoEp && tipoFluxoEp === 'BANCO_SEMEAR')
    stepsDisponiveis = [...stepsFluxoSimulacaoEP];
  else if (idNegociacao) stepsDisponiveis = [...stepsFluxoNovaSimulacao];
  else stepsDisponiveis = [...stepsFluxoSimulacao];

  // Remove Step de cadastro de senha quando usuário já possui senha!
  if (pessoa && pessoa.possuiSenhaFirebase) {
    stepsDisponiveis = stepsDisponiveis.filter(
      ({ id }) => id !== IDS_FLUXO_SIMULACAO_ENUM.SENHA,
    );
  }

  // validação para verificar se existem campos personalizados na etapa de Informações Complementares
  const { camposPersonalizados: { infosAdicionais = [] } = {} } =
    organizacao || {};

  const exibeStepInfosAdicionais = infosAdicionais
    .map(campo => campo.disponivel)
    .some(disponivel => disponivel);

  if (!exibeStepInfosAdicionais) {
    stepsDisponiveis = stepsDisponiveis.filter(
      ({ id }) => id !== IDS_FLUXO_SIMULACAO_ENUM.INFORMACOES_COMPLEMENTARES,
    );
  }
  return stepsDisponiveis;
};

export const getProximaEtapa = ({ idEtapaAtual, pessoa, organizacao }) => {
  const etapasDisponiveis = getEtapasDisponiveis({ pessoa, organizacao });

  // Busca index da etapa atual
  const etapaAtualObj = etapasDisponiveis.find(({ id }) => id === idEtapaAtual);
  const idxEtapaAtual = etapasDisponiveis.indexOf(etapaAtualObj);

  return etapasDisponiveis[idxEtapaAtual + 1];
};

export const getEtapaAnterior = ({ idEtapaAtual, pessoa, organizacao }) => {
  const etapasDisponiveis = getEtapasDisponiveis({ pessoa, organizacao });

  // Busca index da etapa atual
  const etapaAtualObj = etapasDisponiveis.find(({ id }) => id === idEtapaAtual);
  const idxEtapaAtual = etapasDisponiveis.indexOf(etapaAtualObj);

  return etapasDisponiveis[idxEtapaAtual - 1];
};

export const getEtapaPorId = ({ idBusca, pessoa, organizacao }) => {
  const etapasDisponiveis = getEtapasDisponiveis({ pessoa, organizacao });

  return etapasDisponiveis.find(({ id }) => id === idBusca);
};
