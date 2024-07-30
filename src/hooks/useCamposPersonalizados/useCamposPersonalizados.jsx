import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { gerarJsxCamposAdicionais } from '../../commons/utils/camposPersonalizadosUtil';
import { filtrarConfigCamposAdicionais } from './filtros';
import { getFormikEstadoInicial } from './formik';
import { montarSchema } from './yupFns';

const useCamposPersonalizados = ({
  camposPersonalizados: {
    configCamposPadroes,
    configCamposAdicionais,
    valoresCamposPersonalizados,
  },
  yupSchemaPadrao = [],
  precisaValidarObrigatoriedadeFn = () => {},
  formikHookConfig = {
    onSubmit: () => {},
  },
}) => {
  const yupSchema = montarSchema({
    configCamposPadroes,
    configCamposAdicionais,
    schemaPadrao: yupSchemaPadrao,
    precisaValidarObrigatoriedadeFn,
  });
  const formikConfig = {
    initialValues: getFormikEstadoInicial({
      configCamposAdicionais,
      valoresCamposPersonalizados,
    }),
    validationSchema: yupSchema,
    ...formikHookConfig,
  };

  const formik = useFormik(formikConfig);
  const renderInputs = [];

  configCamposAdicionais.map(configCampo => {
    const configCamposAdicionaisFiltrados = filtrarConfigCamposAdicionais(
      configCampo,
    );

    renderInputs.push(() =>
      gerarJsxCamposAdicionais(configCamposAdicionaisFiltrados, formik),
    );

    return null;
  });

  return {
    formik,
    renderInputs,
  };
};

useCamposPersonalizados.propTypes = {
  camposPersonalizados: PropTypes.shape({
    configCamposPadroes: PropTypes.arrayOf(
      PropTypes.shape({
        nome: PropTypes.string,
        obrigatorio: PropTypes.bool,
        disponivel: PropTypes.bool,
        de_para: PropTypes.shape({}),
      }),
    ),
    configCamposAdicionais: PropTypes.arrayOf(
      PropTypes.shape({
        nome: PropTypes.string,
        tipo: PropTypes.string,
        titulo: PropTypes.string,
        placeholder: PropTypes.string,
        mensagem_validacao: PropTypes.string,
        tamanho: PropTypes.string,
        obrigatorio: PropTypes.bool,
        posicao: PropTypes.number,
        lista_id_personalizado: PropTypes.bool,
        lista_valores: PropTypes.shape({}),
        api_url: PropTypes.string,
        api_chave: PropTypes.string,
        api_valor: PropTypes.string,
      }),
    ),
    valoresCamposPersonalizados: PropTypes.shape({}),
  }),
  precisaValidarObrigatoriedadeFn: PropTypes.func, // Função que recebe o nome do campo e retorna se o mesmo deve ser obrigatório ou não
  formikHookConfig: PropTypes.shape({
    onSubmit: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    initialValues: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    validationSchema: PropTypes.object,
  }),
  yupSchemaPadrao: PropTypes.shape({}), // Exemplo: { idade: [ Yup.number(), 'O campo idade é obrigatório' ] }
};

export default useCamposPersonalizados;
