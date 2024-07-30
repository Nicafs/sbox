import Yup from '../../../commons/Yup';

export default Yup.object().shape({
  rg: Yup.string().required('RG obrigatório'),
  profissao: Yup.string().required('Profissão obrigatória'),
  estadoCivil: Yup.string().required('Estado civil obrigatório'),
  cep: Yup.string().length(8, 'CEP inválido').required('CEP obrigatório'),
  logradouro: Yup.string().required('Logradouro obrigatório'),
  numero: Yup.string().when('complemento', (complemento, schema) =>
    !complemento ? schema.required('Número obrigatório') : schema,
  ),
  complemento: Yup.string().nullable(),
  bairro: Yup.string().required('Bairro obrigatório'),
  cidade: Yup.object()
    .when('cep', (cep, schema) =>
      cep
        ? schema.shape({
            label: Yup.string(),
            value: Yup.string(),
          })
        : schema,
    )
    .typeError('Cidade obrigatória'),
  uf: Yup.string().required('UF obrigatória'),
  cepEncontrado: Yup.bool(),
});
