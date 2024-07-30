import React from 'react';

import Box from 'components/MaterialUI/Box';
import Divider from 'components/MaterialUI/Divider';
import Grid from 'components/MaterialUI/Grid';

import { HeaderGridContainer, TituloTypographyStyled } from './style';

export default function Header() {
  return (
    <>
      <HeaderGridContainer container alignItems="center" justify="center">
        <Grid item>
          <TituloTypographyStyled variant="h5" color="textSecondary">
            Detalhes do investimento
          </TituloTypographyStyled>
        </Grid>
      </HeaderGridContainer>
      <Box mt={2} mb={2}>
        <Divider light />
      </Box>
    </>
  );
}
