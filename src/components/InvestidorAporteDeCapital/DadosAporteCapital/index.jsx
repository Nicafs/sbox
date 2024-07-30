import React from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';

import Hidden from '@material-ui/core/Hidden';

import Grid from '../../MaterialUI/Grid';
import {
  TituloTypographyStyled,
  CifraoTypographyStyled,
  ValorTypographyStyled,
} from './style';

const calcularVlrTotalInvestimentos = investimentos => {
  const vlrTotalInvestimento = investimentos.reduce(
    (acc, currentValue) => acc + currentValue.valor,
    0,
  );
  return vlrTotalInvestimento;
};

const DadosAporteCapitalDesktop = ({ dadosAporte }) => {
  return (
    <Grid container justify="flex-start">
      {dadosAporte.map((da, idx) => (
        <Grid
          item
          key={`dadosAporte-num-${idx}`}
          sm={3}
          style={{ marginLeft: '30px' }}
        >
          <Grid container>
            <Grid item xs={12}>
              <TituloTypographyStyled color="textSecondary">
                {da.titulo}
              </TituloTypographyStyled>
            </Grid>
            <Grid item xs={12}>
              <CifraoTypographyStyled variant="subtitle1">
                R$
              </CifraoTypographyStyled>
              <ValorTypographyStyled variant="h4" isblack={da.isBlack}>
                {moneyMask(da.valor)}
              </ValorTypographyStyled>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const DadosAporteCapitalMobile = ({ dadosAporte }) => {
  return (
    <Grid container spacing={3}>
      {dadosAporte.map((da, idx) => (
        <Grid item key={`dadosAporte-num-${idx}`} xs={12}>
          <Grid container>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <TituloTypographyStyled color="textSecondary">
                {da.titulo}
              </TituloTypographyStyled>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CifraoTypographyStyled variant="subtitle1">
                R$
              </CifraoTypographyStyled>
              <ValorTypographyStyled variant="h4" isblack={da.isBlack}>
                {moneyMask(da.valor)}
              </ValorTypographyStyled>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default function DadosAporteCapital({ investimentos, saldoInvestidor }) {
  const vlrTotalInvestimento = calcularVlrTotalInvestimentos(investimentos);
  let vlrRestanteInvestidor = saldoInvestidor - vlrTotalInvestimento;
  if (vlrRestanteInvestidor < 0) {
    vlrRestanteInvestidor = 0;
  }

  const dadosAporte = [
    {
      titulo: 'Valor total do carrinho',
      valor: vlrTotalInvestimento,
      isBlack: 'false',
    },
    {
      titulo: 'Saldo disponível em conta',
      valor: saldoInvestidor,
      isBlack: 'true',
    },
    {
      titulo: 'Valor total restante',
      valor: vlrRestanteInvestidor,
      isBlack: 'true',
    },
  ];

  return (
    <>
      <Hidden smDown>
        <DadosAporteCapitalDesktop dadosAporte={dadosAporte} />
      </Hidden>
      <Hidden mdUp>
        <DadosAporteCapitalMobile dadosAporte={dadosAporte} />
      </Hidden>
    </>
  );
}
