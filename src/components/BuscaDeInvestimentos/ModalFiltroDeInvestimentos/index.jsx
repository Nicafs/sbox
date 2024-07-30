import React from 'react';

import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';

import FiltroDeInvestimentos from '../FiltroDeInvestimentos';

// import { Container } from './styles';

export default function ModalFiltroDeInvestimentos({
  visivel,
  dismissHandler,
  onFiltroChange,
  filtrosDisponiveis,
}) {
  return (
    <Modal
      titulo="Oportunidades"
      open={visivel}
      dismissHandler={() => dismissHandler(false)}
      maxWidth="sm"
    >
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <FiltroDeInvestimentos
            onFiltroChange={onFiltroChange}
            filtrosDisponiveis={filtrosDisponiveis}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            primary
            rounded
            fullWidth
            onClick={() => dismissHandler(false)}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
