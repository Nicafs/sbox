import React from 'react';

import { cnpjMask, cpfMask } from 'commons/utils/MaskHandle';
import { BotoesSubmit, Rodape } from 'components/Auth/Login/SignInForm';
import TextField from 'components/MaterialUI/TextField';
import { CNPJ, CPF } from 'cpf_cnpj';

import { getOrganizacaoWhitelabel } from '~/commons/utils';

import { DivisoriaStyled, FormStyled, Titulo } from './style';

export default function SignInForm({
  autenticar,
  autenticacaoLoading,
  cadastroClickHandler,
}) {
  const [documento, setDocumento] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();

  const doLogin = () => {
    autenticar({ documento, senha, cnpjOrganizacao });
  };

  const handleUsuario = event => {
    const valor = event.target.value;
    if (CPF.isValid(valor)) {
      setDocumento(cpfMask(valor));
    } else if (CNPJ.isValid(valor)) {
      setDocumento(cnpjMask(valor));
    } else {
      setDocumento(valor);
    }
  };

  return (
    <React.Fragment>
      <Titulo>Faça seu login</Titulo>
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
          value={documento}
          onChange={handleUsuario}
          enterHandler={doLogin}
        />
        <TextField
          cy-element="inputSenha"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={senha}
          onChange={evt => setSenha(evt.target.value)}
          enterHandler={doLogin}
        />
        <BotoesSubmit
          cy-element="botaoEnviar"
          login={doLogin}
          loading={autenticacaoLoading}
        />
        <DivisoriaStyled variant="fullWidth" />
        <Rodape cadastroClickHandler={cadastroClickHandler} />
      </FormStyled>
    </React.Fragment>
  );
}
