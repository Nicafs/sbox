import { CODIGO_BANCO_CAIXA } from '../../../../commons/constants/bancos';
import Yup from '../../../../commons/Yup';

const validacaoBancoCaixa = banco => {
  const { data } = banco || {};
  if (!data) {
    return false;
  }
  const { codigo } = data;
  return parseInt(codigo, 10) === CODIGO_BANCO_CAIXA;
};

const schemaPadrao = {
  banco: [
    Yup.object().shape({
      value: Yup.string(),
      label: Yup.mixed(),
      data: Yup.mixed(), // Banco Model Object
    }),
    'Banco obrigatório',
  ],
  tipoConta: [
    Yup.string().oneOf(['POUPANCA', 'CORRENTE']),
    'Tipo conta obrigatório',
  ],
  agencia: [
    Yup.string().min(3, 'Agencia mínimo de 3 dígitos'),
    'Agência obrigatória',
  ],
  conta: [
    Yup.string().min(3, 'Conta mínimo de 3 dígitos'),
    'Conta obrigatória',
  ],
  tipoOperacao: [
    Yup.string().when('banco', {
      is: validacaoBancoCaixa,
      then: Yup.string().required(),
      otherwise: Yup.string().nullable(),
    }),
    'Tipo opreação inválida',
  ],
};

export default schemaPadrao;
