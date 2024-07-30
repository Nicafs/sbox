import React, { useEffect, useState } from 'react';

import CadastroContatoBlackListContainer from 'containers/CadastroContatoBlackList';

import { useFetch } from '@credito-express/ce-components';

import ENDPOINTS from '../../commons/constants/endpoints';
import { getDecodedTokenJwt } from '../../commons/utils/jwt';
import { useAppGlobal } from '../../providers/AppGlobal';

const CadastroContatoBlackList = () => {
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const [descadastradoComSucesso, setDescadastradoComSucesso] = useState(false);
  const [validandoToken, setValidandoToken] = useState(true);
  const [contato, setContato] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const [tokenJwt, setTokenJwt] = useState('');
  const [tokenJwtObj, setTokenJwtObj] = useState({});
  const [tokenEhValido, setTokenEhValido] = useState(false);
  const {
    loading: loadingApiDescadastramento,
    descricaoDoErro: erroApiDescadastramento,
    send: sendDescadastrar,
    statusCode,
  } = useFetch({
    method: ENDPOINTS.DESCADASTRAR_CONTATO.metodo,
    url: ENDPOINTS.DESCADASTRAR_CONTATO.url,
  });

  useEffect(() => {
    const { paramMd5, paramTokenJwt } = parseQueryString();
    validaQueryString(paramMd5, paramTokenJwt);
  }, []);

  useEffect(() => {
    if (tokenJwt && md5Hash) {
      validaTokenJwt(tokenJwt, md5Hash);
    }
  }, [tokenJwt, md5Hash]);

  useEffect(() => {
    parseTokenJwt(tokenJwtObj);
  }, [tokenJwtObj]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (erroApiDescadastramento) {
      exibirAlerta(erroApiDescadastramento);
    }
  }, [erroApiDescadastramento]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (statusCode === 200) {
      setDescadastradoComSucesso(true);
    }
  }, [statusCode]);

  const parseQueryString = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramMd5 = urlParams.get('md5');
    const paramTokenJwt = urlParams.get('token');
    setMd5Hash(paramMd5);
    setTokenJwt(paramTokenJwt);

    return {
      paramMd5,
      paramTokenJwt,
    };
  };

  const validaQueryString = (paramMd5, paramTokenJwt) => {
    if (!paramMd5 || !paramTokenJwt) {
      setValidandoToken(false);
      setTokenEhValido(false);
    }
  };

  const validaTokenJwt = (token, md5) => {
    setValidandoToken(true);
    const tObj = getDecodedTokenJwt(token, md5) || {};
    if (Object.keys(tObj).length) {
      setTokenJwtObj(tObj);
      setTokenEhValido(true);
    }
    setValidandoToken(false);
  };

  const parseTokenJwt = tokenObj => {
    if (Object.keys(tokenObj).length) {
      const { contato: tokenContato } = tokenJwtObj;
      setContato(tokenContato);
    }
  };

  const descadastrarContato = async () => {
    sendDescadastrar({ token: tokenJwt, md5: md5Hash });
  };

  return (
    <CadastroContatoBlackListContainer
      descadastrarContato={descadastrarContato}
      descadastradoComSucesso={descadastradoComSucesso}
      loading={validandoToken || loadingApiDescadastramento}
      contato={contato}
      md5Hash={md5Hash}
      tokenJwt={tokenJwt}
      tokenEhValido={tokenEhValido}
    />
  );
};

export default CadastroContatoBlackList;
