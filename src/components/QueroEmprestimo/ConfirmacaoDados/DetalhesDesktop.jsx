import React from 'react';

import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

const DetalhesContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  justify-content: center;
  white-space: break-spaces;
  padding-left: 10%;

  h1 {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 4em;
    font-weight: bold;
  }

  h4 {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 2em;
    font-weight: lighter;
  }
`;

export default function DetalhesDesktop() {
  const {
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { titulo, subtitulo1 } = getTextoOrganizacao();
  return (
    <DetalhesContainer item container xs={6}>
      <Grid item container direction="column" justify="center">
        <h1>{titulo}</h1>
        <h4>{subtitulo1}</h4>
      </Grid>
    </DetalhesContainer>
  );
}
