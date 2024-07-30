import { differenceInYears } from 'date-fns';

import { validaDDD } from '~/commons/utils/dddsExistentes';
import Yup from '~/commons/Yup';

const YupSchema = Yup.object().shape({
  nome: Yup.string().required('Nome obrigatório'),
  cpf: Yup.string()
    .transform(value => value.replace(/\D/g, ''))
    .min(11, 'Documento deve ter ao menos 11 caracteres')
    .validarDocumento('Documento inválido')
    .required('CPF obrigatório'),
  celular: Yup.string()
    .transform(value => value.replace(/\D/g, ''))
    .min(10, 'Celular deve conter no mínimo 10 dígitos com DDD')
    .max(11, 'Celular deve conter no máximo 11 dígitos com DDD')
    .required('Celular obrigatório')
    .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
  nomeMae: Yup.string()
    .matches(/^[A-Za-zÀ-ú ]*$/, 'Insira Um Nome Válido')
    .required('Nome da mãe obrigatório')
    .test(
      'composto',
      'Digite o nome completo da sua mãe conforme RG',
      value => value && value.trim().split(' ').length > 1,
    ),
  dataNascimento: Yup.date()
    .required('Data de nascimento obrigatória')
    .test('dob', 'É necessário ser maior de 18 anos', value => {
      const diff = differenceInYears(new Date(), value);
      return diff >= 18;
    }),
  ocupacaoProfissional: Yup.string().required(
    'Ocupação profissional obrigatória',
  ),
});

export default YupSchema;
