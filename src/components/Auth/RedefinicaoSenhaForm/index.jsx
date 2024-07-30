import React, { useState } from 'react';

import FormikTextField from 'components/FormikUtils/FormikTextField';
import LoaderCircular from 'components/LoaderCircular';
import Grid from 'components/MaterialUI/Grid';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import pushRota from 'routes/push';

import { useFirebase } from '@credito-express/ce-components';

import Schema from './schema';
import { FormStyled, GridBotoesStyled, ButtonLoginStyled } from './style';

const BotoesSubmit = ({ salvarSenha, localLoading }) => {
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
          onClick={salvarSenha}
          loading={localLoading}
        >
          Salvar
        </ButtonLoginStyled>
      </Grid>
    </GridBotoesStyled>
  );
};

const RedefinicaoSenhaForm = ({ resetInfo }) => {
  const firebaseApp = useFirebase();
  const [localLoading, setLocalLoading] = useState(false);

  const {
    actions: { exibirAlerta },
    organizacao: { tipoFluxoEcp, tipoFluxoEp },
  } = useAppGlobal();

  const configCE = tipoFluxoEcp === 'P2P' && tipoFluxoEp !== 'BANCO_SEMEAR';

  const auth = firebaseApp.auth();

  async function onSubmit(values) {
    const { actionCode } = resetInfo;

    setLocalLoading(true);

    auth
      .verifyPasswordResetCode(actionCode)
      .then(() => {
        auth
          .confirmPasswordReset(actionCode, values.novaSenha)
          .then(() => {
            setLocalLoading(false);
            exibirAlerta('Senha resetada com sucesso', 'success');
            pushRota(configCE ? '/auth' : '/');
          })
          .catch(error => {
            setLocalLoading(false);
            console.error(error);
            exibirAlerta('Ocorreu um erro ao alterar senha', 'error');
          });
      })
      .catch(error => {
        setLocalLoading(false);
        console.error(error);
        exibirAlerta('Sessão inválida', 'error');
      });
  }

  const formik = useFormik({
    initialValues: {
      email: resetInfo ? resetInfo.emailPessoa : '',
      novaSenha: '',
      novaSenhaConfirmacao: '',
    },
    validationSchema: Schema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <React.Fragment>
      <FormStyled>
        <FormikTextField
          formik={formik}
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          name="email"
          label="Seu e-mail"
          disabled
        />
        <FormikTextField
          required
          formik={formik}
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          id="novaSenha"
          label="Digite sua senha"
          name="novaSenha"
          autoFocus
          enterHandler={onSubmit}
        />
        <FormikTextField
          formik={formik}
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="novaSenhaConfirmacao"
          label="Confirme sua senha"
          name="novaSenhaConfirmacao"
          enterHandler={onSubmit}
        />
        <BotoesSubmit
          cy-element="botaoSalvarSenha"
          salvarSenha={() => formik.handleSubmit()}
          localLoading={localLoading}
        />
      </FormStyled>
    </React.Fragment>
  );
};

/* eslint-disable react/forbid-prop-types */
RedefinicaoSenhaForm.propTypes = {
  resetInfo: PropTypes.object,
};

RedefinicaoSenhaForm.defaultProps = {
  resetInfo: undefined,
};

export default RedefinicaoSenhaForm;
