import React from 'react';

import Typography from 'components/MaterialUI/Typography';
import moment from 'moment';

import GrafismoDireitoAsset from '../../assets/images/grafismo-header-direito.svg';
import GrafismoEsquerdoAsset from '../../assets/images/grafismo-header-esquerdo.svg';
import {
  GrafismoDireito,
  GrafismoEsquerdo,
  HashTag,
  SectionDstyled,
  TextoDestaque,
} from '../../containers/Institucional/style';
import GraficoComparativoSelic from '../GraficoComparativoSelic';
import Grafico from '../GraficoComparativoTaxas';
import LoaderCircular from '../LoaderCircular';
import Container from '../MaterialUI/Container';
import Grid from '../MaterialUI/Grid';
import Hidden from '../MaterialUI/Hidden';

const SectionGraficos = ({ sectionRef, dadosSelic, taxas }) => {
  const {
    cartaoCredito: taxaCartao = 0,
    chequeEspecial: taxaCheque = 0,
    creditoExpress: taxaCE = 0,
  } = taxas || {};

  const formatarDadosSelic = () => {
    try {
      const anoAtual = moment().format('YYYY');
      const dataInicial = moment().startOf('year').subtract(4, 'years');
      const dadosTratados = dadosSelic.map(({ data, valor }) => ({
        data: moment(data, 'DD/MM/YYYY'),
        valor: parseFloat(valor),
      }));
      const dadosUltimosAnos = dadosTratados.filter(
        ({ data }) => data >= dataInicial && data.format('YYYY') !== anoAtual,
      );
      const dadosAgrupadosPorAno = {};
      dadosUltimosAnos.forEach(dado => {
        const { data, valor } = dado;
        const key = data.format('YYYY');
        if (!dadosAgrupadosPorAno[key]) {
          dadosAgrupadosPorAno[key] = [];
        }
        dadosAgrupadosPorAno[key].push(valor);
      });
      const rendimentosAgrupadosPorAno = {};
      Object.keys(dadosAgrupadosPorAno).forEach(keyAno => {
        const dadosAnuais = dadosAgrupadosPorAno[keyAno];
        const rendimento =
          dadosAnuais.reduce((anterior, atual) => {
            return anterior + atual;
          }, 0) / dadosAnuais.length;
        rendimentosAgrupadosPorAno[keyAno] = rendimento;
      });
      const rendimentosFormatados = [];
      Object.keys(dadosAgrupadosPorAno).forEach(keyAno => {
        rendimentosFormatados.push({
          data: keyAno,
          valor: rendimentosAgrupadosPorAno[keyAno],
        });
      });

      if (rendimentosFormatados.length) {
        const ultimoDado = dadosTratados[dadosTratados.length - 1];
        const { valor: valorUltimoDado } = ultimoDado;
        rendimentosFormatados.push({ data: anoAtual, valor: valorUltimoDado });
      }

      return rendimentosFormatados;
    } catch (err) {
      console.error('Ocorreu um erro ao formatar os dados da Selic!!', err);
      return [];
    }
  };

  const dadosSelicFormatados = formatarDadosSelic();

  return (
    <SectionDstyled
      container
      justify="center"
      alignItems="center"
      ref={sectionRef}
    >
      <Hidden mdDown>
        <GrafismoEsquerdo top={1} src={GrafismoEsquerdoAsset} />
        <GrafismoDireito top={1} src={GrafismoDireitoAsset} />
      </Hidden>
      <Container maxWidth="lg">
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item md={4}>
            {dadosSelicFormatados.length ? (
              <Grid container direction="column">
                <Grid item>
                  <Grid container justify="center">
                    <GraficoComparativoSelic dados={dadosSelicFormatados} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary" variant="h5" align="center">
                    Taxa Selic
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container justify="center">
                <LoaderCircular />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={4}
            alignItems="center"
            justify="center"
            spacing={5}
          >
            <h1>
              <TextoDestaque>Por que</TextoDestaque> existimos?
            </h1>
            <p>
              Porque a remuneração dos investidores está no menor nível
              histórico, e as taxas de juros cobradas nos empréstimos são as
              maiores do mundo. Queremos revolucionar, venha com a gente.
            </p>
            <Grid container justify="center">
              <Grid item>
                <HashTag>#QuePaísÉEsse</HashTag>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            {taxaCartao && taxaCheque && taxaCE ? (
              <Grid container direction="column">
                <Grid item>
                  <Grid container justify="center">
                    <Grafico
                      taxaCE={taxaCE}
                      taxaCartao={taxaCartao}
                      taxaCheque={taxaCheque}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary" variant="h5" align="center">
                    Taxas de Crédito
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container justify="center">
                <LoaderCircular />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </SectionDstyled>
  );
};

export default SectionGraficos;
