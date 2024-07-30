import React from 'react';

import Grid from 'components/MaterialUI/Grid';
import IconButton from 'components/MaterialUI/IconButton';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

import { DialogContentStyled } from './style';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function Modal({
  open,
  dismissHandler,
  titulo,
  children,
  maxWidth,
  disableBackdropClick,
  disableEscapeKeyDown,
  loading,
}) {
  const loadingProps = loading
    ? {
        onClose: () => {},
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
      }
    : {};

  return (
    <Dialog
      cy-element="modal"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={dismissHandler}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth={maxWidth}
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      {...loadingProps}
    >
      {titulo && (
        <Grid container>
          <Grid
            item
            xs={12}
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <DialogTitle id="alert-dialog-slide-title">{titulo}</DialogTitle>
            </Grid>
            <Grid item>
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={dismissHandler}
              >
                <CloseIcon style={{ fontSize: 20 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
      {children && <DialogContentStyled>{children}</DialogContentStyled>}
    </Dialog>
  );
}

/* eslint-disable react/forbid-prop-types */
Modal.propTypes = {
  open: PropTypes.any,
  dismissHandler: PropTypes.any,
  titulo: PropTypes.any,
  children: PropTypes.any.isRequired,
  maxWidth: PropTypes.string,
  disableBackdropClick: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
};

Modal.defaultProps = {
  open: false,
  dismissHandler: null,
  titulo: null,
  maxWidth: 'md',
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
};
