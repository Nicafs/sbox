import React from 'react';

import Box from 'components/MaterialUI/Box';
import Divider from 'components/MaterialUI/Divider';
import Grid from 'components/MaterialUI/Grid';
import IconButton from 'components/MaterialUI/IconButton';

import {
  HeaderGridContainer,
  TituloTypographyStyled,
  ArrowBackIconStyled,
} from './style';

export default function TomadorTituloBox({ handleBack, titulo }) {
  return (
    <>
      <HeaderGridContainer
        container
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <IconButton onClick={handleBack}>
            <ArrowBackIconStyled />
          </IconButton>
        </Grid>
        <Grid item>
          <TituloTypographyStyled variant="h2" color="primary">
            {titulo}
          </TituloTypographyStyled>
        </Grid>
        <Grid item />
      </HeaderGridContainer>
      <Box mt={2} mb={2}>
        <Divider light />
      </Box>
    </>
  );
}
