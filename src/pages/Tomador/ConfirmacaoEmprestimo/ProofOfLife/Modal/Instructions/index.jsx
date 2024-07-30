import React from 'react';

import { Modal } from 'components/ModalNew/Modal';
import { useAppGlobal } from 'providers/AppGlobal';

import { Grid, Button } from '@material-ui/core';

import { text } from './text';

const Instructions = ({ open, onClose, onSubmit }) => {
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const handleSubmit = async () => {
    onClose();
    onSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      title="Instruções"
    >
      <Grid container item key="Img" justify="center" alignItems="center">
        <img alt="icone-seguranca" src={getIcone('icone-seguranca')} />
      </Grid>
      <span key="Text">{text.title}</span>
      {text.instructions.map(({ description }) => (
        <Grid item xs={12} key={description}>
          {description}
        </Grid>
      ))}

      <Button
        key="Actions"
        type="submit"
        onClick={handleSubmit}
        color="primary"
        variant="contained"
      >
        Confirmar
      </Button>
    </Modal>
  );
};

export default Instructions;
