import React from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';

import ContadorDeInvestimentos from './ContadorDeInvestimentos';
import {
  TypographyLegendaStyled,
  TypographyValorStyled,
  GridItemStyled,
  GridInvestimentosInfo,
  BotaoConcluirStyled,
} from './style';

export default function InvestimentoInfo({
  qtdInvestimentos,
  valorTotal,
  rentabilidadeValor,
  textoAcao,
  botaoAvancarDisabled,
}) {
  const renderDesktop = () => (
    <GridInvestimentosInfo name="investimento-info" container>
      <GridItemStyled item>
        <ContadorDeInvestimentos qtdInvestimentos={qtdInvestimentos} />
      </GridItemStyled>
      <GridItemStyled item>
        <Grid container direction="column">
          <Grid item>
            <TypographyLegendaStyled color="textSecondary">
              Valor total
            </TypographyLegendaStyled>
          </Grid>
          <Grid item>
            <TypographyValorStyled name="total">
              R$ {moneyMask(valorTotal)}
            </TypographyValorStyled>
          </Grid>
        </Grid>
      </GridItemStyled>
      <GridItemStyled item>
        <Grid container direction="column">
          <Grid item>
            <TypographyLegendaStyled color="textSecondary">
              Rentabilidade (ao mês)
            </TypographyLegendaStyled>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <TypographyValorStyled name="rentabilidade">
                  R$ {moneyMask(rentabilidadeValor)}
                </TypographyValorStyled>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GridItemStyled>
      {qtdInvestimentos && qtdInvestimentos > 0 && (
        <Grid item>
          <BotaoConcluirStyled rounded primary disabled={botaoAvancarDisabled}>
            {textoAcao}
          </BotaoConcluirStyled>
        </Grid>
      )}
    </GridInvestimentosInfo>
  );

  const renderMobile = () => (
    <GridInvestimentosInfo container>
      <GridItemStyled item>
        <ContadorDeInvestimentos qtdInvestimentos={qtdInvestimentos} />
      </GridItemStyled>
    </GridInvestimentosInfo>
  );

  return (
    <>
      <Hidden smDown>{renderDesktop()}</Hidden>
      <Hidden mdUp>{renderMobile()}</Hidden>
    </>
  );
}
