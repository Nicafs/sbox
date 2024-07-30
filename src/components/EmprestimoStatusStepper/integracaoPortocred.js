export const getActiveStep = status => {
  let posicao = 1;
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
    case 'PROCESSADO':
    case 'REPROVADO':
    case 'ERRO_PROCESSAMENTO':
      posicao = 1;
      break;
    case 'ANALISANDO_CREDITO':
    case 'ANALISE_MANUAL':
      posicao = 2;
      break;
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_APROVACAO_RH':
      posicao = 3;
      break;
    case 'AGUARDANDO_TOMADOR':
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
    case 'FORMALIZADO':
      posicao = 4;
      break;
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      posicao = 5;
      break;
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
      return 'ERRO NO PROCESSAMENTO';
    case 'ANALISANDO_CREDITO':
      return 'ANALISANDO CRÉDITO';
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
      return 'AGUARDANDO PROCESSAMENTO FORMALIZACAO';
    case 'FORMALIZADO':
      return 'FORMALIZADO';
    case 'AGUARDANDO_TRANSFERENCIA':
      return 'AGUARDANDO TRANSFERENCIA';
    case 'AGUARDANDO_NOVA_CONTA':
      return 'AGUARDANDO NOVA CONTA';
    case 'GRANA_NA_CONTA':
    case 'APROVADO':
      return 'GRANA NA CONTA';
    case 'EXPIRADO':
      return 'EXPIRADO';
    default:
      return status.replace('_', ' ');
  }
};

export const getSteps = status => {
  switch (status) {
    case 'PENDENCIA_CONFIRMACAO_EMPRESTIMO':
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Reenvie seus Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'ANALISANDO_DOCUMENTOS':
    case 'ANALISANDO_DOCUMENTOS_MANUALMENTE':
    case 'AGUARDANDO_PROCESSAMENTO':
    case 'ANALISANDO_CREDITO':
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
        'Aguardando Formalização',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'FORMALIZADO':
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
        'Formalizado',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'PROCESSADO':
      return [
        'Processado',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'REPROVADO':
      return [
        'Reprovado',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'ERRO_PROCESSAMENTO':
      return [
        'Erro no Processamento',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'ANALISE_MANUAL':
      return [
        'Erro no Processamento',
        'Analise Manual',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Transferência',
        'Grana na Conta',
      ];
    case 'AGUARDANDO_NOVA_CONTA':
      return [
        'Erro no Processamento',
        'Analise Manual',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Nova Conta',
        'Grana na Conta',
      ];
    case 'EXPIRADO':
      return [
        'Expirado',
        'Analise Manual',
        'Aguardando Aprovação RH',
        'Confirmar Contratos',
        'Analisando Documentos',
        'Aguardando Nova Conta',
        'Grana na Conta',
      ];
    default:
      return [
        'Aguardando Processamento',
        'Analisando Crédito',
        'Aguardando Aprovação RH',
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
    case 'FORMALIZADO':
    case 'ERRO_PROCESSAMENTO':
    case 'AGUARDANDO_TRANSFERENCIA':
    case 'REPROVADO':
      return 'ico-ag-trans';
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
    case 'EXPIRADO':
      return 'icone-seguranca';
    default:
      return 'icon-aguardando-inv';
  }
};

export const getDescricaoStatus = (status, contaBancaria = {}) => {
  const { nomeBanco, agencia, conta } = contaBancaria;
  switch (status) {
    case 'AGUARDANDO_PROCESSAMENTO':
      return 'Já estamos analisando sua solicitação de empréstimo, assim que estiver tudo certo, avisamos você por e-mail.';
    case 'PROCESSADO':
      return `Já processamos sua solicitação de empréstimo, assim que estiver tudo certo, avisamos você por e-mail.`;
    case 'FORMALIZADO':
      return `Já processamos a formalização da sua solicitação de empréstimo`;
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
    case 'AGUARDANDO_APROVACAO':
    case 'AGUARDANDO_APROVACAO_RH':
    case 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED':
    case 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED':
      return `O RH está analisando sua solicitação de empréstimo, assim que estiver tudo certo, avisamos você por e-mail.`;
    case 'AGUARDANDO_TOMADOR':
      return `Já aprovamos sua solicitação de empréstimo. Agora precisamos que você confirme as condições e valores.`;
    case 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES':
      return `Sua solicitação de empréstimo sofreu pequenas alterações de valores. Agora precisamos que você confirme as novas condições e valores.`;
    case 'AGUARDANDO_PROCESSAMENTO_FORMALIZACAO':
      return `Estamos processando a confirmação da sua solicitação de empréstimo.`;
    case 'AGUARDANDO_TRANSFERENCIA':
      return `Já estamos providenciando a transferência do seu empréstimo para conta ${conta} agência ${agencia} (${nomeBanco}).`;
    case 'AGUARDANDO_NOVA_CONTA':
      return `Não conseguimos efetuar transferência na conta ${conta} agência ${agencia} (${nomeBanco}). Favor informar uma nova conta.`;
    case 'GRANA_NA_CONTA':
    case 'APROVADO':
      return `O dinheiro estará disponível na sua conta nas próximas horas.`;
    case 'EXPIRADO':
      return 'Seu empréstimo expirou, fique tranquilo em alguns minutos vamos criar uma nova solicitação.';
    default:
      return '';
  }
};
