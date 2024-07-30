import ParametroApi from 'commons/resources/parametro';

export default async function buscarParametrosSistema() {
  const buscarParametroSistema = (parametro, parametros) =>
    parseFloat(parametros.find(p => p.nome === parametro).valor);

  let taxaChequeEspecial = 0;
  let taxaCartaoCredito = 0;
  let taxaCreditoExpress = 0;

  try {
    const {
      itens: parametrosApiResultado,
    } = await ParametroApi.buscaDinamicaDeParametros({
      query: [
        {
          field: 'nome',
          operator: 'icontains',
          value: 'TAXA',
        },
      ],
    });

    try {
      taxaChequeEspecial = buscarParametroSistema(
        'TAXA_CHEQUE_ESPECIAL_MES',
        parametrosApiResultado,
      );
    } catch (e) {
      console.info('TAXA_CHEQUE_ESPECIAL_MES não foi encontradada');
    }

    try {
      taxaCartaoCredito = buscarParametroSistema(
        'TAXA_CARTAO_CREDITO_MES',
        parametrosApiResultado,
      );
    } catch (e) {
      console.info('TAXA_CARTAO_CREDITO_MES não foi encontradada');
    }

    try {
      taxaCreditoExpress = buscarParametroSistema(
        'TAXA_CREDITO_EXPRESS_MES',
        parametrosApiResultado,
      );
    } catch (e) {
      console.info('TAXA_CREDITO_EXPRESS_MES não foi encontradada');
    }
  } catch (e) {
    console.info('Nenhum parametro com padrão TAXA encontrado.');
  }

  return {
    taxaChequeEspecial,
    taxaCartaoCredito,
    taxaCreditoExpress,
  };
}
