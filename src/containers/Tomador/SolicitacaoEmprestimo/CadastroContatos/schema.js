import { gerarYupCampoAdicional } from 'commons/utils/camposPersonalizadosUtil';
import Yup from 'commons/Yup';

import { validaDDD } from '~/commons/utils/dddsExistentes';

export function gerarSchema(camposPadrao, camposAdicionais, emailCorporativo) {
  const { email: emailPessoal, celular } = camposPadrao;
  let emailYup = {};
  if (emailPessoal?.disponivel) {
    emailYup = Yup.string()
      .email()
      .test(
        'validarEmailPessoalIgualCorporativo',
        'Informe e-mail diferente do e-mail corporativo',
        email => {
          if (!email) {
            return true;
          }
          return email !== emailCorporativo;
        },
      )
      .validarEmailPessoalDuplicado(
        'E-mail pessoal já cadastrado',
        emailCorporativo,
      );
    emailYup = emailPessoal.obrigatorio
      ? { email: emailYup.required('E-mail pessoal obrigatório') }
      : { email: emailYup.nullable() };
  }

  let celularYup = {};
  if (celular?.disponivel) {
    if (celular.obrigatorio) {
      celularYup = {
        celular: Yup.string()
          .required('Celular obrigatório')
          .transform(value => value.replace(/\D/g, ''))
          .min(10, 'Celular deve conter no mínimo 10 dígitos com DDD')
          .max(11, 'Celular deve conter no máximo 11 dígitos com DDD')
          .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
      };
    } else {
      celularYup = {
        celular: Yup.string()
          .min(10)
          .nullable()
          .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
      };
    }
  }
  const yupCamposAdicionais = camposAdicionais
    .map(gerarYupCampoAdicional)
    .reduce((a, b) => ({ ...a, ...b }), {});
  return Yup.object().shape({
    ...emailYup,
    ...celularYup,
    ...yupCamposAdicionais,
  });
}

export const defaultSchema = emailCorporativo =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .validarEmailPessoalDuplicado(
        'E-mail pessoal já cadastrado',
        emailCorporativo,
      )
      .test(
        'validarEmailPessoalIgualCorporativo',
        'Informe e-mail diferente do e-mail corporativo',
        email => email !== emailCorporativo,
      )
      .required('E-mail pessoal obrigatório'),
    celular: Yup.string().min(10).required('Celular obrigatório'),
  });

export const modalSchema = emailCorporativo =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .validarEmailPessoalDuplicado(
        'E-mail pessoal já cadastrado',
        emailCorporativo,
      )
      .test(
        'validarEmailPessoalIgualCorporativo',
        'Informe e-mail diferente do e-mail corporativo',
        email => email !== emailCorporativo,
      )
      .required('E-mail pessoal obrigatório'),
  });
