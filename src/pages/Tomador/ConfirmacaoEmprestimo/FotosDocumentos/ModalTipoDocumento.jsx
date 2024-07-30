import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export default function ModalTipoDocumento({ open, btnConfirmHandler }) {
  const [tipoDocumentoModal, setTipoDocumentoModal] = useState('');
  const [possuiErro, setPossuiErro] = useState(false);

  const options = [
    { value: 'CNH', label: 'CNH' },
    { value: 'RG', label: 'RG' },
  ];

  const handleChange = event => {
    const valor = event.target.value;
    setTipoDocumentoModal(valor);
  };

  const handleConfirm = tipoDoc => {
    if (tipoDoc) {
      btnConfirmHandler(tipoDoc);
    } else {
      setPossuiErro(true);
    }
  };

  return (
    <Dialog
      open={open}
      name="modal-tipo-documento"
      disableBackdropClick={false}
      aria-labelledby="modal-tipo-documento"
      aria-describedby="modal-tipo-documento-description"
    >
      <DialogTitle id="modal-tipo-documento-title">
        Selecione o tipo de documento que foi fotografado.
      </DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          error={possuiErro}
          id="formControl-tipoDocumento"
        >
          <InputLabel shrink="true" id="select-tipoDocumento-label">
            Documento
          </InputLabel>
          <Select
            cy-element="tipoDocumento"
            labelId="tipoDocumento-label"
            id="tipoDocumento"
            value={tipoDocumentoModal}
            onChange={handleChange}
            required
            fullWidth
            displayEmpty
            autoFocus
          >
            <MenuItem value="">Selecione</MenuItem>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {possuiErro && <FormHelperText>* Escolha uma Opção</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleConfirm(tipoDocumentoModal)}
          color="primary"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
