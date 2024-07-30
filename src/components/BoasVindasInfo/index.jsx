import React from 'react';

import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import { useAppGlobal } from 'providers/AppGlobal';

import { TituloStyled, NomeClienteStyled, GridContainerStyled } from './style';
import VantagensInvestimentoCreditoExpress from './VantagensInvestimentoCreditoExpress';

// import { Container } from './styles';

export default function BoasVindasInfo({
  nome,
  emailVerificado,
  telefoneVerificado,
  verificarPerfil,
  continuarHandler,
}) {
  const {
    tema: { nomeOrganizacao, artigoDefinido },
  } = useAppGlobal();
  return (
    <GridContainerStyled container spacing={4}>
      <Grid item xs={12}>
        <NomeClienteStyled color="textPrimary" variant="h4" gutterBottom>
          Olá {nome}
        </NomeClienteStyled>
        <TituloStyled color="primary" variant="h5" gutterBottom>
          Bem-vindo {artigoDefinido === 'a' ? artigoDefinido : 'ao'}{' '}
          {nomeOrganizacao}
        </TituloStyled>
        <Typography color="textSecondary" variant="h6" gutterBottom>
          N{artigoDefinido} {nomeOrganizacao} você investe seu dinheiro e
          impulsiona pessoas, com rendimentos acima dos meios tradicionais.{' '}
          <br />
          Uma forma inteligente de rentabilizar seu dinheiro, conectando você
          diretamente ao tomador de emrpéstimo.
        </Typography>
      </Grid>
      <Grid item xs={12} container>
        <Typography color="textPrimary" variant="h6" gutterBottom>
          Conheça os benefícios d{artigoDefinido} {nomeOrganizacao}
        </Typography>
        <VantagensInvestimentoCreditoExpress />
      </Grid>
      <Grid item xs={12} container justify="flex-end">
        {emailVerificado && telefoneVerificado ? (
          <>
            <Grid item xs={12} md={2}>
              <Button
                onClick={continuarHandler}
                name="botaoQueroInvestir"
                rounded
                primary
                fullWidth
              >
                Quero investir
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Grid item>
                <Button rounded="true" primary onClick={verificarPerfil}>
                  Continuar
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </GridContainerStyled>
  );
}
