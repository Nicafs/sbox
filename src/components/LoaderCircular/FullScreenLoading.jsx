import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const FullScreenLoading = ({
  loading,
  message,
  color = 'primary',
  type = 'circular',
}) => {
  const classes = useStyles();

  return loading ? (
    <Backdrop className={classes.backdrop} open={loading}>
      {(!type || type === 'circular') && (
        <CircularProgress id="loadingCircular" color={color} />
      )}
      {type === 'linear' && <LinearProgress id="loadingLinear" color={color} />}
      {message && <span className="message">{message}</span>}
    </Backdrop>
  ) : null;
};
