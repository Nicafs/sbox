import React from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';
import Box from 'components/MaterialUI/Box';
import Grid from 'components/MaterialUI/Grid';

import {
  BotaoDeAcao,
  GridContainerStyled,
  TypographyValorStyled,
  TypographyQtdStyled,
} from './style';

export default function FooterMobile({
  valor,
  qtd,
  handleNext,
  textoBotaoFooter = 'CONCLUIR',
  botaoDisabled = true,
}) {
  return (
    <Box boxShadow={10} onClick={handleNext}>
      <GridContainerStyled container>
        <Grid item xs={7}>
          <Box p={1}>
            <Grid container direction="column">
              <Grid item>
                <TypographyValorStyled>
                  R$ {moneyMask(valor)}
                </TypographyValorStyled>
              </Grid>
              <Grid item>
                <TypographyQtdStyled>
                  em {qtd} investimento{qtd > 1 && 's'}
                </TypographyQtdStyled>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <BotaoDeAcao botaoDisabled={botaoDisabled}>
            {textoBotaoFooter}
          </BotaoDeAcao>
        </Grid>
      </GridContainerStyled>
    </Box>
  );
}
