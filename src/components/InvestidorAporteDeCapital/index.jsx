import React, { useState, useEffect } from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import BotoesAcaoFooter from '../FluxoInvestimento/BotoesDeAcaoFooter';
import Box from '../MaterialUI/Box';
import Container from '../MaterialUI/Container';
import Grid from '../MaterialUI/Grid';
import DadosAporteCapital from './DadosAporteCapital';
import FormasPagamento from './FormasPagamento';
import Header from './Header';
import {
  BannerPaperStyled,
  BannerIconStyled,
  BannerTypographyStyled,
} from './style';

export default function InvestidorAporteDeCapital({
  investimentos,
  setBotoesAcaoBoleto,
  botoesAcaoBoleto,
  isBeforeLastStep,
  imprimirBoleto,
  enviarBoletoPorEmail,
  investimentoSelecionado,
  avancarStep,
  setTelaValida,
  telaValida,
}) {
  const [dadosPagamento, setDadosPagamento] = useState(null);
  // const [formularioEhValido, setFormularioEhValido] = useState(false);
  const {
    actions: { getIcone },
  } = useAppGlobal();

  useEffect(() => {
    if (dadosPagamento) {
      if (dadosPagamento.tipoPagamento === 'BOLETO') {
        setBotoesAcaoBoleto(true);
      }
      setTelaValida(true);
    } else {
      setBotoesAcaoBoleto(false);
      setTelaValida(false);
    }
  }, [dadosPagamento]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = () => {
    if (telaValida) {
      avancarStep();
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BannerPaperStyled elevation={0}>
            <BannerIconStyled
              alt="Ícone segurança - tela formas de repasse de investimento"
              src={getIcone('icone-seguranca')}
            />
            <BannerTypographyStyled>
              Os valores para a realização de investimentos devem ser
              depositados em conta do cliente mantida na Crédito Express, não
              devendo o cliente, em hipótese alguma, depositar valores em favor
              de terceiros, pessoa física ou jurídica, ainda que sejam agentes
              autônomos de investimentos, assessores, consultores, gestores de
              carteira ou planejadores financeiros.
            </BannerTypographyStyled>
          </BannerPaperStyled>
        </Grid>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <DadosAporteCapital
            investimentos={investimentos}
            saldoInvestidor={0}
          />
        </Grid>
        <Grid item xs={12}>
          <FormasPagamento
            dadosPagamento={dadosPagamento}
            setDadosPagamento={setDadosPagamento}
          />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Box mt={3}>
              <BotoesAcaoFooter
                botoesAcaoBoleto={botoesAcaoBoleto}
                handleNext={handleNext}
                isBeforeLastStep={isBeforeLastStep}
                imprimirBoleto={imprimirBoleto}
                enviarBoletoPorEmail={enviarBoletoPorEmail}
                investimentos={investimentos}
                investimentoSelecionado={investimentoSelecionado}
                textoBotaoFooter="CONTINUAR"
                botaoAvancarDisabled={!telaValida}
              />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

// InvestidorAporteDeCapital.title = 'Aplicar';
InvestidorAporteDeCapital.label = 'Aplicar';
