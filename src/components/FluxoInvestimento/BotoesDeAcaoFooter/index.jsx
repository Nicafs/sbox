import React from 'react';

import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';

import { Hidden } from '@material-ui/core';

import FooterMobileContainer from '../../FooterMobileGridContainer';
import Box from '../../MaterialUI/Box';
import FooterMobile from '../FooterMobile';
import { BoletoAcoesButtonStyled } from './style';

export default function BotoesAcaoFooter({
  botoesAcaoBoleto,
  handleNext,
  isBeforeLastStep,
  imprimirBoleto,
  enviarBoletoPorEmail,
  investimentoSelecionado,
  investimentos = [],
  textoBotaoFooter = 'CONCLUIR',
  mobileRenderBefore,
  botaoAvancarDisabled = true,
}) {
  const getFooterInvestimentos = () => {
    if (investimentos.length === 0 && investimentoSelecionado) {
      return [investimentoSelecionado];
    }
    return investimentos;
  };

  const renderBotoesDesktop = () => (
    <Grid container spacing={1}>
      {botoesAcaoBoleto ? (
        <Grid item xs={12} sm={3} md={3}>
          <BoletoAcoesButtonStyled
            rounded="true"
            variant="outlined"
            fullWidth
            onClick={imprimirBoleto}
          >
            Imprimir
          </BoletoAcoesButtonStyled>
        </Grid>
      ) : (
        <Grid item sm={3} />
      )}
      {botoesAcaoBoleto ? (
        <Grid item xs={12} sm={4} md={3}>
          <BoletoAcoesButtonStyled
            rounded="true"
            variant="outlined"
            fullWidth
            onClick={enviarBoletoPorEmail}
          >
            Enviar por e-mail
          </BoletoAcoesButtonStyled>
        </Grid>
      ) : (
        <Grid item sm={4} md={3} />
      )}
      <Grid item sm={3} md={3} />
      <Grid item xs={12} sm={2} md={3}>
        <Button
          name="botao-avancar"
          rounded="true"
          primary="true"
          fullWidth
          onClick={handleNext}
          disabled={botaoAvancarDisabled}
        >
          {isBeforeLastStep() ? 'Finalizar' : 'Avançar'}
        </Button>
      </Grid>
    </Grid>
  );

  const renderFooterMobile = () => {
    const footerInvestimentos = getFooterInvestimentos();
    const valor = footerInvestimentos
      .map(({ valor: v }) => v)
      .reduce((soma, valorAtual) => soma + valorAtual, 0);
    const qtd = footerInvestimentos.length;

    return (
      <FooterMobileContainer item xs={12}>
        {mobileRenderBefore && <Box boxShadow={10}>{mobileRenderBefore()}</Box>}
        <FooterMobile
          botaoDisabled={botaoAvancarDisabled}
          valor={valor}
          qtd={qtd}
          handleNext={handleNext}
          textoBotaoFooter={textoBotaoFooter}
        />
      </FooterMobileContainer>
    );
  };

  return (
    <>
      <Hidden smDown>{renderBotoesDesktop()}</Hidden>
      <Hidden mdUp>{renderFooterMobile()}</Hidden>
    </>
  );
}
