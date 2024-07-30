import React from 'react';

import CardContent from 'components/MaterialUI/CardContent';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import Typography from 'components/MaterialUI/Typography';
import { useAppGlobal } from 'providers/AppGlobal';

import InvestimentoInfo from './InvestimentoInfo';
import {
  ImagemLogo,
  CardStyled,
  GridLogoStyled,
  ButtonAdicionarStyled,
  ButtonAdicionarIcone,
  TypographyButtonStyled,
} from './style';

// import { Container } from './styles';

export default function CardOportunidade({
  name,
  garantidoRecisao,
  taxaRentabilidade,
  valor,
  dataAdmissao,
  salario,
  logoEmpresa,
  nomeEmpresa,
  investimentoEstaSelecionado,
  adicionarInvestimentoCarrinho,
  qtdVisualizacoes,
  visualizacoesTempoLimite,
  ultimaVisualizacao,
}) {
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const renderBotaoAdicionar = () => (
    <ButtonAdicionarStyled
      name="botaoAdicionar"
      rounded="true"
      outlinePrimary="true"
      fullWidth
      onClick={adicionarInvestimentoCarrinho}
    >
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item>
          <ButtonAdicionarIcone src={getIcone('icon-button-porco-verde')} />
        </Grid>
        <Grid item>
          <TypographyButtonStyled>Adicionar</TypographyButtonStyled>
        </Grid>
      </Grid>
    </ButtonAdicionarStyled>
  );

  return (
    <CardStyled
      name={name}
      elevation={0}
      variant="outlined"
      selecionado={investimentoEstaSelecionado}
    >
      <CardContent style={{ height: '100%' }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={12}>
            <GridLogoStyled
              style={{ height: '100%' }}
              container
              alignItems="center"
              justify="space-between"
              direction="column"
              spacing={2}
            >
              <Grid item container alignItems="center" justify="space-between">
                <Typography
                  name="empresa"
                  variant="body1"
                  color="textSecondary"
                >
                  {nomeEmpresa}
                </Typography>
                {logoEmpresa && <ImagemLogo src={logoEmpresa} />}
              </Grid>
            </GridLogoStyled>
          </Grid>
          <Grid item xs={12} container alignItems="flex-end">
            <Hidden smUp>
              <InvestimentoInfo
                valor={valor}
                salario={salario}
                dataAdmissao={dataAdmissao}
                taxaRentabilidade={taxaRentabilidade}
                garantidoRecisao={garantidoRecisao}
                qtdVisualizacoes={qtdVisualizacoes}
                historicoTempoLimiteEmHoras={visualizacoesTempoLimite}
                ultimaVisualizacao={ultimaVisualizacao}
              >
                {renderBotaoAdicionar()}
              </InvestimentoInfo>
            </Hidden>
            <Hidden mdDown>
              <InvestimentoInfo
                valor={valor}
                salario={salario}
                dataAdmissao={dataAdmissao}
                taxaRentabilidade={taxaRentabilidade}
                garantidoRecisao={garantidoRecisao}
                qtdVisualizacoes={qtdVisualizacoes}
                historicoTempoLimiteEmHoras={visualizacoesTempoLimite}
                ultimaVisualizacao={ultimaVisualizacao}
              >
                {renderBotaoAdicionar()}
              </InvestimentoInfo>
            </Hidden>
          </Grid>
        </Grid>
      </CardContent>
    </CardStyled>
  );
}
