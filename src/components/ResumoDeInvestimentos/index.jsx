import React, { useEffect, useState } from 'react';

import GraficoComparativo from 'components/GraficoComparativo';
import Loading from 'components/Loading';
import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import TabelaListagemInvestimento from 'components/TabelaListagemInvestimento';
import { useAppGlobal } from 'providers/AppGlobal';

import BotoesAcaoFooter from '../FluxoInvestimento/BotoesDeAcaoFooter';
import Box from '../MaterialUI/Box';
import { TypographyBlackStyled } from './style';

export default function ResumoDeInvestimentos({
  investimentos,
  parametrosSistema,
  botoesAcaoBoleto,
  avancarStep,
  isBeforeLastStep,
  imprimirBoleto,
  enviarBoletoPorEmail,
  investimentoSelecionado,
  setTelaValida,
  telaValida,
}) {
  const [dadosGraficoComparativo, setDadosGraficoComparativo] = useState([]);
  const {
    tema: { nomeOrganizacao },
  } = useAppGlobal();

  useEffect(() => {
    if (investimentos.length > 0 && parametrosSistema.length > 0) {
      const dados = formataDadosGraficoComparativo();
      setDadosGraficoComparativo(dados);
      setTelaValida(true);
    }
  }, [investimentos, parametrosSistema]); // eslint-disable-line react-hooks/exhaustive-deps

  const formataDadosGraficoComparativo = () => {
    const dadosComparativos = investimentos.map(
      ({ simulacao: { dadosComparativos: d } }) => d,
    );

    // Soma Poupança
    const totalReceberPoupanca = dadosComparativos
      .map(({ poupanca: { totalReceber } }) => totalReceber)
      .reduce((soma, valor) => soma + valor, 0);
    const rendimentoPoupanca = dadosComparativos
      .map(({ poupanca: { rendimento } }) => rendimento)
      .reduce((soma, valor) => soma + valor, 0);
    // Soma Tesouro
    const totalReceberTesouro = dadosComparativos
      .map(({ tesouro: { totalReceber } }) => totalReceber)
      .reduce((soma, valor) => soma + valor, 0);
    const rendimentoTesouro = dadosComparativos
      .map(({ tesouro: { rendimento } }) => rendimento)
      .reduce((soma, valor) => soma + valor, 0);
    // Soma Crédito Express
    const totalCreditoExpress = dadosComparativos
      .map(({ creditoExpress: { totalReceber } }) => totalReceber)
      .reduce((soma, valor) => soma + valor, 0);
    const rendimentoCreditoExpress = dadosComparativos
      .map(({ creditoExpress: { rendimento } }) => rendimento)
      .reduce((soma, valor) => soma + valor, 0);

    return [
      {
        tipo: 'poupanca',
        titulo1: 'Ganho de',
        valor1: rendimentoPoupanca,
        nome: 'Poupança',
        texto: 'Total resgatado',
        valor2: totalReceberPoupanca,
        size: 4,
        destaque: false,
      },
      {
        tipo: 'tesouro',
        titulo1: 'Ganho de',
        valor1: rendimentoTesouro,
        nome: 'Tesouro Selic',
        texto: 'Total resgatado',
        valor2: totalReceberTesouro,
        size: 8,
        destaque: false,
      },
      {
        tipo: 'credito-express',
        titulo1: 'Ganho de',
        valor1: rendimentoCreditoExpress,
        nome: nomeOrganizacao,
        texto: 'Total resgatado',
        valor2: totalCreditoExpress,
        size: 14,
        destaque: true,
      },
    ];
  };

  const paginaCarregando = () => parametrosSistema.length === 0;
  if (paginaCarregando()) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item container>
          <Grid item xs={12}>
            <Typography
              name="titulo-meus-investimentos"
              color="textSecondary"
              variant="h5"
              gutterBottom
            >
              Meus investimentos:
            </Typography>
          </Grid>
          {investimentos.length > 0 && (
            <Grid item xs={12}>
              <TabelaListagemInvestimento investimentos={investimentos} />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <TypographyBlackStyled
              color="textSecondary"
              variant="h5"
              gutterBottom
            >
              Comparação de rentabilidade (ao mês)
            </TypographyBlackStyled>
          </Grid>
          <Grid item xs={12}>
            <GraficoComparativo dadosComparativos={dadosGraficoComparativo} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Box mt={3}>
              <BotoesAcaoFooter
                botoesAcaoBoleto={botoesAcaoBoleto}
                handleNext={avancarStep}
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

// ResumoDeInvestimentos.title = 'Resumo de investimentos';
ResumoDeInvestimentos.label = 'Resumo de investimentos';
