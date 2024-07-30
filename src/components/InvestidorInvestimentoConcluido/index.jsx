import React from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import { useCreditoExpress } from '@credito-express/ce-components';

import pushRota from '../../routes/push';
import Button from '../MaterialUI/Button';
import Container from '../MaterialUI/Container';
import Grid from '../MaterialUI/Grid';
import Link from '../MaterialUI/Link';
import {
  BemVindoTypographyStyled,
  CorpoTypographyStyled,
  GridButtonAcompanharStyled,
  GridButtonInvestirStyled,
  GridButtonsStyled,
  LinkBoletoTypographyStyled,
  MainPaperStyled,
  NomeTypographyStyled,
} from './style';

export default function InvestidorInvestimentoConcluido({ handleBack }) {
  const {
    state: { pessoa },
  } = useCreditoExpress();
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const investirMais = () => {
    window.location.reload();
  };

  const acompanharInvestimentos = () => {
    pushRota('/investidor/meus-investimentos');
  };

  return (
    <Container maxWidth="lg">
      <MainPaperStyled elevation={2}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <img
              alt="Ícone concluído - tela agradecimento investidor"
              src={getIcone('icon-sucesso')}
            />
          </Grid>
          <Grid item xs={12}>
            <NomeTypographyStyled variant="h4">
              Olá {pessoa.nome}
            </NomeTypographyStyled>
          </Grid>
          <Grid item xs={12}>
            <BemVindoTypographyStyled variant="h4">
              Bem-vindo(a) a Crédito Express
            </BemVindoTypographyStyled>
          </Grid>
          <Grid item xs={12}>
            <CorpoTypographyStyled>
              Iremos processar o(s) repasse(s) do(s) seu(s) investimento(s)
            </CorpoTypographyStyled>
            <CorpoTypographyStyled>
              Mas fica tranquilo é tudo muito rápido e automático
            </CorpoTypographyStyled>
            <CorpoTypographyStyled>
              Para sua comodidade você pode acompanhar o(s) status do(s) seu(s)
              investimento(s)
            </CorpoTypographyStyled>
          </Grid>
          <Grid item xs={12}>
            <LinkBoletoTypographyStyled variant="subtitle2">
              <Link href="#" onClick={handleBack} color="inherit">
                Clique aqui para visualizar novamente o boleto ou a
                transferência
              </Link>
            </LinkBoletoTypographyStyled>
          </Grid>
        </Grid>
        <GridButtonsStyled container spacing={2}>
          <GridButtonInvestirStyled item xs={12} sm={6}>
            <Button
              name="btnInvestirMais"
              rounded="true"
              outlinePrimary="true"
              onClick={investirMais}
            >
              Investir mais
            </Button>
          </GridButtonInvestirStyled>
          <GridButtonAcompanharStyled item xs={12} sm={6}>
            <Button
              name="btnAcompanharInvestimentos"
              rounded="true"
              primary
              onClick={acompanharInvestimentos}
              disabled
            >
              Acompanhar
            </Button>
          </GridButtonAcompanharStyled>
        </GridButtonsStyled>
      </MainPaperStyled>
    </Container>
  );
}

// InvestidorInvestimentoConcluido.title = 'Concluído';
InvestidorInvestimentoConcluido.label = 'Concluído';
