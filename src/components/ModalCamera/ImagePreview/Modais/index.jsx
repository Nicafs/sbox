import React from 'react';

import { Typography, CircularProgress, Button } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';

import { Container } from './styles';

const Modais = ({ typeModal, handleRestart, handleNextStep, erro }) => {
  return (
    <Container>
      {typeModal === 'loading' && <Loading />}
      {typeModal === 'success' && <Success handleNextStep={handleNextStep} />}
      {typeModal === 'error' && (
        <Error handleRestart={handleRestart} erro={erro} />
      )}
    </Container>
  );
};

const Loading = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress color="inherit" />
      <Typography variant="h3">Aguarde</Typography>
      <Typography variant="h5">Estamos analisando seu documento</Typography>
    </div>
  );
};

const Success = ({ handleNextStep }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <CheckCircleOutlineIcon style={{ color: '#04B74D', fontSize: 70 }} />
      <Typography variant="h3">Pronto</Typography>
      <Typography variant="h5">Documento analisado com sucesso</Typography>

      <Button
        style={{ marginTop: 20 }}
        key="Actions"
        type="button"
        color="primary"
        variant="contained"
        onClick={handleNextStep}
        rounded
      >
        PRÓXIMO
      </Button>
    </div>
  );
};

const Error = ({ handleRestart, erro }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <CloseIcon style={{ color: '#FF0000', fontSize: 70 }} />
      <Typography variant="h3">Falhou</Typography>
      <Typography variant="h5" style={{ color: '#FF0000' }}>
        {erro || 'Erro ao processar seu documento'}
      </Typography>

      <Button
        style={{ marginTop: 20 }}
        onClick={handleRestart}
        key="Actions"
        type="button"
        color="primary"
        variant="contained"
        rounded
      >
        TENTAR NOVAMENTE
      </Button>
    </div>
  );
};

export default Modais;
