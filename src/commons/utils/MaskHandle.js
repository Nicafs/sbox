import roundTo from 'round-to';

const cpfMask = value =>
  value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

const cnpjMask = value => {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const telefoneCelularMask = v => {
  if (!v) {
    return '';
  }
  let r = v.replace(/\D/g, '');
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (r.length > 6) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    r = r.replace(/^(\d*)/, '($1');
  }
  return r;
};

const celularMask = value =>
  !value
    ? ''
    : value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, '($1)$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');

const telefoneMask = value =>
  value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '($1)$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

const moneyMask = valor => {
  let valorSemPontoVirgula;
  if (Number.isInteger(valor)) {
    valorSemPontoVirgula = `${valor}.00`;
  } else {
    valorSemPontoVirgula = `${valor}`;
  }

  const casaDecimal = valorSemPontoVirgula.split('.')[1] || '00';

  if (casaDecimal.length < 2) {
    valorSemPontoVirgula = `${valor}0`;
  } else if (casaDecimal > 2) {
    valorSemPontoVirgula = `${Number(valor).toFixed(2)}`;
  }

  return valorSemPontoVirgula
    .replace(/\D/g, '') // permite digitar apenas número
    .replace(/^0*/gm, '') // bloqueia zeros à esquerda
    .replace(/(\d)(\d{23})$/, '$1.$2') // coloca ponto antes dos últimos 23 dígitos
    .replace(/(\d)(\d{20})$/, '$1.$2') // coloca ponto antes dos últimos 20 dígitos
    .replace(/(\d)(\d{17})$/, '$1.$2') // coloca ponto antes dos últimos 17 dígitos
    .replace(/(\d)(\d{14})$/, '$1.$2') // coloca ponto antes dos últimos 14 dígitos
    .replace(/(\d)(\d{11})$/, '$1.$2') // coloca ponto antes dos últimos 11 dígitos
    .replace(/(\d)(\d{8})$/, '$1.$2') // coloca ponto antes dos últimos 8 dígitos
    .replace(/(\d)(\d{5})$/, '$1.$2') // coloca ponto antes dos últimos 5 dígitos
    .replace(/(\d)(\d{1,2})?$/, '$1,$2'); // coloca vírgula antes dos primeiros 2 dígitos;
};

const percentMask = (valor, casasDecimais = 2) => {
  let valorNormalizado;
  if (Number.isInteger(valor)) {
    valorNormalizado = `${valor}00`;
  } else if (Number.isFinite(valor)) {
    const valorMultiplicado = roundTo(valor * 100, 2);
    valorNormalizado = `${valorMultiplicado}`;
  } else {
    valorNormalizado = `${valor}`;
  }
  valorNormalizado = valorNormalizado.replace(/\D/g, '');
  let reAntesVirgula;
  if (valorNormalizado.length - casasDecimais > 1) {
    reAntesVirgula = new RegExp('(\\d{2})(\\d)');
  } else {
    reAntesVirgula = new RegExp('(\\d)(\\d)');
  }
  return valorNormalizado
    .replace(reAntesVirgula, '$1,$2')
    .replace(new RegExp(`(,\\d{${casasDecimais}})\\d+?`), '$1');
};

const cepMask = value => {
  if (!value) {
    return value;
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

const documentoMask = doc => {
  let docFmt = doc.replace(/\D/g, '');

  if (docFmt.length > 11) {
    docFmt = cnpjMask(docFmt);
  } else {
    docFmt = cpfMask(docFmt);
  }
  return docFmt;
};

const codeConfirmationMask = value =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');

const onlyNumber = value => value.replace(/\D/g, '');

const nomeMask = nome => {
  if (!nome) {
    return '';
  }
  const preposicoes = ['das', 'da', 'de', 'do', 'dos', 'e'];

  const formataNome = paramNome => {
    const nomeLower = paramNome.toLowerCase();
    if (preposicoes.includes(nomeLower)) {
      return nomeLower;
    }
    return (
      paramNome.charAt(0).toUpperCase() + paramNome.substr(1).toLowerCase()
    );
  };

  return nome
    .split(' ')
    .map(n => formataNome(n))
    .reduce((a, b) => `${a} ${b}`);
};

const toRomanNumber = numString => {
  const nums = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I',
  };
  const keys = Object.keys(nums);

  let result = '';
  let i = keys.length - 1;

  let numStringCopy = numString;
  while (i >= 0) {
    const int = keys[i];
    while (numStringCopy >= parseInt(int, 10)) {
      numStringCopy -= int;
      result += nums[int];
    }
    i -= 1;
  }
  return result;
};

export {
  celularMask,
  telefoneMask,
  documentoMask,
  moneyMask,
  percentMask,
  cepMask,
  cpfMask,
  cnpjMask,
  codeConfirmationMask,
  onlyNumber,
  nomeMask,
  toRomanNumber,
  telefoneCelularMask,
};
