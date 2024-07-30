import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalConfirmacao({
  open,
  handleClose,
  name,
  btnSucessoClickHandler,
  btnCancelarClickHandler,
  titulo,
  texto,
  btnConfirmarDisabled,
  btnCancelarDisabled,
  maxWidth,
  btnCancelarDisplay,
  disableBackdropClick = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      name={name}
      disableBackdropClick={disableBackdropClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
    >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {texto}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          id="btn-cancelar-modal-confirmacao"
          onClick={btnCancelarClickHandler || handleClose}
          color="secondary"
          disabled={btnCancelarDisabled}
          style={{ display: btnCancelarDisplay }}
        >
          Cancelar
        </Button>
        <Button
          id="btn-confirmar-modal-confirmacao"
          onClick={btnSucessoClickHandler}
          color="primary"
          autoFocus
          disabled={btnConfirmarDisabled}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalConfirmacao.defaultProps = {
  maxWidth: 'md',
};
