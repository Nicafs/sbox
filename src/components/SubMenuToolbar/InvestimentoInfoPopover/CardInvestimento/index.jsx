import React from 'react';

import { moneyMask, percentMask } from 'commons/utils/MaskHandle';
import Card from 'components/MaterialUI/Card';
import CardContent from 'components/MaterialUI/CardContent';
import Grid from 'components/MaterialUI/Grid';
import IconButton from 'components/MaterialUI/IconButton';

import {
  LogoEmpresa,
  TypographyValorStyled,
  TypographyRentabilidadeStyled,
  TypographyEmpresaStyled,
  CloseIconStyled,
  GridInfoStyled,
} from './style';

export default function CardInvestimento({
  name,
  valor,
  taxaRentabilidade,
  nomeEmpresa,
  removerInvestimentos,
  logoUrl,
}) {
  return (
    <Card elevation={2} name={name}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {logoUrl && (
            <Grid item>
              <LogoEmpresa src={logoUrl} />
            </Grid>
          )}
          <GridInfoStyled item>
            <Grid container justify="space-between">
              <Grid item>
                <TypographyValorStyled name="valor">
                  R$ {moneyMask(valor)}
                </TypographyValorStyled>
              </Grid>
              <Grid item>
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  onClick={removerInvestimentos}
                  style={{ padding: 0 }}
                >
                  <CloseIconStyled />
                </IconButton>
              </Grid>
            </Grid>
            <TypographyRentabilidadeStyled name="rentabilidade">
              {percentMask(taxaRentabilidade)}% ao mês
            </TypographyRentabilidadeStyled>
            <TypographyEmpresaStyled name="empresa" color="textSecondary">
              {nomeEmpresa}
            </TypographyEmpresaStyled>
          </GridInfoStyled>
        </Grid>
      </CardContent>
    </Card>
  );
}
