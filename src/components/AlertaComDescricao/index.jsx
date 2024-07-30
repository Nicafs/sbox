import React from 'react';

import { Alert, AlertTitle } from 'components/MaterialUI/Alert';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { DivContainerStyled } from './style';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

AlertaComDescricao.propTypes = {
  tipo: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  mensagem: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

AlertaComDescricao.defaultProps = {
  onClick: () => {},
};

export default function AlertaComDescricao({
  tipo,
  mensagem,
  titulo,
  onClick,
}) {
  const classes = useStyles();

  return (
    <DivContainerStyled className={classes.root} onClick={onClick}>
      <Alert severity={tipo}>
        <AlertTitle>{titulo}</AlertTitle>
        {mensagem}
      </Alert>
    </DivContainerStyled>
  );
}
