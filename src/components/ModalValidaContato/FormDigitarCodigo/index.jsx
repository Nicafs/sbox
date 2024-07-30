import React from 'react';

import { codeConfirmationMask } from '../../../commons/utils/MaskHandle';
import Grid from '../../MaterialUI/Grid';
import TextField from '../../MaterialUI/TextField';
import { Texto } from './style';

const FormDigitarCodigo = ({ codigo, handleCodigoChange }) => {
  return (
    <>
      <Grid item xs={12}>
        <Texto>
          Insira o código que enviamos via <b>SMS</b> para o celular informado
        </Texto>
      </Grid>
      <Grid container item xs={12}>
        <TextField
          cy-element="modalInputCodigo"
          type="tel"
          margin="normal"
          variant="outlined"
          required
          fullWidth
          id="codigo"
          label="Código de segurança"
          name="codigo"
          autoFocus
          value={codeConfirmationMask(codigo)}
          onChange={handleCodigoChange}
        />
      </Grid>
    </>
  );
};

export default FormDigitarCodigo;
