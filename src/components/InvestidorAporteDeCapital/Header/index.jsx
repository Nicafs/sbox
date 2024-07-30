import React from 'react';

import Box from '../../MaterialUI/Box';
import Divider from '../../MaterialUI/Divider';
import Grid from '../../MaterialUI/Grid';
import { TituloTypographyStyled } from './style';

export default function Header() {
  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <TituloTypographyStyled variant="h5" color="textSecondary">
            Formas de repasse do investimento
          </TituloTypographyStyled>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        <Divider light />
      </Box>
    </>
  );
}
