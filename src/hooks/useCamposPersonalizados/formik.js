import { gerarValorInicialCampoAdicional } from '../../commons/utils/camposPersonalizadosUtil';

export const getFormikEstadoInicial = ({
  configCamposAdicionais,
  valoresCamposPersonalizados,
}) => {
  // Estado inicial de acordo com campos
  const estadoInicialInfosAdicionais = configCamposAdicionais
    .map(campo => {
      if (Array.isArray(campo)) {
        let objectReturn = {};
        campo.forEach(c => {
          const valores = gerarValorInicialCampoAdicional(
            c,
            valoresCamposPersonalizados,
          );

          objectReturn = Object.assign(objectReturn, valores);
        });
        return objectReturn;
      }

      return gerarValorInicialCampoAdicional(
        campo,
        valoresCamposPersonalizados,
      );
    })
    .reduce((a, b) => ({ ...a, ...b }), {});

  return {
    ...valoresCamposPersonalizados,
    ...estadoInicialInfosAdicionais,
  };
};
