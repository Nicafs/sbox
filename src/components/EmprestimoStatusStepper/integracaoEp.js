export const getActiveStep = status => {
  let posicao = 1;
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
    case 'PROCESSADO':
    case 'REPROVADO':
    case 'ERRO_PROCESSAMENTO':
    case 'AGUARDANDO_CANCELAMENTO':
    case 'CANCELADO':
    case 'EXPIRADO':
      posicao = 1;
      break;
    case 'ANALISANDO_CREDITO':
    case 'ANALISE_MANUAL':
      posicao = 2;
      break;
    case 'AGUARDANDO_TOMADOR':
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      posicao = 3;
      break;
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      posicao = 4;
      break;
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'TRANSFERENCIA_SOLICITADA':
    case 'TRANSFERENCIA_CONFIRMADA':
    case 'AGUARDANDO_NOVA_CONTA':
      posicao = 5;
      break;
    case 'APROVADO':
    case 'GRANA_NA_CONTA':
      posicao = 6;
      break;
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
    case 'AGUARDANDO_NOVA_SIMULACAO':
      return 'AGUARDANDO NOVA SIMULAÇÃO';
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return 'ANALISANDO DOCUMENTOS';
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return 'REENVIE SEUS DOCUMENTOS';
    case 'ANALISE_MANUAL':
      return 'ANÁLISE MANUAL';
    case 'AGUARDANDO_TOMADOR':
      return 'CONFIRMAR CONTRATOS';
    case 'AGUARDANDO_TRANSFERENCIA':
      return 'AGUARDANDO TRANSFERÊNCIA';
    case 'TRANSFERENCIA_SOLICITADA':
      return 'TRANSFERENCIA SOLICITADA';
    case 'TRANSFERENCIA_CONFIRMADA':
      return 'TRANSFERENCIA CONFIRMADA';
    case 'AGUARDANDO_NOVA_CONTA':
      return 'AGUARDANDO NOVA CONTA';
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
    case 'AGUARDANDO_PROCESSAMENTO':
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'PROCESSADO':
    case 'ANALISANDO_CREDITO':
    case 'ANALISE_MANUAL':
      return [
        'Processado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'REPROVADO':
      return [
        'Reprovado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'ERRO_PROCESSAMENTO':
      return [
        'Erro no Processamento',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_TOMADOR':
      return [
        'Processado',
        'Crédito Analisado',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return [
        'Processado',
        'Crédito Analisado',
        'Reenvie seus Documentos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return [
        'Processado',
        'Crédito Analisado',
        'Contratos Confirmados',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_TRANSFERENCIA':
      return [
        'Processado',
        'Analisando Crédito',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_NOVA_CONTA':
      return [
        'Processado',
        'Analisando Crédito',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aguardando Nova Conta',
        'Grana na Conta',
      ];
    case 'TRANSFERENCIA_SOLICITADA':
      return [
        'Processado',
        'Analisando Crédito',
        'Contratoê Confirmados',
        'Documentos Analisados',
        'Transferência Solicitada',
        'Grana na Conta',
      ];
    case 'TRANSFERENCIA_CONFIRMADA':
      return [
        'Processado',
        'Analisando Crédito',
        'Contratoê Confirmados',
        'Documentos Analisados',
        'Transferência Confirmada',
        'Grana na Conta',
      ];
    case 'APROVADO':
    case 'GRANA_NA_CONTA':
      return [
        'Processado',
        'Analisando Crédito',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Transferência Realizada',
        'Grana na Conta',
      ];
    case 'EXPIRADO':
      return [
        'Expirado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_CANCELAMENTO':
      return [
        'Aguardando Cancelamento',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'CANCELADO':
      return [
        'Cancelado',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    default:
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
  }
};

export const getIconeNameByStatus = status => {
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
    case 'PROCESSADO':
    case 'ERRO_PROCESSAMENTO':
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'TRANSFERENCIA_SOLICITADA':
    case 'TRANSFERENCIA_CONFIRMADA':
    case 'REPROVADO':
      return 'ico-ag-trans';
    case 'ANALISANDO_CREDITO':
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
    case 'ANALISE_MANUAL':
      return 'icon-contrato-1';
    case 'GRANA_NA_CONTA':
    case 'APROVADO':
      return 'icon-grana-na-conta';
    case 'AGUARDANDO_TOMADOR':
    case 'AGUARDANDO_NOVA_CONTA':
      return 'icon-confirmar-contratos';
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return 'RG-Frente';
    case 'EXPIRADO':
    case 'CANCELADO':
    case 'AGUARDANDO_CANCELAMENTO':
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
    case 'REPROVADO':
      return `Não foi possível continuar, pois sua solicitação de empréstimo foi reprovada.`;
    case 'ERRO_PROCESSAMENTO':
      return `Tivemos problemas para processar sua solicitação de empréstimo. Fique tranquilo, já estamos verificando.`;
    case 'ANALISANDO_DOCUMENTOS':
      return `Para sua segurança, estamos analisando seus documentos.`;
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return `Para sua segurança, estamos analisando seus documentos.`;
    case 'ANALISANDO_CREDITO':
    case 'ANALISE_MANUAL':
      return `Para sua segurança, estamos analisando seus dados.`;
    case 'AGUARDANDO_TOMADOR':
      return `Já aprovamos sua solicitação de empréstimo. Agora precisamos que você confirme as condições e valores.`;
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return motivoReprovacaoDoc;
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'TRANSFERENCIA_SOLICITADA':
    case 'TRANSFERENCIA_CONFIRMADA':
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
