import ParametroApi from '../resources/parametro';

const buscaParametroCadastroInvestidor = () =>
  ParametroApi.buscaDinamicaDeParametros({
    query: [
      {
        field: 'nome',
        operator: 'icontains',
        value: 'CADASTRO_INVESTIDOR',
      },
    ],
  });

const verificaArrayParametrosNaoVazio = arr => Array.isArray(arr) && arr.length;

const extraiValorDoParametro = parametro => {
  const valor = parseInt(parametro.valor, 10);
  if (valor === 1) {
    return true;
  }
  return false;
};

const verificarCadastroInvestidorDisponivel = async () => {
  try {
    const {
      itens: parametrosApiResultado,
    } = await buscaParametroCadastroInvestidor();
    if (verificaArrayParametrosNaoVazio(parametrosApiResultado)) {
      const parametro = parametrosApiResultado[0];
      return extraiValorDoParametro(parametro);
    }
  } catch (ex) {
    return false;
  }
};

export default verificarCadastroInvestidorDisponivel;
