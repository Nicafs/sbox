export const getActiveStep = status => {
  let posicao = 1;
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
    case 'PROCESSADO':
    case 'REPROVADO':
    case 'ERRO_PROCESSAMENTO':
    case 'AGUARDANDO_CANCELAMENTO':
    case 'CANCELADO':
      posicao = 1;
      break;
    case 'ANALISANDO_CREDITO':
    case 'ANALISE_MANUAL':
    case 'FORMALIZADO_VIA_CALL_CENTER':
      posicao = 2;
      break;
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
    case 'AGUARDANDO_TOMADOR':
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
      posicao = 3;
      break;
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
    case 'FORMALIZADO':
      posicao = 4;
      break;
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_APROVACAO_RH':
      posicao = 5;
      break;
    case 'TRANSFERENCIA_SOLICITADA':
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'AGUARDANDO_NOVA_CONTA':
      posicao = 6;
      break;
    case 'APROVADO':
    case 'GRANA_NA_CONTA':
      posicao = 7;
      break;
    case 'EXPIRADO':
      return 0;
    default:
      break;
  }
  const index = posicao - 1;
  return index;
};

export const getNomeStep = status => {
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
      return 'AGUARDANDO PROCESSAMENTO';
    case 'PROCESSADO':
      return 'PROCESSADO';
    case 'REPROVADO':
      return 'REPROVADO';
    case 'ERRO_PROCESSAMENTO':
      return 'EM AVALIAÇÃO';
    case 'ANALISANDO_CREDITO':
      return 'ANALISANDO CRÉDITO';
    case 'FORMALIZADO_VIA_CALL_CENTER':
      return 'FORMALIZADO VIA CALL CENTER';
    case 'AGUARDANDO_NOVA_SIMULACAO':
      return 'AGUARDANDO NOVA SIMULAÇÃO';
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return 'ANALISANDO DOCUMENTOS';
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return 'REENVIE SEUS DOCUMENTOS';
    case 'ANALISE_MANUAL':
      return 'ANÁLISE MANUAL';
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_APROVACAO_RH':
      return 'AGUARDANDO APROVAÇÃO RH';
    case 'AGUARDANDO_TOMADOR':
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
      return 'CONFIRMAR CONTRATOS';
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
      return 'AGUARDANDO PROCESSAMENTO FORMALIZAÇÃO';
    case 'FORMALIZADO':
      return 'FORMALIZADO';
    case 'AGUARDANDO_TRANSFERENCIA':
      return 'AGUARDANDO TRANSFERÊNCIA';
    case 'AGUARDANDO_NOVA_CONTA':
      return 'AGUARDANDO NOVA CONTA';
    case 'TRANSFERENCIA_SOLICITADA':
      return 'TRANSFERÊNCIA SOLICITADA';
    case 'GRANA_NA_CONTA':
    case 'APROVADO':
      return 'GRANA NA CONTA';
    case 'EXPIRADO':
      return 'EXPIRADO';
    case 'AGUARDANDO_CANCELAMENTO':
      return 'AGUARDANDO CANCELAMENTO';
    case 'CANCELADO':
      return 'CANCELADO';
    default:
      return status.replace('_', ' ');
  }
};

