const PUBLIC_ENDPOINTS = {
  GET_PESSOA_PARAMETRIZACAO: '/simulacao-emprestimo/parametrizacao',
  GET_PROFISSAO: '/profissao',
  EMAIL_CONFIRMACAO: '/validacao/email',
  EMAIL_CONFIRMACAO_CODIGO: '/validacao/email/codigo',
  EMAIL_CONFIRMACAO_LINK: '/validacao/email/link',
  EMAIL_VERIFICA_CONFIRMACAO: '/validacao/email/verifica-confirmacao',
  EMAIL_VERIFICA_ENVIO: '/validacao/email/verifica-envio',
  TELEFONE_CONFIRMACAO: '/validacao/telefone',
  TELEFONE_CONFIRMACAO_CODIGO: '/validacao/telefone/codigo',
  TELEFONE_VERIFICA_CONFIRMACAO: '/validacao/telefone/verifica-confirmacao',
  TELEFONE_VERIFICA_ENVIO: '/validacao/telefone/verifica-envio',
};

const PRIVATE_ENDPOINTS = {
  GET_ESTADO_CIVIL: '/estadoCivil',
  GET_GENERO: '/genero',
  GET_TIPO_OPERACAO_BANCARIA: '/tipoOperacaoBancaria',
};

export default {
  ...PUBLIC_ENDPOINTS,
  ...PRIVATE_ENDPOINTS,
};
