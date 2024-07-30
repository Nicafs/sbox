import React, { useEffect } from 'react';

import Grid from 'components/MaterialUI/Grid';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import pushRota from 'routes/push';

import {
  MainPaperStyled,
  NomeTypographyStyled,
  CorpoTypographyStyled,
} from './style';

export default function CadastroLeadConcluido({ nomeCliente, msgFinal }) {
  const {
    actions: { getIcone },
  } = useAppGlobal();

  useEffect(() => {
    const timer = setTimeout(() => {
      pushRota('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ width: '100%', minHeight: '100vh' }}
    >
      <Grid item xs={11} sm={8} lg={6}>
        <MainPaperStyled elevation={2}>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <img
                alt="Ícone concluído - tela agradecimento investidor"
                src={getIcone('icon-sucesso')}
              />
            </Grid>
            <Grid item xs={12}>
              <NomeTypographyStyled variant="h4">
                Olá {nomeCliente || 'cliente'}
              </NomeTypographyStyled>
            </Grid>
            <Grid item xs={12}>
              <CorpoTypographyStyled>{msgFinal}</CorpoTypographyStyled>
            </Grid>
          </Grid>
        </MainPaperStyled>
      </Grid>
    </Grid>
  );
}

CadastroLeadConcluido.propTypes = {
  nomeCliente: PropTypes.string,
  msgFinal: PropTypes.string.isRequired,
};
CadastroLeadConcluido.defaultProps = {
  nomeCliente: undefined,
};
