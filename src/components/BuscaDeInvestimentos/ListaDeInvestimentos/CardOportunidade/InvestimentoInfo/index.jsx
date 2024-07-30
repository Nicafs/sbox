import React from 'react';

import { getTempoDeCarteira } from 'commons/utils';
import { moneyMask, percentMask } from 'commons/utils/MaskHandle';
import Box from 'components/MaterialUI/Box';
import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import Typography from 'components/MaterialUI/Typography';

import {
  InfoGridStyled,
  VerifiedUserIconStyled,
  TypographyValorStyled,
  VisibilityIconStyled,
} from './style';

// import { Container } from './styles';
export default function InvestimentoInfo({
  valor,
  salario,
  dataAdmissao,
  taxaRentabilidade,
  garantidoRecisao,
  qtdVisualizacoes,
  historicoTempoLimiteEmHoras,
  ultimaVisualizacao,
  children,
}) {
  const salarioFormatado = `R$ ${moneyMask(salario)}`;

  const renderHistoricoVisualizacao = () => (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="error">
          Visualizado {qtdVisualizacoes} vez
          {qtdVisualizacoes > 1 ? 'es' : ''} nas últimas{' '}
          {historicoTempoLimiteEmHoras} horas
        </Typography>
      </Grid>
      {ultimaVisualizacao && (
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="error">
            Última visualização em {ultimaVisualizacao}
          </Typography>
        </Grid>
      )}
    </>
  );

  const renderHistoricoVisualizacaoMobile = () => (
    <>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <VisibilityIconStyled />
          <Typography variant="subtitle1" color="error">
            {qtdVisualizacoes} {qtdVisualizacoes > 1 ? 'vezes' : 'vez'} nas
            últimas {historicoTempoLimiteEmHoras} horas
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography color="textSecondary" variant="subtitle1">
          Carteira assinada: {getTempoDeCarteira(dataAdmissao)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography name="salario" color="textSecondary" variant="subtitle1">
          Salário {salarioFormatado}
        </Typography>
      </Grid>
      <InfoGridStyled item xs={12}>
        <Container>
          <Box pt={1} pb={1}>
            <Grid container>
              <Grid item xs={12}>
                <TypographyValorStyled name="valor" variant="h5" gutterBottom>
                  {`R$ ${moneyMask(valor)}`}
                </TypographyValorStyled>
              </Grid>
              <Grid item xs={12}>
                <Typography name="rendimento" variant="subtitle1">
                  Rendimento: {percentMask(taxaRentabilidade)}% ao mês
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Garantido na recisão&nbsp;
                  {garantidoRecisao && <VerifiedUserIconStyled />}
                </Typography>
              </Grid>
              {qtdVisualizacoes > 0 && historicoTempoLimiteEmHoras && (
                <>
                  <Hidden smDown>{renderHistoricoVisualizacao()}</Hidden>
                  <Hidden mdUp>{renderHistoricoVisualizacaoMobile()}</Hidden>
                </>
              )}
              {children && (
                <Grid item xs={12}>
                  <Box mt={2}>{children}</Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </InfoGridStyled>
    </Grid>
  );
}
