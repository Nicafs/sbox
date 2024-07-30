import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useAuth, useCreditoExpress } from '@credito-express/ce-components';

import pushRota from '~/routes/push';

import NegociacaoApi from '~/commons/resources/negociacao';

import { useAppGlobal } from '~/providers/AppGlobal';

import Loading from '~/components/Loading';

export default function ContinuaEmprestimoPorQRCode() {
  const {
    recuperarPessoaEOrganizacaoPorUsuario,
    pessoa: pessoaAuth,
    organizacao: orgAuth,
    usuarioFirebase: usuarioAuth,
  } = useAuth({});

  const {
    state: { usuarioFirebase: usuario },
    dispatch,
  } = useCreditoExpress();

  const location = useLocation();

  const {
    organizacao: { tipoFluxoEcp, tipoFluxoEp },
  } = useAppGlobal();

  const configCE = tipoFluxoEcp === 'P2P' && tipoFluxoEp !== 'BANCO_SEMEAR';

  useEffect(() => {
    if (pessoaAuth) {
      dispatch({
        type: 'ATUALIZAR_DADOS_AUTENTICACAO',
        payload: {
          usuarioFirebase: usuarioAuth,
          pessoa: pessoaAuth,
          organizacao: orgAuth,
        },
      });
    } else if (usuario && Object.keys(usuario).length) {
      dispatch({
        type: 'ATUALIZAR_DADOS_AUTENTICACAO',
        payload: {
          usuarioFirebase: usuario,
        },
      });
      recuperarPessoaEOrganizacaoPorUsuario(usuario);
      buscaNegociacao();
    } else {
      pushRota(configCE ? '/auth' : '/quero-emprestimo', {
        from: location.pathname,
      });
    }
  }, [pessoaAuth, usuario]); // eslint-disable-line react-hooks/exhaustive-deps

  const buscaNegociacao = () => {
    NegociacaoApi.get({ paginaNumero: 1, paginaTamanho: 1 }).then(
      ({ itens: negociacoes }) => {
        if (negociacoes && negociacoes.length > 0) {
          const { id: idNegociacao } = negociacoes[0];
          pushRota({
            pathname: '/confirma-emprestimo',
            state: { idNegociacao, origemQrCode: true },
          });
        } else {
          pushRota({
            pathname: '/quero-emprestimo',
            state: { origemQrCode: true },
          });
        }
      },
    );
  };

  return <Loading />;
}
