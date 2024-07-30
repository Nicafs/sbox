import PessoaApi from 'commons/resources/pessoa';
import { CNPJ, CPF } from 'cpf_cnpj';
import debounce from 'lodash.debounce';
import * as Yup from 'yup';

import { getOrganizacaoWhitelabel } from './utils';
import { validateEmail } from './utils/ManipulacaoUtils';

Yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'E-mail inválido',
    validarDocumento: 'Documento inválido',
    validarCNPJ: 'CNPJ inválido',
    /* ** YUP TEMPLATE ** */
    // eslint-disable-next-line no-template-curly-in-string
    min: 'Campo deve ter no mínimo ${min} caracteres.',
    /* ** YUP TEMPLATE ** */
    // eslint-disable-next-line no-template-curly-in-string
    max: 'Campo deve ter no máximo ${max} caracteres.',
  },
});

Yup.addMethod(Yup.string, 'validaCpf', function validaCpf(message) {
  return this.test(['numCpf'], message, numCpf => CPF.isValid(numCpf));
});

Yup.addMethod(Yup.number, 'transformaNumerico', function transformaNumerico() {
  return this.transform(function aplicaTransformacao(value, originalValue) {
    if (this.isType(value)) return value;
    if (originalValue)
      return Number(originalValue.replace(/\./g, '').replace(/,/g, '.'));
    return 0;
  });
});

Yup.addMethod(
  Yup.string,
  'validarDocumento',
  function validarDocumento(message) {
    return this.test('documento', message, value => {
      if (!value) {
        return true;
      }
      const doc = value.replace(/\D/g, '');
      if (doc.length === 11) {
        return CPF.isValid(doc);
      }
      if (doc.length === 14) {
        return CNPJ.isValid(doc);
      }
      return false;
    });
  },
);

Yup.addMethod(Yup.string, 'validarCNPJ', function validarCNPJ(message) {
  return this.test('cnpj', message, value => {
    if (!value) {
      return true;
    }
    const doc = value.replace(/\D/g, '');
    if (doc.length === 14) {
      return CNPJ.isValid(doc);
    }
    return false;
  });
});

const debounceFunction = async (value, resolve) => {
  try {
    const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();
    const { existe } = await PessoaApi.validaEmailDisponivel(
      value,
      cnpjOrganizacao,
    );
    resolve(!existe);
  } catch (ex) {
    console.error(ex);
    resolve(false);
  }
};

const validationDebounced = debounce(debounceFunction, 1000);

Yup.addMethod(
  Yup.string,
  'validarEmailPessoalDuplicado',
  function validarEmailPessoalDuplicado(message, emailCorporativo = null) {
    return this.test('email', message, async value => {
      if (value === emailCorporativo) {
        return true;
      }

      if (!value) {
        return true;
      }
      if (!validateEmail(value)) {
        return true;
      }

      return new Promise(resolve => validationDebounced(value, resolve));
    });
  },
);

export default Yup;
