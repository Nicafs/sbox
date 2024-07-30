import React from 'react';
import { withRouter } from 'react-router';

import { Typography } from '@material-ui/core';

import pushRota from '~/routes/push';

import { useAppGlobal } from '~/providers/AppGlobal';

import { DivRodapeStyled, LinkRodapeStyled, ButtonRodapeStyled } from './style';

const AuthRodape = ({ msg, textoBotao, handleClickButton }) => {
  const {
    organizacao: { tipoFluxoEcp, tipoFluxoEp },
  } = useAppGlobal();

  const configCE = tipoFluxoEcp === 'P2P' && tipoFluxoEp !== 'BANCO_SEMEAR';

  function handleEntrarButton() {
    pushRota(configCE ? '/auth' : '/');
  }

  const currentVersion = window.localStorage.getItem('appVersion');

  return (
    <DivRodapeStyled>
      {msg && (
        <>
          <div className="pergunta">{msg}</div>
          {handleClickButton ? (
            <ButtonRodapeStyled type="button" onClick={handleClickButton}>
              {textoBotao || 'ENTRAR'}
            </ButtonRodapeStyled>
          ) : (
            <LinkRodapeStyled href="#" onClick={handleEntrarButton}>
              {textoBotao || 'ENTRAR'}
            </LinkRodapeStyled>
          )}
        </>
      )}
      <Typography color="textSecondary" variant="subtitle1" gutterBottom>
        v{currentVersion}
      </Typography>
    </DivRodapeStyled>
  );
};

export default withRouter(AuthRodape);
