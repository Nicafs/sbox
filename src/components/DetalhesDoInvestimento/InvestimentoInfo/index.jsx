import React from 'react';

import { moneyMask, percentMask } from 'commons/utils/MaskHandle';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';

import CustomDivider from './CustomDivider';
import {
  TypographyTabelaStyled,
  TypographyValorParcelaStyled,
  TypographyBlackStyled,
} from './style';

export default function InvestimentoInfo({
  valorParcela,
  valorLucro,
  valorInvestimento,
  qtdParcelas,
  diaPagamento,
  taxaRentabilidade,
}) {
  const infos = [
    {
      key: 'valor-investido',
      texto: 'Você investe:',
      valor: `R$ ${moneyMask(valorInvestimento)}`,
    },
    {
      key: 'rendimento',
      texto: 'Rendimento:',
      valor: `${percentMask(taxaRentabilidade)}% ao mês`,
    },
    {
      key: 'valor-total',
      texto: 'Você recebe no total:',
      valor: `R$ ${moneyMask(valorInvestimento + valorLucro)}`,
    },
    {
      key: 'parcelas',
      texto: 'Parcelas:',
      valor: `${qtdParcelas}x de R$ ${moneyMask(valorParcela)}`,
    },
    {
      key: 'dia-pagamento',
      texto: 'Dia do pagamento:',
      valor: `${diaPagamento.toString().padStart(2, '0')} de cada mês`,
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TypographyBlackStyled variant="body1" gutterBottom>
          Com esse investimento você lucra:
        </TypographyBlackStyled>
        <Typography variant="overline" gutterBottom>
          R$
          <TypographyValorParcelaStyled
            variant="h2"
            display="inline"
            style={{ marginLeft: 5 }}
          >
            {`${moneyMask(valorLucro)}`}
          </TypographyValorParcelaStyled>
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Em {qtdParcelas} meses
        </Typography>
      </Grid>
      {/* <Box mt={3}>&nbsp;</Box> */}
      {infos.map(({ key, texto, valor }) => (
        <Grid name={key} key={texto} item xs={12} container alignItems="center">
          <Grid item>
            <TypographyTabelaStyled color="textSecondary">
              {texto}
            </TypographyTabelaStyled>
          </Grid>
          <Grid
            item
            style={{
              flex: 1,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 8,
            }}
          >
            <CustomDivider />
          </Grid>
          <Grid item>
            <TypographyTabelaStyled color="textSecondary">
              {valor}
            </TypographyTabelaStyled>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
