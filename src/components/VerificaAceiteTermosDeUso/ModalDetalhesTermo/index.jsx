import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

import Modal from '../../Modal';

const ModalDetalhesTermo = ({ titulo, termoRender, dismissHandler, open }) => {
  return (
    <Modal dismissHandler={dismissHandler} open={open}>
      <Box mt={5} mb={5} style={{ position: 'relative' }}>
        <IconButton
          key="close"
          aria-label="close"
          onClick={dismissHandler}
          style={{ position: 'absolute', top: '-40px', left: '-10px' }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <Typography align="center" variant="h6" gutterBottom>
              {titulo}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {termoRender()}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalDetalhesTermo;
