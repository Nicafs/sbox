export const getActiveStep = status => {
  switch (status) {
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_CANCELAMENTO':
    case 'CANCELADO':
      return 1;
    case 'AGUARDANDO_INVESTIDOR':
      return 2;
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
    case 'AGUARDANDO_TOMADOR':
      return 3;
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return 4;
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'TRANSFERENCIA_SOLICITADA':
    case 'TRANSFERENCIA_CONFIRMADA':
    case 'AGUARDANDO_NOVA_CONTA':
      return 5;
    case 'APROVADO':
      return 6;
    case 'EXPIRADO':
      return 0;
    default:
      break;
  }
};

export const getNomeStep = status => {
  switch (status) {
    case 'AGUARDANDO_INVESTIDOR':
      return 'AGUARDANDO INVESTIDOR';
    case 'AGUARDANDO_APROVACAO':
      return 'AGUARDANDO APROVAÇÃO';
    case 'AGUARDANDO_NOVA_SIMULACAO':
      return 'AGUARDANDO NOVA SIMULAÇÃO';
    case 'AGUARDANDO_TOMADOR':
      return 'CONFIRMAR CONTRATOS';
    case 'AGUARDANDO_TRANSFERENCIA':
      return 'AGUARDANDDO TRANSFERÊNCIA';
    case 'TRANSFERENCIA_CONFIRMADA':
      return 'TRANSFERÊNCIA CONFIRMADA';
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return 'ANALISANDO DOCUMENTOS';
    case 'APROVADO':
      return 'GRANA NA CONTA';
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return 'REENVIE SEUS DOCUMENTOS';
    case 'AGUARDANDO_NOVA_CONTA':
      return 'AGUARDANDO NOVA CONTA';
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
    case 'AGUARDANDO_APROVACAO':
      return [
        'Você Solicitou o Empréstimo',
        'Aguardando Aprovação',
        'Aguardando Investidor',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_INVESTIDOR':
      return [
        'Você Solicitou o Empréstimo',
        'Empréstimo Aprovado',
        'Aguardando Investidor',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return [
        'Você Solicitou o Empréstimo',
        'Empréstimo Aprovado',
        'Investidor Encontrado',
        'Reenvie seus Documentos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_TOMADOR':
      return [
        'Você Solicitou o Empréstimo',
        'Empréstimo Aprovado',
        'Investidor Encontrado',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return [
        'Você Solicitou o Empréstimo',
        'Empréstimo Aprovado',
        'Investidor Encontrado',
        'Contratos Confirmados',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'TRANSFERENCIA_SOLICITADA':
    case 'TRANSFERENCIA_CONFIRMADA':
      return [
        'Você Solicitou o Empréstimo',
        'Empréstimo Aprovado',
        'Investidor Encontrado',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_NOVA_CONTA':
      return [
        'Você Solicitou o Empréstimo',
        'Empréstimo Aprovado',
        'Investidor Encontrado',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Aguardando Nova Conta',
        'Grana na Conta',
      ];
    case 'APROVADO':
      return [
        'Você Solicitou o Empréstimo',
        'Empréstimo Aprovado',
        'Investidor Encontrado',
        'Contratos Confirmados',
        'Documentos Analisados',
        'Transferência Realizada',
        'Grana na Conta',
      ];
    case 'CANCELADO':
      return [
        'Você Solicitou o Empréstimo',
        'Cancelado',
        'Aguardando Investidor',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_CANCELAMENTO':
      return [
        'Você Solicitou o Empréstimo',
        'Aguardando Cancelamento',
        'Aguardando Investidor',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'EXPIRADO':
      return [
        'Você Solicitou o Empréstimo',
        'Expirado',
        'Aguardando Investidor',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    default:
      return [
        'Você Solicitou o Empréstimo',
        'Aguardando Aprovação',
        'Aguardando Investidor',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
  }
};

export const getIconeNameByStatus = status => {
  switch (status) {
    case 'AGUARDANDO_INVESTIDOR':
      return 'icon-aguardando-inv';
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return 'RG-Frente';
    case 'AGUARDANDO_APROVACAO':
    case 'EXPIRADO':
    case 'AGUARDANDO_CANCELAMENTO':
    case 'CANCELADO':
      return 'icone-seguranca';
    case 'AGUARDANDO_TOMADOR':
    case 'AGUARDANDO_NOVA_CONTA':
      return 'icon-confirmar-contratos';
    case 'AGUARDANDO_TRANSFERENCIA':
      return 'ico-ag-trans';
    case 'TRANSFERENCIA_CONFIRMADA':
      return 'icon-grana-na-conta';
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return 'icon-contrato-1';
    case 'APROVADO':
      return 'ilustra-carteira';
    default:
      return 'icon-aguardando-inv';
  }
};

export const getDescricaoStatus = (
  status,
  contaBancaria,
  dataTransferencia,
  motivoReprovacaoDoc,
) => {
  const { nomeBanco, agencia, conta } = contaBancaria;
  switch (status) {
    case 'AGUARDANDO_APROVACAO':
      return 'Já estamos analisando sua solicitação de empréstimo, assim que estiver tudo certo, avisamos você por e-mail.';
    case 'AGUARDANDO_TOMADOR':
      return `Agora é com você! Confirme sua solicitação de empréstimo de acordo com nosso termo e envie fotos do seu documento.`;
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
      return `Para sua segurança estamos analisando seus dados, assim que estiver tudo certo, avisamos você por e-mail.`;
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return motivoReprovacaoDoc;
    case 'APROVADO':
      return `Já creditamos o valor do seu empréstimo na conta ${conta} agência ${agencia} banco ${nomeBanco}.`;
    case 'CANCELADO':
      return 'Sua solicitação foi cancelada';
    case 'AGUARDANDO_TRANSFERENCIA':
      return `Já estamos providenciando a transferência do seu empréstimo para conta ${conta} agência ${agencia} (${nomeBanco}).
      ${
        dataTransferencia &&
        `A grana vai estar disponível dia ${dataTransferencia}.`
      }`;
    case 'AGUARDANDO_NOVA_CONTA':
      return `Não conseguimos efetuar transferência na conta ${conta} agência ${agencia} (${nomeBanco}). Favor informar uma nova conta.`;
    case 'AGUARDANDO_INVESTIDOR':
      return 'Aguardando proposta de um investidor.';
    case 'EXPIRADO':
      return 'Seu empréstimo expirou, fique tranquilo em alguns minutos vamos criar uma nova solicitação.';
    case 'AGUARDANDO_CANCELAMENTO':
      return `Estamos processando o cancelamento de sua solicitação.`;
    default:
      return '';
  }
};
