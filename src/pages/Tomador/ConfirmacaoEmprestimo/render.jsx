import React from 'react';

import { Checkbox, FormControlLabel, Hidden } from '@material-ui/core';

import { Steper } from '@credito-express/ce-components';

import useSingleSession from '~/hooks/useSingleSession';

import pushRota from '~/routes/push';

import ConfirmacaoEmprestimoApi from '~/commons/resources/confirmacao-emprestimo';
import { moneyMask } from '~/commons/utils/MaskHandle';

import DialogAlertaSessao from '~/components/DialogAlertaSessao';
import DialogSessaoExpirada from '~/components/DialogSessaoExpirada';
import FooterMobileDetalhesEmprestimo from '~/components/FooterMobileDetalhesEmprestimo';
import HeaderTomador from '~/components/HeaderTomador';
import Loading from '~/components/Loading';
import Grid from '~/components/MaterialUI/Grid';

import ModalTipoDocumento from './FotosDocumentos/ModalTipoDocumento';
import {
  BoxContentStyled,
  ButtonNavigationStyled,
  DivContentStyled,
  GridButtonStyled,
  HeaderGridStyled,
  KeyboardBackspaceIconStyled,
  ParcelasStyled,
  SolicitarEmprestimoStyled,
  TituloStyled,
  ValorStyled,
  ValorTotalStyled,
  VoltarStyled,
  TextoInfoCopiaContratoStyled,
} from './style';

