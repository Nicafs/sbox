import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LoaderCircular from '../LoaderCircular';
import Modal from '../Modal';

const Loader = () => (
  <Modal open>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <LoaderCircular />
      </Grid>
      <Grid item>
        <Typography color="textSecondary">Analisando termos...</Typography>
      </Grid>
    </Grid>
  </Modal>
);

export default Loader;
