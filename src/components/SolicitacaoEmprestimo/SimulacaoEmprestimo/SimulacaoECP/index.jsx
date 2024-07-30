import React, { useRef } from 'react';

import ResumoEmprestimoLoader from 'components/ResumoEmprestimo/loader';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import { useCreditoExpress } from '@credito-express/ce-components';

import FooterMobileSolicitacaoEmprestimo from '../../../FooterMobileSolicitacaoEmprestimo';
import LoaderCircular from '../../../LoaderCircular';
import Container from '../../../MaterialUI/Container';
import ResumoEmprestimo from '../../../ResumoEmprestimo';
import ExibicaoErros from '../../ExibicaoErros';
import BotaoToggleEmprestimo from '../BotaoToggleEmprestimo';
import CheckboxSeguro from '../CheckboxSeguro';
import FormSimulacaoEmprestimo from '../FormSimulacaoEmprestimo';
import GraficoSimulacaoEmprestimo from '../GraficoSimulacaoEmprestimo';

export default function SimulacaoECP({
  formik,
  motivos,
  resumeStatus,
  limites,
  valoresCalculados,
  taxaChequeEspecial,
  taxaCartaoCredito,
  calcularParcelaPorOrganizacao,
  seguroConsignadoDisponivel,
  intervaloEntreParcelas,
  btnVerCondicoesClickHandler,
  simulacaoValues,
  historicoSimulacaoLoading,
}) {
  const {
    state: {
      organizacao: { tipoFluxoEcp },
      pessoa: { parametrizacaoAtiva },
    },
  } = useCreditoExpress();

  const resumoCompleto = tipoFluxoEcp !== 'PORTOCRED' || parametrizacaoAtiva;

  const resumoRef = useRef(null);
  const { isValid: formSimulacaoValido } = simulacaoValues || {};
  const { isVisivel: resumoVisivel, isLoading: resumoLoading } = resumeStatus;
  const { maxParcelas, minParcelas, parcelasPossiveis } = limites;
  const { setFieldValue, values } = formik;
  const { objetivo } = values;
  const {
    valorParcela,
    juros,
    jurosAoMes,
    valorIof,
    valorIofAoDia,
    taxaIof,
    despesas,
    descricaoDespesas,
    totalApagar,
    dataPrimeiraParcela,
    valorSeguro,
    percSeguroConsignado,
  } = valoresCalculados;

  const emprestimoEstaCalculado =
    resumoVisivel && !resumoLoading && valorParcela;

  const handleSubmit = () => {
    setTimeout(() => {
      if (objetivo) {
        const elementoHtml = resumoRef.current;
        if (elementoHtml) {
          const { offsetTop: sectionOffsetTop } = elementoHtml;
          window.scrollTo(0, sectionOffsetTop);
        }
      }
    }, 500);
    if (resumoVisivel) {
      formik.handleSubmit();
    } else {
      calcularParcelaPorOrganizacao();
    }
  };

  const getFooterBotaoTexto = () => {
    if (emprestimoEstaCalculado) {
      if (!resumoCompleto) {
        return 'AVANÇAR';
      }
      return 'SOLICITAR AGORA';
    }
    return 'SIMULAR';
  };

  const getFooterBotaoHabilitado = () => {
    return (
      formSimulacaoValido &&
      objetivo &&
      !resumoLoading &&
      !historicoSimulacaoLoading
    );
  };

  return (
    <>
      <Container principal="true">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={resumoVisivel ? 8 : 12}>
              <Grid container direction="column">
                <FormSimulacaoEmprestimo
                  maxParcelas={maxParcelas}
                  minParcelas={minParcelas}
                  parcelasPossiveis={parcelasPossiveis}
                  motivos={motivos}
                  formik={formik}
                  intervaloEntreParcelas={intervaloEntreParcelas}
                />
                <Box>
                  {resumoVisivel &&
                    resumoCompleto &&
                    !resumoLoading &&
                    jurosAoMes &&
                    taxaChequeEspecial &&
                    taxaCartaoCredito && (
                      <>
                        <Typography
                          variant="h6"
                          align="center"
                          gutterBottom
                          style={{ marginTop: '5%' }}
                        >
                          Veja as vantagens do empréstimo consiginado:
                        </Typography>
                        <GraficoSimulacaoEmprestimo
                          taxaJuros={jurosAoMes}
                          taxaChequeEspecial={taxaChequeEspecial}
                          taxaCartaoCredito={taxaCartaoCredito}
                        />
                      </>
                    )}
                  {!resumoLoading && !historicoSimulacaoLoading && (
                    <Hidden smDown>
                      <BotaoToggleEmprestimo
                        isDisable={!formik.isValid}
                        isCalculoParcela={!resumoVisivel}
                        resumoCompleto={resumoCompleto}
                      />
                      <ExibicaoErros formik={formik} />
                    </Hidden>
                  )}
                </Box>
                {historicoSimulacaoLoading && (
                  <Grid item>
                    <Grid container justify="center" align="center" spacing={2}>
                      <Grid item>
                        <LoaderCircular />
                      </Grid>
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          style={{ paddingTop: 10 }}
                        >
                          Salvando simulação, por favor aguarde...
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {resumoVisivel ? (
              (resumoLoading && (
                <Grid item xs={12} md={4}>
                  <ResumoEmprestimoLoader resumoRef={resumoRef} />
                </Grid>
              )) || (
                <Grid item xs={12} md={4}>
                  <ResumoEmprestimo
                    resumoRef={resumoRef}
                    valor={formik.values.valor}
                    valorParcela={valorParcela}
                    qtdParcelas={formik.values.parcelas}
                    juros={juros}
                    jurosAoMes={jurosAoMes}
                    iof={valorIof + valorIofAoDia}
                    taxaIof={taxaIof}
                    valorDespesas={despesas}
                    descricaoDespesas={descricaoDespesas}
                    totalApagar={totalApagar}
                    dataPrimeiraParcela={dataPrimeiraParcela}
                    valorSeguro={valorSeguro}
                    percSeguroConsignado={percSeguroConsignado}
                    resumoCompleto={resumoCompleto}
                  />
                  {seguroConsignadoDisponivel && (
                    <Box mt={2}>
                      <CheckboxSeguro
                        value={formik.values.comSeguro}
                        onChange={() =>
                          setFieldValue('comSeguro', !formik.values.comSeguro)
                        }
                        btnVerCondicoesClickHandler={
                          btnVerCondicoesClickHandler
                        }
                      />
                    </Box>
                  )}
                </Grid>
              )
            ) : (
              <></>
            )}
            <Hidden mdUp>
              <Grid container>
                <Grid item xs={12}>
                  <ExibicaoErros formik={formik} />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </form>
      </Container>
      <FooterMobileSolicitacaoEmprestimo
        handleNext={handleSubmit}
        getBotaoTexto={getFooterBotaoTexto}
        getBotaoHabilitado={getFooterBotaoHabilitado}
      />
    </>
  );
}

/* eslint-disable react/forbid-prop-types */
SimulacaoECP.propTypes = {
  formik: PropTypes.object.isRequired,
  resumeStatus: PropTypes.object.isRequired,
  limites: PropTypes.object.isRequired,
  motivos: PropTypes.array.isRequired,
  valoresCalculados: PropTypes.object.isRequired,
  calcularParcelaPorOrganizacao: PropTypes.func.isRequired,
};