export const getSteps = status => {
  switch (status) {
    case 'PROCESSADO':
    case 'ANALISANDO_CREDITO':
    case 'ANALISE_MANUAL':
      return [
        'Processado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'REPROVADO':
      return [
        'Reprovado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'ERRO_PROCESSAMENTO':
      return [
        'Em Avaliação',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'FORMALIZADO_VIA_CALL_CENTER':
      return [
        'Processado',
        'Formalizado via Call Center',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_TOMADOR':
      return [
        'Processado',
        'Crédito Analisado',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return [
        'Processado',
        'Crédito Analisado',
        'Reenvie seus Documentos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
      return [
        'Processado',
        'Crédito Analisado',
        'Aguardando confirmação de valores',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Aguardando Formalização',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'FORMALIZADO':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Formalizado',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_APROVACAO_RH':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'TRANSFERENCIA_SOLICITADA':
    case 'AGUARDANDO_TRANSFERENCIA':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aprovado pelo RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_NOVA_CONTA':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aprovado pelo RH',
        'Aguardando Nova Conta',
        'Grana na Conta',
      ];
    case 'APROVADO':
    case 'GRANA_NA_CONTA':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aprovado pelo RH',
        'Transferência Realizada',
        'Grana na Conta',
      ];
    case 'EXPIRADO':
      return [
        'Expirado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_CANCELAMENTO':
      return [
        'Aguardando Cancelamento',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'CANCELADO':
      return [
        'Cancelado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    default:
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Aprovação RH',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
  }
};

export const getIconeNameByStatus = status => {
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
    case 'PROCESSADO':
    case 'FORMALIZADO':
    case 'ERRO_PROCESSAMENTO':
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'TRANSFERENCIA_SOLICITADA':
    case 'REPROVADO':
      return 'ico-ag-trans';
    case 'FORMALIZADO_VIA_CALL_CENTER':
      return 'ilustra-celular';
    case 'ANALISANDO_CREDITO':
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
    case 'ANALISE_MANUAL':
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_APROVACAO_RH':
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
      return 'icon-contrato-1';
    case 'GRANA_NA_CONTA':
    case 'APROVADO':
      return 'icon-grana-na-conta';
    case 'AGUARDANDO_TOMADOR':
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
    case 'AGUARDANDO_NOVA_CONTA':
      return 'icon-confirmar-contratos';
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return 'RG-Frente';
    case 'CANCELADO':
    case 'AGUARDANDO_CANCELAMENTO':
    case 'EXPIRADO':
      return 'icone-seguranca';
    default:
      return 'icon-aguardando-inv';
  }
};

export const getDescricaoStatus = (
  status,
  contaBancaria = {},
  dataTransferencia,
  motivoReprovacaoDoc,
) => {
  const { nomeBanco, agencia, conta } = contaBancaria;
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
      return 'Já estamos analisando sua solicitação de empréstimo, assim que estiver tudo certo, avisamos você por e-mail.';
    case 'PROCESSADO':
      return `Já processamos sua solicitação de empréstimo, assim que estiver tudo certo, avisamos você por e-mail.`;
    case 'FORMALIZADO':
      return `Já processamos a formalização da sua solicitação de empréstimo.`;
    case 'FORMALIZADO_VIA_CALL_CENTER':
      return `O seu empréstimo já foi formalizdo por um de nossos atendentes.`;
    case 'REPROVADO':
      return `Não foi possível continuar, pois sua solicitação de empréstimo foi reprovada.`;
    case 'ERRO_PROCESSAMENTO':
      return `Estamos avaliando seu empréstimo.`;
    case 'ANALISANDO_DOCUMENTOS':
      return `Para sua segurança, estamos analisando seus documentos.`;
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return `Para sua segurança, estamos analisando seus documentos.`;
    case 'ANALISANDO_CREDITO':
    case 'ANALISE_MANUAL':
      return `Para sua segurança, estamos analisando seus dados.`;
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_APROVACAO_RH':
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
      return `O RH está analisando sua solicitação de empréstimo, assim que estiver tudo certo, avisamos você por e-mail.`;
    case 'AGUARDANDO_TOMADOR':
      return `Já aprovamos sua solicitação de empréstimo. Agora precisamos que você confirme as condições e valores.`;
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return motivoReprovacaoDoc;
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
      return `Sua solicitação de empréstimo sofreu pequenas alterações de valores. Agora precisamos que você confirme as novas condições e valores.`;
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
      return `Estamos processando a confirmação da sua solicitação de empréstimo.`;
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'TRANSFERENCIA_SOLICITADA':
      return `Já estamos providenciando a transferência do seu empréstimo para conta ${conta} agência ${agencia} (${nomeBanco}).
      ${
        dataTransferencia &&
        `A grana vai estar disponível dia ${dataTransferencia}.`
      }`;
    case 'AGUARDANDO_NOVA_CONTA':
      return `Não conseguimos efetuar transferência na conta ${conta} agência ${agencia} (${nomeBanco}). Favor informar uma nova conta.`;
    case 'GRANA_NA_CONTA':
    case 'APROVADO':
      return `O dinheiro estará disponível na sua conta nas próximas horas.`;
    case 'EXPIRADO':
      return 'Seu empréstimo expirou, fique tranquilo em alguns minutos vamos criar uma nova solicitação.';
    case 'AGUARDANDO_CANCELAMENTO':
      return `Estamos processando o cancelamento de sua solicitação.`;
    case 'CANCELADO':
      return 'Sua solicitação foi cancelada';
    default:
      return '';
  }
};
