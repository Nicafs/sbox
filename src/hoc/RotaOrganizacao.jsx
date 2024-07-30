import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, useLocation } from 'react-router';

import { useAppGlobal } from 'providers/AppGlobal';

import { useCreditoExpress, useAuth } from '@credito-express/ce-components';

import TipoLogo from '../commons/enums/TipoLogo';
import VerificaAceiteTermosDeUso from '../components/VerificaAceiteTermosDeUso';
import InstitucionalContainer from '../containers/Institucional';
import pushRota, { getOrganizacaoQueryParam } from '../routes/push';
// import firebaseJson from './firebase.json';

export default function RotaOrganizacao({ children, publica = false }) {
  const {
    tema: { loaded: temaCarregado, nomeOrganizacao },
    actions: { carregarTema, getLogo },
  } = useAppGlobal();

  const {
    state: { usuarioFirebase, necessarioAceitarTermos, organizacao },
    dispatch,
  } = useCreditoExpress();

  const {
    buscarPessoa: buscarPessoaAceiteTermo,
    pessoa: pessoaAceiteTermo,
    organizacao: organizacaoAceiteTermo,
  } = useAuth({});

  const location = useLocation();

  const usuarioEstaLogado = usuarioFirebase && usuarioFirebase.email;

  useEffect(() => {
    carregarTema(organizacao);

    if (Object.keys(organizacao).length) {
      const { nome, id } = organizacao;
      const data = { nome, id };
      const dataStr = JSON.stringify(data);
      localStorage.setItem('organizacao', dataStr);
    }
  }, [organizacao]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pessoaAceiteTermo) {
      dispatch({
        type: 'ATUALIZAR_DADOS_AUTENTICACAO',
        payload: {
          pessoa: pessoaAceiteTermo,
          organizacao: organizacaoAceiteTermo,
          necessarioAceitarTermos: false,
        },
      });
    }
  }, [pessoaAceiteTermo]); // eslint-disable-line react-hooks/exhaustive-deps

  /* const getMetaByOrganizacao = () => {
    const { hosting } = firebaseJson;
    const env = process.env.REACT_APP_ENV;
    const { codigoAcesso } = organizacao || {};
    const actualHosting = hosting.find(h => {
      return h.target === `${`${codigoAcesso || ''}-`}${env}`;
    });

    if (actualHosting && actualHosting.headers) {
      const headerTags = actualHosting.headers.find(a => {
        return a.source === '**';
      });

      if (headerTags && headerTags.headers) {
        const metaTags = headerTags.headers.map(a => {
          if (
            a.key === 'content-security-policy' ||
            a.key === 'content-type' ||
            a.key === 'default-style' ||
            a.key === 'refresh'
          ) {
            return <meta key={a.key} httpEquiv={a.key} content={a.value} />;
          }

          return <meta key={a.key} name={a.key} content={a.value} />;
        });

        return metaTags;
      }
    }
  }; */

  if (necessarioAceitarTermos) {
    return (
      <>
        <InstitucionalContainer />
        <VerificaAceiteTermosDeUso
          btnAceitoClickHandler={buscarPessoaAceiteTermo}
        />
      </>
    );
  }

  if (!publica) {
    if (!usuarioEstaLogado) {
      return <Redirect to={`/auth${getOrganizacaoQueryParam()}`} />;
    }
    const { from } = location.state || '';
    if (from) {
      pushRota(from);
    }
  }

  if (temaCarregado) {
    return (
      <>
        <Helmet>
          <meta
            name="description"
            content="Uma plataforma que conecta você ao seu sonho. Contrate seu empréstimo de forma 100% digital e segura."
          />
          <meta
            name="keywords"
            content={`${nomeOrganizacao}, emprestimo, financeiro, consignado, emprestimo pessoal, emprestimo digital, emprestimo online, emprestimo seguro`}
          />
          {/* {organizacao && organizacao.codigoAcesso && getMetaByOrganizacao()} */}
          <link rel="shortcut icon" href={getLogo(TipoLogo.FAVICON)} />
          <title>{nomeOrganizacao}</title>
        </Helmet>
        {children}
      </>
    );
  }

  return null;
}
