import React, { useEffect } from 'react';

import { Hidden } from '@material-ui/core';

import pushRota from '~/routes/push';

import { useAppGlobal } from '~/providers/AppGlobal';

import { useSimulacaoState } from '~/pages/Tomador/SolicitacaoEmprestimo/state';

import SignUpForm from '~/containers/Tomador/CadastroEp/SignUpForm';

import Container from '~/components/MaterialUI/Container';
import Grid from '~/components/MaterialUI/Grid';

import Rodape from './Rodape';
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

export default function CadastroEp() {
  const [
    {
      pessoa: { cpf, celular },
    },
    { etapaAutenticacaoEP, voltar, setOrganizacao },
  ] = useSimulacaoState();
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
      <Grid item xs={12} style={{ textAlign: 'left', marginBottom: '20px' }}>
        <TitleStyled variant="h4">Pré-cadastro</TitleStyled>
        <SubtitleStyled variant="subtitle1">
          Precisamos que preencha os dados abaixo:
        </SubtitleStyled>
      </Grid>
    </Grid>
  );

  const DetalheDesktop = () => (
    <Grid item xs={12} md={6}>
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
                <SignUpForm
                  cpf={cpf}
                  celular={celular}
                  etapaAutenticacaoEP={etapaAutenticacaoEP}
                  voltar={voltar}
                  setOrganizacao={setOrganizacao}
                />
                <Rodape />
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

  return cpf ? <Main /> : null;
}
