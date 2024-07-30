import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import RedefinicaoSenhaForm from 'components/Auth/RedefinicaoSenhaForm';
import Grid from 'components/MaterialUI/Grid';

import { Hidden } from '@material-ui/core';

import { useAppGlobal } from '../../../providers/AppGlobal';
import pushRota from '../../../routes/push';
import {
  ContainerFormStyled,
  FormContainerStyled,
  HeaderDesktopStyled,
  HeaderMobileStyled,
  HeaderTextDescStyled,
  HeaderTextDesktopStyled,
  HeaderTextStyled,
  MainContainerStyled,
  TypographyTitleStyled,
} from './style';

const CadastroNovaSenha = () => {
  const {
    actions: { exibirAlerta, getTextoOrganizacao },
  } = useAppGlobal();
  const { search: queryString } = useLocation();
  const [resetInfo, setResetInfo] = useState(null);

  const { titulo, subtitulo2, mobile } = getTextoOrganizacao();

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

  useEffect(() => {
    const urlParams = new URLSearchParams(queryString);

    const searchParams = {
      actionCode: urlParams.get('oobCode'),
      modo: urlParams.get('mode'),
      apiKey: urlParams.get('apiKey'),
      continueUrl: urlParams.get('continueUrl'),
      lang: urlParams.get('lang'),
      nomePessoa: urlParams.get('nome'),
      emailPessoa: urlParams.get('email'),
    };

    if (
      !searchParams.actionCode ||
      !searchParams.nomePessoa ||
      !searchParams.emailPessoa
    ) {
      exibirAlerta(
        'Os dados para redefinição de senha não foram recebidos. Você foi redirecionado para a página de login.',
        'error',
      );
      pushRota('/auth');
    }

    setResetInfo(searchParams);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainContainerStyled>
      <Hidden mdUp>
        <DetalheMobile />
      </Hidden>

      <Grid container>
        <Grid item xs={12} md={6}>
          <ContainerFormStyled>
            <FormContainerStyled>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TypographyTitleStyled variant="h5" color="primary">
                    Olá, {resetInfo ? resetInfo.nomePessoa : ''}
                  </TypographyTitleStyled>
                </Grid>
                <Grid item xs={12}>
                  <TypographyTitleStyled variant="h5" color="textSecondary">
                    Cadastre uma nova senha
                  </TypographyTitleStyled>
                </Grid>
                <Grid item xs={12}>
                  <RedefinicaoSenhaForm resetInfo={resetInfo} />
                </Grid>
              </Grid>
            </FormContainerStyled>
          </ContainerFormStyled>
        </Grid>

        <Hidden smDown>
          <DetalheDesktop />
        </Hidden>
      </Grid>
    </MainContainerStyled>
  );
};

export default CadastroNovaSenha;
