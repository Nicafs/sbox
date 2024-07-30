import moment from 'moment';

import { transformarDataApiParaDataLocal } from '../tratativasParaDatasApi';

export const getTempoDeCarteira = dataAdmissao => {
  const dataAdmissaoMoment = transformarDataApiParaDataLocal(dataAdmissao);
  const diffEmAnos = moment().diff(dataAdmissaoMoment, 'years');
  const tempoEmAnos = `${diffEmAnos} ano(s)`;
  if (diffEmAnos > 0) {
    return tempoEmAnos;
  }
  const diffEmMeses = moment().diff(dataAdmissaoMoment, 'months');
  const tempoEmMeses = `${diffEmMeses} meses`;
  return tempoEmMeses;
};

export const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

export const getNegociacaoStatusLabel = status => {
  switch (status.toUpperCase()) {
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_APROVACAO_RH':
    case 'AGUARDANDO_APROVACAO':
      return 'AGUARDANDO APROVAÇÃO RH';
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
      return 'AGUARDANDO PROCESSAMENTO FORMALIZACAO';
    case 'AGUARDANDO_INVESTIDOR':
      return 'AGUARDANDO INVESTIDOR';
    case 'AGUARDANDO_TOMADOR':
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
      return 'AGUARDANDO TOMADOR';
    case 'ANALISANDO_CREDITO':
      return 'ANALISANDO CREDITO';
    case 'AGUARDANDO_TRANSFERENCIA':
      return 'AGUARDANDO TRANSFERÊNCIA';
    case 'APROVADO':
      return 'APROVADO';
    case 'FORMALIZADO':
      return 'FORMALIZADO';
    case 'LIQUIDADO':
      return 'LIQUIDADO';
    case 'CANCELADO':
      return 'CANCELADO';
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return 'PENDÊNCIA CONFIRMAÇÃO EMPRÉSTIMO';
    case 'AGUARDANDO_PROCESSAMENTO':
      return 'AGUARDANDO PROCESSAMENTO';
    case 'PROCESSADO':
      return 'PROCESSADO';
    case 'ERRO_PROCESSAMENTO':
      return 'ERRO NO PROCESSAMENTO';
    case 'ANALISANDO_DOCUMENTOS':
      return 'ANALISANDO DOCUMENTOS';
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return 'ANALISANDO DOCUMENTOS';
    case 'ANALISE_MANUAL':
      return 'ANÁLISE MANUAL';
    case 'AGUARDANDO_NOVA_CONTA':
      return 'AGUARDANDO NOVA CONTA';
    case 'GRANA_NA_CONTA':
      return 'GRANA NA CONTA';
    case 'AGUARDANDO_CANCELAMENTO':
      return 'AGUARDANDO CANCELAMENTO';
    default:
      return status.toUpperCase();
  }
};

// Utilizar esse método somente na exibição, nunca durante os calculos!
export const arredondaNumero = n => {
  return Math.round(n * 100) / 100;
};

export const getOrganizacaoWhitelabel = () => {
  const nomeTemaFixo = process.env.REACT_APP_TEMA_FIXO;
  if (nomeTemaFixo) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const { organizacao } = require(`../../whitelabel/${nomeTemaFixo}`);
    return organizacao;
  }
};
