import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import CadastroLeadConcluido from 'components/QueroEmprestimo/CadastroLeadConcluido';
import SignUpForm from 'containers/Tomador/CadastroLead/SignUpForm';
import { useAppGlobal } from 'providers/AppGlobal';

import { Hidden } from '@material-ui/core';

import pushRota from '../../../routes/push';
import {
  TitleStyled,
  SubtitleStyled,
  FormContainerStyled,
  HeaderDesktopStyled,
  HeaderMobileStyled,
  HeaderTextDescStyled,
  HeaderTextDesktopStyled,
  HeaderTextStyled,
  MainContainerStyled,
} from './style';

export default function CadastroLead() {
  const { state: { cpf } = {} } = useLocation();
  const [dadosCliente, setDadosCliente] = useState({
    cadastroConcluido: false,
  });
  const {
    actions: { getTextoOrganizacao },
  } = useAppGlobal();

  const { titulo, subtitulo2, mobile } = getTextoOrganizacao();

  useEffect(() => {
    if (!cpf) {
      pushRota('/quero-emprestimo');
    }
  }, [cpf]);

  const Header = () => (
    <Grid container>
      <Grid item xs={12} style={{ textAlign: 'left' }}>
        <TitleStyled variant="h3">Cadastro</TitleStyled>
        <SubtitleStyled variant="subtitle1">
          Cadastre-se e entraremos em contato.
        </SubtitleStyled>
      </Grid>
    </Grid>
  );

  const DetalheDesktop = () => (
    <Grid item xs={12} md={6} justify="center">
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

  const Main = () => {
    const { nomeCliente, cadastroConcluido } = dadosCliente;
    if (cadastroConcluido) {
      return (
        <CadastroLeadConcluido
          nomeCliente={nomeCliente}
          msgFinal="Obrigado pelas informações, elas podem nos ajudar em uma futura parceria com a sua empresa."
        />
      );
    }
    return (
      <MainContainerStyled>
        <Hidden mdUp>
          <DetalheMobile />
        </Hidden>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Container>
              <FormContainerStyled>
                <Header />
                <SignUpForm cpf={cpf} setDadosCliente={setDadosCliente} />
              </FormContainerStyled>
            </Container>
          </Grid>
          <Hidden smDown>
            <DetalheDesktop />
          </Hidden>
        </Grid>
      </MainContainerStyled>
    );
  };

  return <Main />;
}