export default function ConfirmacaoEmprestimoRender({
  loadingModel,
  activeStep,
  steps,
  handleBackStep,
  negociacaoObj,
  calculo,
  StepEmExibicao,
  user,
  setNegociacaoObj,
  setValido,
  pessoa,
  exibirCheckBox,
  aceiteTermo,
  setAceiteTermo,
  valido,
  handleNextStep,
  processaAudioAssinatura,
  setCoordenadasGps,
  setExibirCheckBoxTermo,
  analyticsEventoSufixo = '',
  docNaoReconhecido,
  setDocNaoReconhecido,
  setStepDocVerso,
  setStepDocVersoReconhecido,
  setUsouACamera,
  ehFluxoEp,
  setFaceApi,
  realizouProvaVida,
  setRealizouProvaVida,
}) {
  const {
    simulacao: { valorDaParcela } = {},
    qtdParcelas,
    valor,
    status,
  } = negociacaoObj;

  const ehPrimeiroEnvioEp = ehFluxoEp && status === 'AGUARDANDO_TOMADOR';

  const {
    exibirModal,
    exibirModalSessaoEncerrada,
    sobreporSessao,
    cancelarSessao,
    finalizarSessao,
  } = useSingleSession('confirmacaoEmprestimo', pessoa.id, true);

  const confirmTipoDocumento = tipoDocumento => {
    if (tipoDocumento) {
      setNegociacaoObj({
        ...negociacaoObj,
        analiseDocumento: {
          ...negociacaoObj.analiseDocumento,
          tipoDocumentoIdentificacao: tipoDocumento,
        },
      });

      setDocNaoReconhecido(false);

      ConfirmacaoEmprestimoApi.confirmaTipoDocumento({
        idNegociacao: negociacaoObj.id,
        tipoDocumento,
      });
    }
  };

  return loadingModel || !StepEmExibicao ? (
    <Loading />
  ) : (
    <>
      <DialogAlertaSessao
        open={exibirModal}
        cancelarSessao={cancelarSessao}
        sobreporSessao={sobreporSessao}
      />
      <DialogSessaoExpirada
        open={exibirModalSessaoEncerrada}
        finalizarSessao={finalizarSessao}
        sobreporSessao={sobreporSessao}
      />
      <Grid container>
        <Hidden mdUp>
          <Grid item xs={12}>
            <HeaderTomador pessoa={pessoa} menuSelecionadoIdx={1} />
          </Grid>
        </Hidden>
        <HeaderGridStyled
          item
          xs={12}
          container
          justify="space-between"
          alignContent="center"
        >
          <Hidden smDown>
            {activeStep !== steps.length - 1 && (
              <Grid
                item
                xs={1}
                sm={1}
                lg={1}
                container
                alignContent="center"
                style={{ paddingLeft: '1%', cursor: 'pointer' }}
                onClick={handleBackStep}
              >
                <KeyboardBackspaceIconStyled />
                <Hidden xsDown>
                  <VoltarStyled>Voltar</VoltarStyled>
                </Hidden>
              </Grid>
            )}
          </Hidden>
          <Grid item xs={11} sm={8} lg={9}>
            {ehPrimeiroEnvioEp ? (
              <Steper
                activeStep={activeStep - 2}
                steps={steps.slice(2, 5)}
                exibirBotaoVoltar={activeStep !== steps.length - 1}
                btnVoltarClickHandler={
                  activeStep > 1
                    ? handleBackStep
                    : pushRota('/meus-emprestimos')
                }
              />
            ) : (
              <Steper
                activeStep={activeStep}
                steps={steps}
                exibirBotaoVoltar={activeStep !== steps.length - 1}
                btnVoltarClickHandler={handleBackStep}
              />
            )}
          </Grid>
          <Hidden xsDown>
            <Grid
              item
              sm={3}
              lg={2}
              container
              direction="column"
              justify="space-between"
              style={{ alignSelf: 'center', paddingRight: '1%' }}
            >
              <ValorTotalStyled>Valor Empréstimo</ValorTotalStyled>
              <ValorStyled>R$ {moneyMask(negociacaoObj.valor)}</ValorStyled>
              <ParcelasStyled>
                {calculo && calculo.parcelas
                  ? `${calculo.parcelas.length}  parcelas de R$ ${calculo.parcelas[0].valorParcela}`
                  : ''}
              </ParcelasStyled>
            </Grid>
          </Hidden>
        </HeaderGridStyled>
        <DivContentStyled>
          <Grid container spacing={2}>
            {activeStep !== steps.length - 1 && (
              <Grid
                item
                xs={12}
                container
                direction="column"
                justify="space-between"
              >
                <SolicitarEmprestimoStyled>
                  Solicitar Emprestimo
                </SolicitarEmprestimoStyled>
                <TituloStyled>{StepEmExibicao.title}</TituloStyled>
              </Grid>
            )}
            <Grid item xs={12}>
              <BoxContentStyled>
                <StepEmExibicao
                  usuarioAutenticado={user}
                  negociacao={negociacaoObj}
                  setNegociacao={setNegociacaoObj}
                  setValido={setValido}
                  calculo={calculo}
                  pessoa={pessoa}
                  handleNextStep={handleNextStep}
                  processaAudioAssinatura={processaAudioAssinatura}
                  setCoordenadasGps={setCoordenadasGps}
                  setExibirCheckBoxTermo={setExibirCheckBoxTermo}
                  analyticsEventoSufixo={analyticsEventoSufixo}
                  setStepDocVerso={setStepDocVerso}
                  setStepDocVersoReconhecido={setStepDocVersoReconhecido}
                  setUsouACamera={setUsouACamera}
                  realizouProvaVida={realizouProvaVida}
                  setRealizouProvaVida={setRealizouProvaVida}
                  ehFluxoEp={ehFluxoEp}
                  setFaceApi={setFaceApi}
                />
              </BoxContentStyled>
            </Grid>
          </Grid>
        </DivContentStyled>
        {activeStep !== steps.length - 1 && (
          <Grid item xs={12} container>
            <GridButtonStyled container justify="flex-end">
              {exibirCheckBox && (
                <>
                  <Hidden xsDown>
                    <Grid item xs={12} md={11} style={{ textAlign: 'right' }}>
                      <Grid container direction="column">
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                cy-element="checkboxTermo"
                                checked={aceiteTermo}
                                onChange={() => setAceiteTermo(!aceiteTermo)}
                              />
                            }
                            label="Li e concordo com os termos acima"
                          />
                        </Grid>
                        <Grid item xs={12} style={{ paddingRight: '10px' }}>
                          <TextoInfoCopiaContratoStyled
                            variant="subtitle1"
                            color="textSecondary"
                            gutterBottom
                          >
                            Você receberá uma cópia do contrato no seu e-mail
                          </TextoInfoCopiaContratoStyled>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Hidden smUp>
                    <Grid container justify="flex-end">
                      <Grid item xs={11}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              cy-element="checkboxTermo"
                              checked={aceiteTermo}
                              onChange={() => setAceiteTermo(!aceiteTermo)}
                            />
                          }
                          label="Li e concordo com os termos acima"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={11}
                        style={{ paddingTop: '6px', paddingBottom: '4px' }}
                      >
                        <TextoInfoCopiaContratoStyled
                          variant="caption"
                          color="textSecondary"
                        >
                          Você receberá uma cópia do contrato no seu e-mail
                        </TextoInfoCopiaContratoStyled>
                      </Grid>
                    </Grid>
                  </Hidden>
                </>
              )}
              <Hidden smDown>
                <Grid item xs={12} md={2} container justify="flex-end">
                  <ButtonNavigationStyled
                    cy-element="botaoAvancar"
                    secondary="true"
                    rounded="true"
                    disabled={!valido}
                    onClick={handleNextStep}
                  >
                    Avançar
                  </ButtonNavigationStyled>
                </Grid>
              </Hidden>
              <FooterMobileDetalhesEmprestimo
                handleNext={handleNextStep}
                botaoTexto="AVANÇAR"
                botaoHabilitado={valido}
                emprestimoEstaCalculado
                valorEmprestimo={valor}
                quantidadeParcelas={qtdParcelas}
                valorParcela={valorDaParcela}
              />
            </GridButtonStyled>
          </Grid>
        )}

        {docNaoReconhecido && (
          <ModalTipoDocumento
            open={docNaoReconhecido}
            btnConfirmHandler={confirmTipoDocumento}
          />
        )}
      </Grid>
    </>
  );
}
