import React from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import TimerOferta from './TimerOferta';

const DetalhesContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  justify-content: center;
  white-space: break-spaces;
  padding-left: 20%;

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

  p {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

export default function DetalhesDesktop({ taxaJuros, dataExpiracao }) {
  const {
    tema: { nomeOrganizacao, artigoDefinido },
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { titulo, subtitulo1 } = getTextoOrganizacao();

  return (
    <DetalhesContainer item container>
      <Grid item container direction="column" justify="center">
        <h1>{titulo}</h1>
        <h4>{subtitulo1}</h4>
        {taxaJuros > 0 && (
          <p>
            Com {artigoDefinido} {nomeOrganizacao}, você consegue taxas a partir
            de <strong>{(taxaJuros * 100).toFixed(2)}% ao mês</strong> para seu
            crédito
          </p>
        )}
        <TimerOferta dataExpiracao={dataExpiracao} />
      </Grid>
    </DetalhesContainer>
  );
}

DetalhesDesktop.propTypes = {
  taxaJuros: PropTypes.number.isRequired,
};
