import React from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from './MaterialUI/Button';

export default function DialogAlertaSessao({
  open,
  sobreporSessao,
  cancelarSessao,
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
          Já existe uma sessão ativa para este usuário. Se você continar por
          aqui a outra sessão será desativada.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelarSessao} color="primary">
          Cancelar
        </Button>
        <Button onClick={sobreporSessao} color="primary" autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogAlertaSessao.propTypes = {
  cancelarSessao: PropTypes.func.isRequired,
  open: PropTypes.bool,
  sobreporSessao: PropTypes.func.isRequired,
};

DialogAlertaSessao.defaultProps = {
  open: false,
};
