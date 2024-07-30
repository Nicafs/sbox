import React from 'react';

import PropTypes from 'prop-types';

import { Slide, Snackbar } from '@material-ui/core';

const SlideTransition = props => {
  return <Slide {...props} direction="up" />;
};

const AlertaIPhone = ({ abrir, setAbrir, isSafari }) => {
  const emiteMensagem = () =>
    isSafari ? (
      <span id="message-id">Instruções para instalar o App no iPhone</span>
    ) : (
      <span id="message-id">
        Abra o Safari para instalar o App no seu iPhone
      </span>
    );
  return (
    <>
      <Snackbar
        open={abrir}
        onClose={() => setAbrir(false)}
        TransitionComponent={SlideTransition}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={emiteMensagem()}
      />
    </>
  );
};

AlertaIPhone.propTypes = {
  isSafari: PropTypes.bool.isRequired,
  abrir: PropTypes.bool.isRequired,
  setAbrir: PropTypes.func.isRequired,
};

export default AlertaIPhone;
