import moment from 'moment';

export const DATETIME_FORMATO_PADRAO = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMATO_PADRAO = 'YYYY-MM-DD';
const regexEhSomenteData = /^\d{4}-\d{2}-\d{2}$/;

/** transformarDataParaApi: Realiza a tratativa de um objeto data para ser enviado via API como UTC
 *  @param dataObj Date
 *  @param formato String
 *  @return String
 * * */
export const transformarDataLocalParaApi = (
  dataObj,
  formato = DATETIME_FORMATO_PADRAO,
) => {
  if (!dataObj) {
    console.warn(
      'transformarDataLocalParaApi: Não foi possível transformar a data informada',
      {
        dataObj,
        formato,
      },
    );
    return dataObj;
  }

  const ehSomenteData = formato === DATE_FORMATO_PADRAO;
  if (ehSomenteData) {
    /** Quando precisamos enviar uma data sem time para o backend, não é aplicado a transformação UTC, apenas a formatação * */
    return moment(dataObj).format(formato);
  }

  return moment(dataObj).utc().format(formato);
};

/** transformarDataApiParaLocal: Realiza a tratativa de uma data em UTC para objeto Moment com timezone local
 *  @param dataStr String
 *  @param formato String
 *  @return moment.Moment
 * * */
export const transformarDataApiParaDataLocal = (
  dataStr,
  formato = DATETIME_FORMATO_PADRAO,
) => {
  if (!dataStr) {
    console.warn(
      'transformarDataApiParaDataLocal: Não foi possível transformar a data informada',
      {
        dataStr,
        formato,
      },
    );
    return dataStr;
  }

  const ehSomenteData = regexEhSomenteData.test(dataStr);
  if (ehSomenteData) {
    /** Quando é retornado uma data sem time do backend, não é aplicado transformação UTC, apenas formatação para exibição * */
    return moment(dataStr, formato).local();
  }

  // console.log('COM UTC');
  return moment.utc(dataStr, formato).local();
};
