import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
  Grid,
} from '@material-ui/core';

import CloseButton from './CloseButton';
import { DialogTitleStyled, DialogActionsStyled } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({
  open,
  onClose,
  fullWidth = false,
  fullScreen = false,
  maxWidth = false,
  title = '',
  disableClose = false,
  dividers = false,
  children,
}) => {
  let actions;
  let text;
  let textAlign;
  let img;
  let nodes = children;

  if (children && Array.isArray(children)) {
    nodes = children.map(c => {
      if (c.key === 'Text') {
        text = c;
        textAlign = 'inherit';
        return null;
      }
      if (c.key === 'TextCenter') {
        text = c;
        textAlign = 'center';
        return null;
      }
      if (c.key === 'Actions') {
        actions = c;
        return null;
      }
      if (c.key === 'Img') {
        img = c;
        return null;
      }
      return c;
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      disableBackdropClick={disableClose}
      disableEscapeKeyDown={disableClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      {(title || !disableClose) && (
        <DialogTitleStyled id="dialog-title">
          <strong>{title}</strong>
          {!disableClose && <CloseButton onClose={onClose} />}
        </DialogTitleStyled>
      )}

      <DialogContent id="dialog-content" dividers={dividers}>
        <Grid container justify="center">
          {img}
        </Grid>

        {text && (
          <DialogContentText align={textAlign}>{text}</DialogContentText>
        )}

        {nodes}
      </DialogContent>

      {actions && (
        <DialogActionsStyled id="dialog-actions">{actions}</DialogActionsStyled>
      )}
    </Dialog>
  );
};
