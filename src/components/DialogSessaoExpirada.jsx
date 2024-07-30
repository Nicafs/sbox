import React from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from './MaterialUI/Button';

export default function DialogSessaoExpirada({
  open,
  finalizarSessao,
  sobreporSessao,
}) {
  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Deseja continuar por aqui?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sua sessão expirou. Deseja continuar navegando?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={finalizarSessao} color="primary">
          Sair
        </Button>
        <Button onClick={sobreporSessao} color="primary" autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogSessaoExpirada.propTypes = {
  finalizarSessao: PropTypes.func.isRequired,
  open: PropTypes.bool,
  sobreporSessao: PropTypes.func.isRequired,
};

DialogSessaoExpirada.defaultProps = {
  open: false,
};
