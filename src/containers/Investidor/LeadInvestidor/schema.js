import Yup from 'commons/Yup';

import { validaDDD } from '~/commons/utils/dddsExistentes';

const YupSchema = Yup.object().shape({
  nome: Yup.string()
    .min(6, 'Nome deve ter ao menos 6 caracteres')
    .required('Nome obrigatório'),
  celular: Yup.string()
    .transform(value => value.replace(/\D/g, ''))
    .min(10, 'Celular deve conter no mínimo 10 dígitos com DDD')
    .max(11, 'Celular deve conter no máximo 11 dígitos com DDD')
    .required('Celular obrigatório')
    .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
  cpf: Yup.string()
    .transform(value => value.replace(/\D/g, ''))
    .min(11, 'Documento deve ter 11 caracteres')
    .max(11, 'Documento deve ter 11 caracteres')
    .validarDocumento('Documento inválido')
    .required('CPF obrigatório'),
});

export default YupSchema;
