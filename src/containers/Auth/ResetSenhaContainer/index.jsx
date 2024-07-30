import React, { useEffect } from 'react';

import ResetSenhaForm from 'components/Auth/ResetSenhaForm';
import Grid from 'components/MaterialUI/Grid';
import { useAppGlobal } from 'providers/AppGlobal';

import { Hidden } from '@material-ui/core';

import { useAuth } from '@credito-express/ce-components';

import pushRota from '../../../routes/push';
import {
  ContainerFormStyled,
  FormContainerStyled,
  HeaderAuthDiv,
  HeaderDesktopStyled,
  HeaderMobileStyled,
  HeaderTextDescStyled,
  HeaderTextDesktopStyled,
  HeaderTextStyled,
  MainContainerStyled,
  TypographyTitleStyled,
} from './style';

function EnvioResetSenhaContainer() {
  const {
    actions: { exibirAlerta, getTextoOrganizacao },
  } = useAppGlobal();
  const {
    senha: {
      enviarEmailRedefinirSenha,
      erroEnviarEmailRedefinirSenha,
      sucessoEnviarEmailRedefinirSenha,
      retornoEnviarEmailRedefinirSenhaRetorno,
      loadingRedefinirSenha,
    },
  } = useAuth({});

  const { titulo, subtitulo2, mobile } = getTextoOrganizacao();

  useEffect(() => {
    if (erroEnviarEmailRedefinirSenha) {
      tratarErroEnvioResetDeSenha(erroEnviarEmailRedefinirSenha);
    }
  }, [erroEnviarEmailRedefinirSenha]); // eslint-disable-line react-hooks/exhaustive-deps

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (sucessoEnviarEmailRedefinirSenha) {
      const { email } = retornoEnviarEmailRedefinirSenhaRetorno;
      exibirAlerta(
        `Um e-mail foi enviado para ${email}. Verifique-o para concluir o processo.`,
        'success',
      );
    }
  }, [
    sucessoEnviarEmailRedefinirSenha,
    retornoEnviarEmailRedefinirSenhaRetorno,
  ]);

  const tratarErroEnvioResetDeSenha = axiosErro => {
    const msgErroPadrao =
      'Ocorreu um erro ao enviar e-mail de redefinição de senha, tente novamente mais tarde';
    console.error(msgErroPadrao, axiosErro);

    try {
      const {
        response: {
          status,
          data: {
            erros: [{ codigo }],
          },
        },
      } = axiosErro;

      // Tratativa cliente sem email cadastrado
      if (status === 400 && codigo === 'PES019') {
        exibirAlerta('Crie sua senha através da opção Simular Agora', 'error');
        return pushRota('/quero-emprestimo');
      }
      // eslint-disable-next-line no-empty
    } catch (err) {}

    exibirAlerta(msgErroPadrao);
  };

  const HeaderAuth = () => (
    <Grid container justify="space-between">
      <Grid item xs={12} container justify="center">
        <HeaderAuthDiv>
          <TypographyTitleStyled variant="h5">
            Reset de senha
          </TypographyTitleStyled>
        </HeaderAuthDiv>
      </Grid>
    </Grid>
  );

  const DetalheDesktop = () => (
    <Grid item md={6}>
      <HeaderDesktopStyled>
        <HeaderTextDesktopStyled>{titulo}</HeaderTextDesktopStyled>
        <HeaderTextDescStyled>{subtitulo2}</HeaderTextDescStyled>
      </HeaderDesktopStyled>
    </Grid>
  );

  const DetalheMobile = () => (
    <HeaderMobileStyled>
      <HeaderTextStyled>{mobile}</HeaderTextStyled>
    </HeaderMobileStyled>
  );
  return (
    <MainContainerStyled>
      <Hidden mdUp>
        <DetalheMobile />
      </Hidden>

      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <ContainerFormStyled>
            <FormContainerStyled>
              <HeaderAuth />
              <ResetSenhaForm
                enviarEmailRedefinirSenha={enviarEmailRedefinirSenha}
                loading={loadingRedefinirSenha}
              />
            </FormContainerStyled>
          </ContainerFormStyled>
        </Grid>

        <Hidden smDown>
          <DetalheDesktop />
        </Hidden>
      </Grid>
    </MainContainerStyled>
  );
}

export default EnvioResetSenhaContainer;
