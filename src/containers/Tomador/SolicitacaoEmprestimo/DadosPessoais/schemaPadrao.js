import { differenceInYears } from 'date-fns';

import { validaDDD } from '~/commons/utils/dddsExistentes';

import Yup from '../../../../commons/Yup';

export const schemaHookCamposPersonalizados = {
  celular: [
    Yup.string()
      .min(10)
      .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
    'Celular obrigatório',
  ],
  dataNascimento: [
    Yup.date().typeError('Data inválida'),
    'Data de nascimento obrigatória',
  ],

  dataEmissaoRg: [
    Yup.date()
      .required('Data de nascimento obrigatória')
      .nullable()
      .test('dob', 'Verifique se a data de nascimento está correta.', value => {
        const diff = differenceInYears(new Date(), value);
        return diff < 100;
      }),
  ],
  emailCorporativo: [Yup.string().email(), 'E-mail corporativo obrigatório'],
  email: [Yup.string().email(), 'E-mail pessoal obrigatório'],
  profissao: [Yup.string(), 'Profissão obrigatória'],
  cargo: [Yup.string(), 'Cargo obrigatório'],
  estadoCivil: [Yup.string(), 'Estado civil obrigatório'],
  genero: [Yup.string(), 'Gênero obrigatório'],
  nomeMae: [Yup.string(), 'Nome da mãe obrigatório'],
  rg: [Yup.string().min('6', 'RG Inválido'), 'RG obrigatório'],
  emissorRg: [Yup.string(), 'Emissor RG obrigatório'],
  ufEmissorRg: [Yup.string(), 'UF emissora RG obrigatória'],
  ufNaturalidade: [Yup.string(), 'UF de nascimento obrigatória'],
  cidadeNaturalidade: [Yup.string(), 'Cidade de nascimento obrigatória'],
  // Endereco
  cep: [Yup.string().length(8, 'CEP inválido'), 'CEP obrigatório'],
  logradouro: [Yup.string(), 'Logradouro obrigatório'],
  numero: [
    Yup.string().when('complemento', (complemento, schema) =>
      !complemento ? schema.required('Número obrigatório') : schema,
    ),
    'Número obrigatório',
  ],
  complemento: [Yup.string().nullable(), 'Complemento obrigatório'],
  bairro: [Yup.string(), 'Bairro obrigatório'],
  uf: [Yup.string(), 'Estado obrigatório'],
  cidade: [
    Yup.object().when('cep', (cep, schema) =>
      cep
        ? schema.shape({
            label: Yup.string(),
            value: Yup.string(),
          })
        : schema,
    ),
    'Cidade obrigatória',
  ],
  // cidade: [Yup.string(), 'Cidade obrigatória'],
  cepEncontrado: [Yup.bool().nullable(), 'CEP obrigatório'],
};

export const schemaCamposEndereco = {
  // cep: Yup.string()
  //   .length(8, 'CEP inválido')
  //   .required('CEP obrigatório'),
  // logradouro: Yup.string().required('Logradouro obrigatório'),
  // numero: Yup.string().when('complemento', (complemento, schema) =>
  //   !complemento ? schema.required('Número obrigatório') : schema
  // ),
  // complemento: Yup.string().nullable(),
  // bairro: Yup.string().required('Bairro obrigatório'),
  // cidade: Yup.string().required('Cidade obrigatória'),
  // cepEncontrado: Yup.bool(),
};
