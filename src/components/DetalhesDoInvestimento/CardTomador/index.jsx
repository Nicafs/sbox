import React from 'react';

import { getTempoDeCarteira } from 'commons/utils';
import { moneyMask } from 'commons/utils/MaskHandle';
import Box from 'components/MaterialUI/Box';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';

import {
  CardStyled,
  GridContainer,
  EmpresaImagem,
  CidadeTypographyStyled,
  TypographyBlackStyled,
} from './style';

export default function CardTomador({
  cidade,
  dataAdmissao,
  salario,
  logoEmpresa,
  nomeEmpresa,
}) {
  const renderHeader = () => (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={4}>
          &nbsp;
        </Grid>
        <Grid
          item
          xs={4}
          style={{ background: 'white', borderRadius: 8, height: 10 }}
        >
          &nbsp;
        </Grid>
        <Grid item xs={4}>
          &nbsp;
        </Grid>
      </Grid>
    </Grid>
  );
  const renderImagens = () => (
    <Grid container spacing={2} direction="column" alignItems="center">
      {/* <Grid item>
        <TomadorImagem src={ImagemAsset} />
      </Grid> */}
      <Grid item>
        <EmpresaImagem src={logoEmpresa} />
      </Grid>
    </Grid>
  );

  return (
    <CardStyled elevation={0}>
      <GridContainer container direction="column" style={{ height: '100%' }}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {renderHeader()}
            <Grid item xs={12}>
              <Box mt={1}>
                <Typography color="textSecondary" gutterBottom align="center">
                  Detalhes sobre o solicitante
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  {logoEmpresa ? (
                    renderImagens()
                  ) : (
                    <Typography gutterBottom align="center">
                      {nomeEmpresa}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TypographyBlackStyled gutterBottom align="center">
                    Salário: {`R$ ${moneyMask(salario)}`}
                  </TypographyBlackStyled>
                </Grid>
                <Grid item xs={12}>
                  <TypographyBlackStyled gutterBottom align="center">
                    Carteira assinada: {getTempoDeCarteira(dataAdmissao)}
                  </TypographyBlackStyled>
                </Grid>
                <Grid item xs={12} container justify="center">
                  <TypographyBlackStyled
                    gutterBottom
                    align="center"
                    style={{ display: 'inline' }}
                  >
                    Residência: &nbsp;
                  </TypographyBlackStyled>
                  <CidadeTypographyStyled
                    gutterBottom
                    align="center"
                    style={{ display: 'inline' }}
                  >
                    {cidade.toLowerCase()}
                  </CidadeTypographyStyled>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
    </CardStyled>
  );
}
