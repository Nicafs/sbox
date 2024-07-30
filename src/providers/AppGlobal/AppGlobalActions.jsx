import LogoBranca from 'assets/images/logo_alfa.svg';
import SimboloBranco from 'assets/images/logo_branca.svg';
import LogoVerde from 'assets/images/logo_green.svg';
import SimboloVerde from 'assets/images/logo_verde.svg';
import TipoLogo from 'commons/enums/TipoLogo';
import Organizacao from 'commons/resources/organizacao';
import temaCreditoExpress from 'commons/temaCreditoExpress';
import { getOrganizacaoDaUrl } from 'routes/push';

import { createMuiTheme } from '@material-ui/core/styles';

import { getOrganizacaoWhitelabel } from '~/commons/utils';

import globalTypes from './AppGlobalTypes';

export const temaInicial = {
  idOrganizacao: '',
  artigoDefinido: 'a',
  nomeOrganizacao: 'Crédito Express',
  corIcone: 'VERDE',
  codigoUltimoTema: '',
  muiTheme: temaCreditoExpress,
  temaPadrao: true,
  logoUnica: true,
  loaded: false,
};

const textoInicial = () => {
  const { titulo, subtitulo1, subtitulo2, mobile } = getOrganizacaoWhitelabel();
  return { titulo, subtitulo1, subtitulo2, mobile };
};

