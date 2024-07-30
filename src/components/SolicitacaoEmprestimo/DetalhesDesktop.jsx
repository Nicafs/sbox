import React from 'react';

import { nomeMask } from 'commons/utils/MaskHandle';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

const DetalhesContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.black};
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

  p {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 1.5em;
    font-weight: lighter;
  }
`;

export default function DetalhesDesktop({ taxaJuros, organizacao }) {
  const { nome: nomeOrganizacao } = organizacao;
  const {
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { titulo, subtitulo1 } = getTextoOrganizacao();

  return (
    <DetalhesContainer item container xs={6}>
      <Grid
        item
        container
        direction="column"
        justify="center"
        style={{ height: ' 100vh' }}
      >
        <h1>{titulo}</h1>
        <h4>{subtitulo1}</h4>
        <p>
          Com {nomeMask(nomeOrganizacao)}, você consegue taxas a partir de{' '}
          <strong>{(taxaJuros * 100).toFixed(2)} % ao mês</strong>
          &nbsp;para seu crédito
        </p>
      </Grid>
    </DetalhesContainer>
  );
}

/* eslint-disable react/forbid-prop-types */
DetalhesDesktop.propTypes = {
  organizacao: PropTypes.object.isRequired,
  taxaJuros: PropTypes.number.isRequired,
};
