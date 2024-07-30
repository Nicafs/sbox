import React from 'react';

import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';

import { HeaderGridContainer, ArrowBackIconStyled } from './style';

export default function BotaoVoltarFluxoInvestimento({ handleBack }) {
  return (
    <HeaderGridContainer container alignItems="center" justify="center">
      <Grid item>
        <Button name="steper-botao-voltar" rounded="true" onClick={handleBack}>
          <ArrowBackIconStyled />
        </Button>
      </Grid>
    </HeaderGridContainer>
  );
}
