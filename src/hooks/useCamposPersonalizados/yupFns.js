import {
  gerarYupCampoAdicional,
  gerarYupCampoPadrao,
} from '../../commons/utils/camposPersonalizadosUtil';
import Yup from '../../commons/Yup';

const gerarCamposPadrao = ({
  configCamposPadroes,
  schemaPadrao,
  precisaValidarObrigatoriedadeFn,
}) => {
  const dadosCamposPadroes = configCamposPadroes
    .map(campo => ({ [campo.nome]: { ...campo } }))
    .reduce((a, b) => ({ ...a, ...b }), {});
  const yupSchema = Object.keys(schemaPadrao)
    .map(key =>
      dadosCamposPadroes[key]
        ? {
            [key]: gerarYupCampoPadrao(
              dadosCamposPadroes[key],
              schemaPadrao[key][0],
              schemaPadrao[key][1],
            ),
          }
        : {
            [key]: gerarYupCampoPadrao(
              {
                obrigatorio: true,
                disponivel: true,
                validarObrigatoriedade: precisaValidarObrigatoriedadeFn(key),
              },
              schemaPadrao[key][0],
              schemaPadrao[key][1],
            ),
          },
    )
    .reduce((a, b) => ({ ...a, ...b }), {});
  return yupSchema;
};

export const montarSchema = ({
  configCamposPadroes,
  configCamposAdicionais,
  schemaPadrao,
  precisaValidarObrigatoriedadeFn,
}) => {
  const schema = Yup.object().shape({
    ...gerarCamposPadrao({
      configCamposPadroes,
      schemaPadrao,
      precisaValidarObrigatoriedadeFn,
    }),
    ...configCamposAdicionais
      .map(campo => {
        if (Array.isArray(campo)) {
          let objectReturn = {};
          campo.forEach(c => {
            const valores = gerarYupCampoAdicional(c);

            objectReturn = Object.assign(objectReturn, valores);
          });
          return objectReturn;
        }
        return gerarYupCampoAdicional(campo);
      })
      .reduce((a, b) => ({ ...a, ...b }), {}),
  });
  return schema;
};