export default function gerarActions(dispatch, state) {
  const carregarTema = async organizacao => {
    let tipoFluxo = organizacao?.tipoFluxoEp
      ? organizacao?.tipoFluxoEp
      : organizacao?.tipoFluxoEcp;

    const dispatchNovoTema = (novoTema, blipClient = undefined) =>
      dispatch({
        type: globalTypes.MUDAR_TEMA,
        payload: {
          organizacao,
          tipoFluxo,
          novoTema,
          ...(blipClient && { blipClient }),
          textoOrganizacao:
            organizacao.textoOrganizacao || textoInicial(tipoFluxo),
        },
      });

    const organizacaoValida = organizacao && Object.keys(organizacao).length;
    const codigo = organizacaoValida
      ? organizacao.codigoAcesso
      : getOrganizacaoDaUrl();

    if (!codigo) {
      dispatchNovoTema({ ...temaInicial, loaded: true });
      return {
        tema: { ...temaInicial, loaded: true },
      };
    }

    if (!tipoFluxo && codigo === 'bancosemear') {
      tipoFluxo = 'BANCO_SEMEAR';
    }

    try {
      const dadosOrganizacao = await (async () =>
        organizacaoValida
          ? organizacao
          : Organizacao.getTemaPorCodigo(codigo))();

      if (!organizacao || Object.keys(organizacao).length === 0) {
        organizacao = dadosOrganizacao;
        if (codigo === 'bancosemear') {
          organizacao.tipoFluxoEp = 'BANCO_SEMEAR';
        }
      }

      const {
        nome: nomeOrganizacao,
        artigoDefinido,
        tema: temaOrganizacao,
        temaPadrao,
        corIcone,
        id: idOrganizacao,
        logoUnica,
      } = dadosOrganizacao;

      if (temaPadrao) {
        dispatchNovoTema({ ...temaInicial, loaded: true });
        return {
          tema: { ...temaInicial, loaded: true },
        };
      }

      const palette = JSON.parse(temaOrganizacao);
      const muiTheme = createMuiTheme({ palette });

      const temaNovo = {
        idOrganizacao,
        artigoDefinido,
        nomeOrganizacao,
        corIcone,
        codigoUltimoTema: codigo,
        muiTheme,
        temaPadrao,
        logoUnica,
        loaded: true,
      };

      dispatchNovoTema(temaNovo);

      return {
        tema: temaNovo,
      };
    } catch (e) {
      console.error(e);

      dispatchNovoTema(temaInicial);

      return {
        tema: {
          ...temaInicial,
          loaded: true,
          codigoUltimoTema: codigo,
        },
      };
    }
  };

  const exibirAlerta = (
    mensagem = 'Erro',
    tipo = 'error',
    duracao,
    position,
    onOpen,
    onClose,
    closeButton,
  ) => {
    dispatch({
      type: globalTypes.EXIBIR_ALERTA,
      payload: {
        mensagem,
        autoClose: duracao,
        variant: tipo,
        duracao,
        position,
        onOpen,
        onClose: onClose || (() => fecharAlerta()),
        closeButton,
      },
    });
  };

  const fecharAlerta = () => {
    dispatch({
      type: globalTypes.FECHAR_ALERTA,
      payload: {},
    });
  };

  const exibirNotificacao = (
    titulo,
    mensagem,
    acao = null,
    handleClose = () => {},
  ) => {
    const newHandleClose = () => {
      handleClose();
      dispatch({ type: globalTypes.FECHAR_NOTIFICACAO });
    };

    dispatch({
      type: globalTypes.EXIBIR_NOTIFICACAO,
      payload: { titulo, mensagem, acao, handleClose: newHandleClose },
    });
  };

  const exibirPWA = prompt => {
    dispatch({
      type: globalTypes.EXIBIR_PWA,
      payload: { prompt },
    });
  };

  const fecharPWA = () => {
    dispatch({
      type: globalTypes.FECHAR_PWA,
    });
  };

  const resgatarSessao = user => {
    dispatch({
      type: globalTypes.REGATAR_SESSAO,
      payload: { user },
    });
  };

  const getIcone = (nomeImagem, extensao = 'svg') => {
    const { tema } = state;

    try {
      const icon = `https://storage.googleapis.com/creditoexpress-icones/${tema.corIcone}/${nomeImagem}.${extensao}`;

      // dispatch({
      //   type: globalTypes.GET_ICONE,
      //   payload: {
      //     nomeImagem,
      //     extensao,
      //     source: icon
      //   },
      // });

      return icon;
    } catch (e) {
      console.error('Logo da organização não foi encontrada - error:', e);
    }
  };

  const getLogo = (tipoLogo = TipoLogo.LOGO_PADRAO_COLORIDA) => {
    const getLogoPadrao = tipo => {
      switch (tipo) {
        case TipoLogo.LOGO_PADRAO_COLORIDA:
          return LogoVerde;
        case TipoLogo.LOGO_MONOCROMATICA:
          return LogoBranca;
        case TipoLogo.BRASAO_COLORIDO:
          return SimboloVerde;
        case TipoLogo.BRASAO_MONOCROMATICO:
          return SimboloBranco;
        case TipoLogo.FAVICON:
          return SimboloVerde;
        default:
          return LogoBranca;
      }
    };

    const { tema } = state;

    const { temaPadrao, idOrganizacao, logoUnica } = tema;
    let logo;

    // const findLogo = logos.find(l => l.idOrganizacao === idOrganizacao && l.tipoLogo === tipoLogo);

    // if (findLogo?.logo) {
    //   return findLogo.logo;
    // }

    if (temaPadrao || !idOrganizacao) {
      logo = getLogoPadrao(tipoLogo);
    } else {
      const filename = logoUnica ? TipoLogo.LOGO_PADRAO_COLORIDA : tipoLogo;
      const filepath = encodeURIComponent(`/${idOrganizacao}/${filename}`);
      logo = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/organizacao${filepath}?alt=media`;
    }

    // dispatch({
    //   type: globalTypes.GET_LOGO,
    //   payload: {logo, tipoLogo, idOrganizacao},
    // });

    return logo;
  };

  const getTextoOrganizacao = () => {
    const { textoOrganizacao } = state;

    return textoOrganizacao;
  };

  return {
    carregarTema,
    exibirAlerta,
    fecharAlerta,
    exibirNotificacao,
    exibirPWA,
    fecharPWA,
    resgatarSessao,
    getIcone,
    getLogo,
    getTextoOrganizacao,
  };
}
