import { temaInicial } from './AppGlobalActions';
import globalTypes from './AppGlobalTypes';

const initialState = {
  tema: temaInicial,
  user: {
    loginError: false,
    possuiSenhaCadastrada: false,
    precisaValidarNomeMae: false,
    erroAoValidarNomeMae: false,
  },
  loadingApp: true,
  loading: false,
  alerta: {},
  notificacao: {},
  browserRegistrado: false,
  promptPWA: () => {},
  precisaAceitarTermo: false,
  logos: [],
  icones: [],
};

const dispatchMiddlewareErrorHandlerFactory = dispatch => exception => {
  console.error(
    'Tratando exception (dispatchMiddlewareErrorHandler): ',
    exception,
  );

  let mensagem = exception.erro;

  if (exception.status === 403) {
    mensagem = 'Acesso Negado.';
  } else if (exception.status === 500) {
    mensagem = 'Houve um problema, tente novamente mais tarde.';
  }

  return dispatch({
    type: globalTypes.EXIBIR_ALERTA,
    payload: { mensagem, duracao: 6000, tipo: 'error', loading: false },
  });
};

function dispatchMiddleware(dispatch) {
  return async action => {
    const { type, payload } = action;

    if (type !== globalTypes.GET_ICONE && type !== globalTypes.GET_LOGO) {
      try {
        dispatch({ type: globalTypes.LOADING });
      } catch (e) {
        const errorHandler = dispatchMiddlewareErrorHandlerFactory(dispatch);
        return errorHandler(e);
      }
    }

    dispatch({ type, payload });
  };
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case globalTypes.APP_LOADED:
      return { ...state, ...payload, loadingApp: false };

    case globalTypes.LOADING:
      return { ...state, loading: true };

    case globalTypes.UPDATE_PADRAO:
      return { ...state, loading: false, ...payload };

    case globalTypes.EXIBIR_ALERTA:
      return {
        ...state,
        alerta: { ...payload, horario: new Date() },
        loading: false,
      };

    case globalTypes.FECHAR_ALERTA:
      return { ...state, alerta: {}, loading: false };

    case globalTypes.EXIBIR_NOTIFICACAO:
      return {
        ...state,
        notificacao: { ...payload },
        loading: false,
      };

    case globalTypes.FECHAR_NOTIFICACAO:
      return { ...state, notificacao: {}, loading: false };

    case globalTypes.EXIBIR_PWA:
      return { ...state, pwaPrompt: { ...payload }, loading: false };

    case globalTypes.FECHAR_PWA:
      return { ...state, pwaPrompt: undefined, loading: false };

    case globalTypes.MUDAR_TEMA:
      const {
        organizacao,
        novoTema,
        textoOrganizacao,
        tipoFluxo,
        blipClient,
      } = payload;
      return {
        ...state,
        loading: false,
        organizacao,
        tema: novoTema,
        textoOrganizacao,
        tipoFluxo,
        ...(blipClient && { blipClient }),
      };

    case globalTypes.SET_TEXTO_ORGANIZACAO:
      return {
        ...state,
        loading: false,
        textoOrganizacao: payload.textoOrganizacao,
      };

    case globalTypes.GET_ICONE:
      return { ...state, lastIcon: payload };

    case globalTypes.GET_LOGO:
      return {
        ...state,
        logos: state.logos
          ? state.logos.concat({ ...payload })
          : [{ ...payload }],
      };

    default:
      return state;
  }
};

export { reducer, dispatchMiddleware, initialState };
