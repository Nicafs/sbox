export const podeRecuperarArquivos = statusNegociacao => {
  return (
    statusNegociacao === 'AGUARDANDO_TOMADOR' ||
    statusNegociacao === 'PENDENCIA_CONFIRMACAO_EMPRESTIMO'
  );
};
