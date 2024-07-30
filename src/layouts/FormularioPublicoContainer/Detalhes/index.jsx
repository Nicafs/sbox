import React from 'react';

import Grid from 'components/MaterialUI/Grid';
import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

const DetalhesContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  white-space: break-spaces;
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

export default function Detalhes() {
  const {
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { titulo, subtitulo1 } = getTextoOrganizacao();

  return (
    <DetalhesContainer item container>
      <Grid item container direction="column" justify="center">
        <h1>{titulo}</h1>
        <h4>{subtitulo1}</h4>
      </Grid>
    </DetalhesContainer>
  );
}

Detalhes.propTypes = {};
