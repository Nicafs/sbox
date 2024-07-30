import React, { useState } from 'react';

import { cnpjMask, cpfMask } from 'commons/utils/MaskHandle';
import AuthRodape from 'components/AuthRodape';
import LoaderCircular from 'components/LoaderCircular';
import Grid from 'components/MaterialUI/Grid';
import TextField from 'components/MaterialUI/TextField';
import { CNPJ, CPF } from 'cpf_cnpj';

import { getOrganizacaoWhitelabel } from '~/commons/utils';

import {
  DivisoriaStyled,
  FormStyled,
  GridBotoesStyled,
  ButtonLoginStyled,
} from './style';

const BotoesSubmit = ({ doReset, localLoading }) => {
  return localLoading ? (
    <Grid container justify="center">
      <LoaderCircular />
    </Grid>
  ) : (
    <GridBotoesStyled container justify="space-between">
      <Grid item xs={12} container justify="center">
        <ButtonLoginStyled
          cy-element="btnSubmit"
          primary="true"
          onClick={doReset}
          loading={localLoading}
        >
          Resetar
        </ButtonLoginStyled>
      </Grid>
    </GridBotoesStyled>
  );
};

export default function SignInForm({ enviarEmailRedefinirSenha, loading }) {
  const [inputLogin, setInputLogin] = useState('');
  const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();

  const submit = () =>
    enviarEmailRedefinirSenha({ login: inputLogin, cnpjOrganizacao });

  const handleUsuario = event => {
    const valor = event.target.value;
    if (CPF.isValid(valor)) {
      setInputLogin(cpfMask(valor));
    } else if (CNPJ.isValid(valor)) {
      setInputLogin(cnpjMask(valor));
    } else {
      setInputLogin(valor);
    }
  };

  return (
    <React.Fragment>
      <FormStyled>
        <TextField
          cy-element="inputLogin"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="usuario"
          label="CPF, CNPJ ou E-mail"
          autoComplete="usuario"
          name="usuario"
          autoFocus
          value={inputLogin}
          onChange={handleUsuario}
          enterHandler={submit}
        />
        <BotoesSubmit
          cy-element="botaoResetarSenha"
          doReset={submit}
          localLoading={loading}
        />
        <DivisoriaStyled variant="fullWidth" />
        <AuthRodape msg="Lembrou sua senha?" />
      </FormStyled>
    </React.Fragment>
  );
}
