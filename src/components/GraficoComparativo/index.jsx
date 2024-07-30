import React from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';

import {
  Bar,
  GraficoItem,
  TypographyTitulo1Styled,
  TypographyValor1Styled,
  TypographyNomeStyled,
  TypographyTextoStyled,
  TypographyValor2Styled,
  FooterContainer,
} from './style';

export default function GraficoComparativo({ dadosComparativos }) {
  return (
    <Grid
      container
      justify="space-around"
      alignItems="flex-end"
      spacing={1}
      name="grafico"
    >
      {dadosComparativos.map(dadoComparativo => {
        const {
          tipo,
          titulo1,
          valor1,
          nome,
          texto,
          valor2,
          size,
          destaque,
        } = dadoComparativo;
        return (
          <Grid name={tipo} key={titulo1 + nome + texto} item xs={4} md={2}>
            <GraficoItem container direction="column" spacing={1}>
              <Grid item>
                <TypographyTitulo1Styled color="textSecondary">
                  {titulo1}
                </TypographyTitulo1Styled>
              </Grid>
              <Grid item>
                <TypographyValor1Styled
                  color="textSecondary"
                  destaque={destaque}
                  name="rendimento"
                >
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginRight: 4 }}
                  >
                    R$
                  </Typography>
                  {moneyMask(valor1)}
                </TypographyValor1Styled>
              </Grid>
              <Grid item>
                <Bar destaque={destaque} size={size} />
              </Grid>
              <FooterContainer>
                <Grid item>
                  <TypographyNomeStyled>{nome}</TypographyNomeStyled>
                </Grid>
                <Grid item>
                  <TypographyTextoStyled color="textSecondary">
                    {texto}
                  </TypographyTextoStyled>
                </Grid>
                <Grid item>
                  <TypographyValor2Styled
                    color="textSecondary"
                    destaque={destaque}
                    name="total-receber"
                  >
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      style={{ marginRight: 4 }}
                    >
                      R$
                    </Typography>
                    {moneyMask(valor2)}
                  </TypographyValor2Styled>
                </Grid>
              </FooterContainer>
            </GraficoItem>
          </Grid>
        );
      })}
    </Grid>
  );
}
