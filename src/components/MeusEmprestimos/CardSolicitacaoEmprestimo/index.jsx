import React, { useMemo, useState, useEffect } from 'react';

import { Link } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

import pushRota from '~/routes/push';

import Api from '~/commons/resources/api/api';
import Negociacao from '~/commons/resources/negociacao';
import { moneyMask } from '~/commons/utils/MaskHandle';

import { useAppGlobal } from '~/providers/AppGlobal';

import Box from '~/components/MaterialUI/Box';
import Button from '~/components/MaterialUI/Button';
import Divider from '~/components/MaterialUI/Divider';
import Grid from '~/components/MaterialUI/Grid';
import Hidden from '~/components/MaterialUI/Hidden';

import EmprestimoStatusStepper from '../../EmprestimoStatusStepper';
import ResumoEmprestimo from '../../ResumoEmprestimo';
import { Titulo, ButtonStyled, TextoLimite } from './styles';

export default function CardSolicitacaoEmprestimo({
  negociacao,
  abrirModalContaBancaria,
  abrirModalCancelamento,
}) {
  const {
    state: {
      organizacao: { tipoFluxoEcp, tipoFluxoEp },
      pessoa: { parametrizacaoAtiva, parametrizacoes },
    },
  } = useCreditoExpress();
  const {
    actions: { getIcone },
  } = useAppGlobal();
  let pametrizacaoTomador;
  if (parametrizacoes && parametrizacoes.length > 0)
    pametrizacaoTomador = parametrizacoes[parametrizacoes.length - 1];

  const resumoCompleto =
    tipoFluxoEcp === 'P2P' || tipoFluxoEp || parametrizacaoAtiva;
  const firebase = useFirebase();
  const [negociacaoOriginal, setNegociacaoOriginal] = useState({});
  const [valoresLimites, setValoresLimites] = useState();
  const [linkPdfTadf, setLinkPdfTadf] = useState('');
  const { status, id: idNegociacao } = negociacao;
  const idNegociacaoOriginal = negociacao.portocred
    ? negociacao.portocred.idNegociacaoOriginal
    : null;
  const [valoresNovos, setValoresNovos] = useState(true);
  const { valor, qtdParcelas, taxaJuros, cetAnual, cetMensal } = valoresNovos
    ? negociacao
    : negociacaoOriginal;
  const emprestimo = valoresNovos
    ? negociacao.simulacao
    : negociacaoOriginal.simulacao;
  const {
    valorDaParcela,
    valorAPagar,
    valorSeguro,
    parametrizacao,
    dataPrimeiraParcela,
    valorJuros,
    valorIof,
    parametrizacao: { taxaIof },
  } = emprestimo;

  const resumoBotaoAcaoConfig = useMemo(
    () => ({
      AGUARDANDO_TOMADOR: {
        botaoNome: 'btnAguardandoTomador',
        botaoTitulo: 'Confirmar empréstimo',
        onClick: () => {
          pushRota({
            pathname: '/confirma-emprestimo',
            state: { idNegociacao, analyticsEventoSufixo: '' },
          });
          firebase.analytics().logEvent('iniciou_confirmacao_emprestimo');
        },
      },
      PENDENCIA_CONFIRMACAO_EMPRESTIMO: {
        botaoNome: 'btnPendenciaConfirmacaoEmprestimo',
        botaoTitulo: 'Reenviar Documentos',
        onClick: () => {
          pushRota({
            pathname: '/confirma-emprestimo',
            state: { idNegociacao, analyticsEventoSufixo: '_pendencia' },
          });
          firebase.analytics().logEvent('iniciou_reenvio_documentos');
        },
      },
      AGUARDANDO_TOMADOR_CONFIRMAR_VALORES: {
        botaoNome: 'btnAguardandoTomadorConfirmarValores',
        botaoTitulo: 'Confirmar Valores',
        onClick: () => {
          pushRota({
            pathname: '/confirma-emprestimo',
            state: { idNegociacao, analyticsEventoSufixo: '_valores' },
          });
          firebase.analytics().logEvent('iniciou_confirmacao_valores');
        },
      },
      AGUARDANDO_NOVA_CONTA: {
        botaoNome: 'btnReenviarConta',
        botaoTitulo: 'Reenviar Conta',
        onClick: () => {
          firebase.analytics().logEvent('iniciou_fluxo_nova_conta');
          abrirModalContaBancaria();
        },
      },
    }),
    [negociacao], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const podeCancelar =
    status === 'AGUARDANDO_TOMADOR' ||
    status === 'PENDENCIA_CONFIRMACAO_EMPRESTIMO' ||
    status === 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES' ||
    status === 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED' ||
    status === 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED' ||
    status === 'AGUARDANDO_APROVACAO_RH' ||
    status === 'AGUARDANDO_APROVACAO';

  const tadfDisponivel =
    status === 'AGUARDANDO_APROVACAO_RH_SITE_PORTOCRED' ||
    status === 'AGUARDANDO_REPROVACAO_RH_SITE_PORTOCRED' ||
    status === 'AGUARDANDO_APROVACAO_RH' ||
    status === 'AGUARDANDO_APROVACAO';

  const handleResumoBotaoAcao = () => {
    const config = resumoBotaoAcaoConfig[status];
    if (config) {
      const { onClick } = config;
      onClick();
    } else {
      console.error(
        `Config não encontrada para o status ${status}! (handleResumoBotaoAcao)`,
      );
    }
  };

  const valoresLimitesFunc = async () => {
    if (tipoFluxoEp === 'BANCO_SEMEAR') {
      setValoresLimites(
        await Api.request(
          `/ep/simulacao-emprestimo/valores-limites?nova_simulacao=true&id_negociacao_atual=${negociacao.id}`,
          {
            method: 'GET',
          },
        ),
      );
    } else {
      setValoresLimites(
        await Api.request(
          `/simulacao-emprestimo/valores-limites?nova_simulacao=true&id_negociacao_atual=${negociacao.id}`,
          {
            method: 'GET',
          },
        ),
      );
    }
  };

  const carregarLinkPdfTadf = async () => {
    const nomeArquivo = 'TADF.pdf';
    try {
      const { link } = await Api.request({
        url: `/negociacao/downloadArquivoNegociacao`,
        data: { nomeArquivo, idNegociacao },
        method: 'POST',
      });
      setLinkPdfTadf(link);
    } catch (err) {
      console.error(
        `Ocorreu um erro ao gerar link do pdf: ${nomeArquivo}`,
        err,
      );
    }
  };

  useEffect(() => {
    if (status === 'AGUARDANDO_TOMADOR') {
      valoresLimitesFunc();
    }
    if (tadfDisponivel) {
      carregarLinkPdfTadf();
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const buscarNegociacaoOriginal = async id => {
      setNegociacaoOriginal(await Negociacao.buscarPorId(id));
    };

    if (idNegociacaoOriginal) buscarNegociacaoOriginal(idNegociacaoOriginal);
  }, [idNegociacaoOriginal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container direction="column">
      <Titulo>Sua solicitação</Titulo>
      <Grid item container xs={12}>
        <Grid item xs={12} md={5} style={{ alignSelf: 'center' }}>
          <ResumoEmprestimo
            valor={valor}
            qtdParcelas={qtdParcelas}
            valorParcela={valorDaParcela}
            totalApagar={valorAPagar}
            withCard={false}
            valorSeguro={valorSeguro || 0}
            dataPrimeiraParcela={dataPrimeiraParcela}
            parametrizacao={parametrizacao}
            statusNegociacao={status}
            juros={valorJuros}
            iof={valorIof}
            taxaIof={taxaIof}
            jurosAoMes={taxaJuros}
            cetAnual={cetAnual}
            cetMensal={cetMensal}
            mostra
            pers
            percSeguroConsignado={parametrizacao.percSeguroConsignado || 0}
            resumoCompleto={resumoCompleto}
          />
          {resumoBotaoAcaoConfig[status] && (
            <Box mt={3} spacing={2}>
              {status === 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES' && (
                <Grid container justify="space-around">
                  <ButtonStyled
                    rounded="true"
                    variant={valoresNovos ? 'outlined' : 'text'}
                    onClick={() => setValoresNovos(true)}
                  >
                    Valores Novos
                  </ButtonStyled>
                  <ButtonStyled
                    rounded="true"
                    variant={valoresNovos ? 'text' : 'outlined'}
                    onClick={() => setValoresNovos(false)}
                  >
                    Valores Antigos
                  </ButtonStyled>
                </Grid>
              )}
              <Button
                name={resumoBotaoAcaoConfig[status].botaoNome}
                cy-element="meusEmprestimos"
                primary="true"
                rounded="true"
                fullWidth
                onClick={handleResumoBotaoAcao}
              >
                {resumoBotaoAcaoConfig[status].botaoTitulo}
              </Button>

              {status === 'AGUARDANDO_TOMADOR' &&
                tipoFluxoEp !== 'BANCO_SEMEAR' && (
                  <>
                    <Button
                      style={{ marginTop: '10px' }}
                      name="nova-simulacao"
                      cy-element="nova-simulacao"
                      variant="outlined"
                      rounded="true"
                      fullWidth
                      onClick={() =>
                        pushRota('/simular-emprestimo', {
                          idNegociacao: negociacao.id,
                        })
                      }
                    >
                      Fazer nova Simulação
                    </Button>
                    {valoresLimites && (
                      <TextoLimite>
                        Você tem um limite pré-aprovado de R${' '}
                        {moneyMask(valoresLimites?.valorMaximo)}
                        {pametrizacaoTomador &&
                          `em até ${pametrizacaoTomador?.maxParcelas}
                       X, com parcelas máximas de R$ ${moneyMask(
                         pametrizacaoTomador?.valorMaximoParcela,
                       )}`}
                      </TextoLimite>
                    )}
                  </>
                )}
            </Box>
          )}
          {linkPdfTadf && (
            <Grid
              style={{
                margin: '20px 0',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Grid item>
                <AssignmentIcon style={{ fontSize: 20, marginRight: 10 }} />
              </Grid>
              <Grid item>
                <Link
                  href=""
                  target="_blank"
                  variant="body1"
                  color="textPrimary"
                  onClick={() => window.open(linkPdfTadf)}
                >
                  Termo de Autorização para Desconto em Folha
                </Link>
              </Grid>
            </Grid>
          )}
          {podeCancelar && (
            <Button
              style={{ marginTop: '10px', color: 'grey', borderColor: 'grey' }}
              name="cancela-solicitacao"
              cy-element="cancela-solicitacao"
              variant="outlined"
              rounded="true"
              fullWidth
              onClick={() => abrirModalCancelamento()}
            >
              Cancelar solicitação
            </Button>
          )}
        </Grid>
        <Grid item container justify="center" xs={12} md={1}>
          <Hidden mdDown>
            <Divider orientation="vertical" />
          </Hidden>
        </Grid>
        <Grid item container xs={12} md={6}>
          <EmprestimoStatusStepper
            negociacao={negociacao}
            tipoFluxoEcp={tipoFluxoEcp}
            tipoFluxoEp={tipoFluxoEp}
            getIcone={getIcone}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
