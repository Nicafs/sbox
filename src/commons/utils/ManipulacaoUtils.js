import { moneyMask } from './MaskHandle';

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const onlyNumbers = numeroStr => numeroStr.replace(/\D/g, '');

const stringToNumber = numeroStr => {
  if (typeof numeroStr === 'number') {
    return numeroStr;
  }

  const numero = Number(
    numeroStr.toString().replace(/\./g, '').replace(',', '.'),
  );
  if (Number.isNaN(numero)) {
    return 0;
  }
  return numero;
};

const stringPercentToNumber = (numeroStr, casasDecimais = 2) => {
  const numero = stringToNumber(numeroStr) / 100;
  return Number(numero.toFixed(casasDecimais));
};

const blobToBase64 = async blobUrl => {
  const blob = await fetch(blobUrl).then(r => r.blob());
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

const dataPorExtenso = (dataInput, printDiaSemana = true) => {
  let data;
  if (typeof dataInput === 'string') {
    data = new Date(`${dataInput}T00:00:00`);
  } else {
    data = dataInput;
  }
  if (!(data instanceof Date)) {
    return '';
  }
  const day = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ][data.getDay()];
  const date = data.getDate();
  const month = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ][data.getMonth()];
  const year = data.getFullYear();

  return `${printDiaSemana ? `${day},` : ''} ${date} de ${month} de ${year}`;
};

const inputDinheiroComCentavosZerado = valor => {
  let valorRetorno;
  if (valor.slice(-1) === ',') {
    valorRetorno = valor.replace(',', '');
  } else if (valor.length === 3 && valor.slice(-2) === ',0') {
    const [novoValor] = valor;
    valorRetorno = novoValor;
  } else if (valor.length > 3 && valor.slice(-2) === ',0') {
    const valorSemCentavos = valor.replace(',0', '');
    valorRetorno = moneyMask(`${valorSemCentavos.slice(0, -1)},00`);
  } else if (valor.length > 3 && valor.slice(-4).substr(0, 3) === ',00') {
    valorRetorno = moneyMask(`${valor.replace(',00', '')},00`);
  } else if (valor.length === 2) {
    valorRetorno = moneyMask(`${valor}00`);
  } else {
    const valorComMascara = moneyMask(valor);
    if (valorComMascara.slice(-1) === ',') {
      valorRetorno = `${valorComMascara}00`;
    } else {
      valorRetorno = valorComMascara;
    }
  }
  if (valorRetorno.includes(',') && valorRetorno.split(',')[1] !== '00') {
    return `${valorRetorno.split(',')[0]},00`;
  }
  return valorRetorno;
};

const inputDinheiroComCentavosZeradoParaNumerico = valor => {
  if (typeof valor === 'number') {
    return valor;
  }
  return parseFloat(valor.replace(',00', '').replace(/\./, ''));
};

export {
  validateEmail,
  onlyNumbers,
  stringToNumber,
  stringPercentToNumber,
  blobToBase64,
  dataPorExtenso,
  inputDinheiroComCentavosZerado,
  inputDinheiroComCentavosZeradoParaNumerico,
};
