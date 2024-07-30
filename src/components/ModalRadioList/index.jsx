import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  CircularProgress,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  TextField,
  Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import ModalConfirmacao from '../ModalConfirmacao';

export default function ModalRadioList({
  handleConfirmar,
  open,
  loading,
  handleClose,
  itens,
  titulo,
  texto,
  tituloConfirmacao,
  textoConfirmacao,
  ativaObservacao,
  modalConfirmacao,
}) {
  const [opcao, setOpcao] = useState(itens[0]?.value);
  const [observacao, setObservacao] = useState('');
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);

  const handleChangeOpcao = event => {
    setOpcao(event.target.value);
  };

  const handleChangeObservacao = event => {
    setObservacao(event.target.value);
  };

  const handleAvancar = () => {
    if (modalConfirmacao) {
      setModalConfirmacaoAberto(true);
    } else {
      handleConfirmar({ opcao, observacao });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`Dialog ${titulo}`}
    >
      {modalConfirmacaoAberto && (
        <ModalConfirmacao
          open={modalConfirmacaoAberto}
          handleClose={handleClose}
          btnSucessoClickHandler={() => handleConfirmar({ opcao, observacao })}
          btnCancelarClickHandler={handleClose}
          titulo={tituloConfirmacao}
          texto={textoConfirmacao}
        />
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <IconButton
            id="btn-fechar-modal-radio"
            onClick={handleClose}
            style={{ position: 'fixed' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <DialogTitle id="dialog-title">{titulo}</DialogTitle>
        </Grid>
        <Grid item xs={12} style={{ padding: '0 20px' }}>
          <DialogContentText>{texto}</DialogContentText>
        </Grid>
        <Grid item xs={12}>
          <DialogContent>
            <FormControl margin="none">
              <RadioGroup
                aria-label="lista de opções"
                value={opcao}
                onChange={handleChangeOpcao}
              >
                {itens &&
                  itens.map(item => {
                    return (
                      <FormControlLabel
                        id={`opcao-${item.value}`}
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.text || item.label}
                      />
                    );
                  })}
              </RadioGroup>
              {ativaObservacao(opcao) && (
                <TextField
                  id="input-observacao"
                  required
                  fullWidth
                  label="Observação"
                  value={observacao}
                  onChange={handleChangeObservacao}
                  autoFocus
                />
              )}
            </FormControl>
          </DialogContent>
        </Grid>
        <Grid item xs={12}>
          <DialogActions>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                id="btn-confirmar"
                onClick={() => handleAvancar({ opcao, observacao })}
                color="primary"
                primary="true"
                variant="contained"
                disabled={ativaObservacao(opcao) && !observacao}
              >
                Confirmar
              </Button>
            )}
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
}

/* eslint-disable react/forbid-prop-types */
ModalRadioList.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  ativaObservacao: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirmar: PropTypes.func.isRequired,
  itens: PropTypes.array.isRequired,
  titulo: PropTypes.string,
  texto: PropTypes.string,
  tituloConfirmacao: PropTypes.string,
  textoConfirmacao: PropTypes.string,
  modalConfirmacao: PropTypes.bool,
};

ModalRadioList.defaultProps = {
  titulo: undefined,
  texto: undefined,
  tituloConfirmacao: undefined,
  textoConfirmacao: undefined,
  modalConfirmacao: undefined,
};
