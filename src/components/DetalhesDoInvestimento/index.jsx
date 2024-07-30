import React, { useEffect, useState } from 'react';

import InvestimentoApi from 'commons/resources/investimento';
import VantagensInvestimentoCreditoExpress from 'components/BoasVindasInfo/VantagensInvestimentoCreditoExpress';
import GraficoComparativo from 'components/GraficoComparativo';
import Box from 'components/MaterialUI/Box';
import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import { useAppGlobal } from 'providers/AppGlobal';

import BotoesAcaoFooter from '../FluxoInvestimento/BotoesDeAcaoFooter';
import CardTomador from './CardTomador';
import DetalhesDoInvestimentoLoader from './DetalhesDoInvestimentoLoader';
import Header from './Header';
import InvestimentoInfo from './InvestimentoInfo';
import ListagemDeParcelas from './ListagemDeParcelas';
import { GridTomadorStyled, TypographyBlackStyled } from './style';

export default function DetalhesDoInvestimento({
  investimentoSelecionado,
  handleBack,
  parametrosSistema,
  avancarStep,
  adicionarInvestimento,
  investimentos,
  isBeforeLastStep,
  botoesAcaoBoleto,
  enviarBoletoPorEmail,
  imprimirBoleto,
  setTelaValida,
  telaValida,
}) {
  const {
    id,
    simulacao: {
      dadosComparativos: dadosComparativosPreCalculados,
      valorLucro,
      valorParcela,
      parcelas,
    },
  } = investimentoSelecionado;
  const [detalhesDoInvestimento, setDetalhesDoInvestimento] = useState({
    empresa: {},
    negociacao: {},
    tomador: {},
  });
  const {
    empresa: { logo: logoObj, diaPagamento, nome: nomeEmpresa },
    negociacao: { qtdParcelas, taxaJuros, valor },
    tomador: { cidade, dataAdmissao, salario },
  } = detalhesDoInvestimento;
  const logoEmpresa =
    logoObj && logoObj.url_temporaria ? logoObj.url_temporaria : '';
  const [dadosGraficoComparativo, setDadosGraficoComparativo] = useState([]);
  const {
    tema: { nomeOrganizacao },
  } = useAppGlobal();

  useEffect(() => {
    if (id && parametrosSistema.length > 0) {
      buscaInvestimentos();
    }
  }, [id, parametrosSistema]); // eslint-disable-line react-hooks/exhaustive-deps

  const buscaInvestimentos = () => {
    carregarInvestimento().then(() => setTelaValida(true));
  };

  useEffect(() => {
    if (detalhesDoInvestimento && valor) {
      carregarDadosGrafico();
    }
  }, [detalhesDoInvestimento]); // eslint-disable-line react-hooks/exhaustive-deps

  const avancarHandler = () => {
    const investimentoExistente = investimentos.find(
      ({ id: idInv }) => idInv === id,
    );
    if (!investimentoExistente) {
      adicionarInvestimento(investimentoSelecionado);
    }
    avancarStep();
  };

  const paginaCarregando = () =>
    !!(!id || parametrosSistema.length === 0 || !valor);

  const carregarInvestimento = async () => {
    const detalhes = await InvestimentoApi.getDetalhesDoInvestimento(id);
    setDetalhesDoInvestimento(detalhes);
    return detalhes;
  };

  const carregarDadosGrafico = () => {
    const dadosComparativos = formataDadosGraficoComparativo();
    setDadosGraficoComparativo(dadosComparativos);
  };

  const formataDadosGraficoComparativo = () => {
    const {
      poupanca: {
        totalReceber: totalReceberPoupanca,
        rendimento: rendimentoPoupanca,
      },
      tesouro: {
        totalReceber: totalReceberTesouro,
        rendimento: rendimentoTesouro,
      },
      creditoExpress: {
        totalReceber: totalReceberCE,
        rendimento: rendimentoCE,
      },
    } = dadosComparativosPreCalculados;
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
        valor1: rendimentoCE,
        nome: nomeOrganizacao,
        texto: 'Total resgatado',
        valor2: totalReceberCE,
        size: 14,
        destaque: true,
      },
    ];
  };

  if (paginaCarregando()) {
    return <DetalhesDoInvestimentoLoader />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Header handleBack={handleBack} />
        </Grid>
        {valorParcela && (
          <Grid item xs={12} container>
            <Grid item xs={12} md={6}>
              <InvestimentoInfo
                valorParcela={valorParcela}
                valorLucro={valorLucro}
                valorInvestimento={valor}
                qtdParcelas={qtdParcelas}
                diaPagamento={diaPagamento}
                taxaRentabilidade={taxaJuros}
              />
            </Grid>
            <GridTomadorStyled item xs={12} md={6} container justify="flex-end">
              {salario && (
                <Grid item>
                  <CardTomador
                    logoEmpresa={logoEmpresa}
                    cidade={cidade}
                    dataAdmissao={dataAdmissao}
                    salario={salario}
                    nomeEmpresa={nomeEmpresa}
                  />
                </Grid>
              )}
            </GridTomadorStyled>
          </Grid>
        )}
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
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Parcelas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ListagemDeParcelas
            parcelas={parcelas}
            qtdPorPagina={6}
            maxHeight={0}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Por que é seguro seguro investir com a gente?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <VantagensInvestimentoCreditoExpress />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Box mt={3}>
              <BotoesAcaoFooter
                botoesAcaoBoleto={botoesAcaoBoleto}
                handleNext={avancarHandler}
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

// DetalhesDoInvestimento.title = 'Confirmar investimentos';
DetalhesDoInvestimento.label = 'Confirmar investimentos';
