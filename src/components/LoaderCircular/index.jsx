import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoaderCircular({ size }) {
  return <CircularProgress disableShrink size={size} />;
}

LoaderCircular.defaultProps = {
  size: 40,
};
