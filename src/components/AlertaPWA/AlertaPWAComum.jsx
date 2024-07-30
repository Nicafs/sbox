import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Snackbar, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useAppGlobal } from '../../providers/AppGlobal';

const IconButtonStyled = styled(IconButton)`
  padding: ${({ theme }) => theme.spacing(0.5)};
`;

const AlertaPWAComum = ({ abrir, setAbrir, instalarPWA }) => {
  const {
    tema: { nomeOrganizacao },
  } = useAppGlobal();
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={abrir}
        autoHideDuration={6000}
        onClose={() => setAbrir(false)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">Adicionar {nomeOrganizacao} aos meus Apps</span>
        }
        action={[
          <Button
            key="instalarPWA"
            color="secondary"
            size="small"
            onClick={instalarPWA}
          >
            Instalar
          </Button>,
          <IconButtonStyled
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setAbrir(false)}
          >
            <CloseIcon />
          </IconButtonStyled>,
        ]}
      />
    </>
  );
};

AlertaPWAComum.propTypes = {
  abrir: PropTypes.bool.isRequired,
  setAbrir: PropTypes.func.isRequired,
  instalarPWA: PropTypes.func.isRequired,
};

export default AlertaPWAComum;
