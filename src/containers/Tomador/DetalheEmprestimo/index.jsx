import React, { useEffect, useMemo, useState } from 'react';

import ValorInfo from 'components/DetalheEmprestimo/ValorInfo';
import ListagemDeParcelas from 'components/DetalhesDoInvestimento/ListagemDeParcelas';
import GraficoComparativo from 'components/GraficoComparativo';
import HeaderTomador from 'components/HeaderTomador';
import TomadorTituloBox from 'components/TomadorTituloBox';
import { useAppGlobal } from 'providers/AppGlobal';
import pushRota from 'routes/push';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';

import {
  CardDocumentosNegociacao,
  useCreditoExpress,
} from '@credito-express/ce-components';

import { getFileUrl } from '~/commons/hooks/Firebase/storage';
import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';

import buscarDocumentosSemear from '~/pages/Tomador/ConfirmacaoEmprestimo/TermoEmprestimo/firestoreSemear';

import LoaderCircular from '~/components/LoaderCircular';

import { realizaCalculoSimulacao } from './calculos';

export default function DetalheEmprestimo({
  negociacao,
  empresa,
  taxaChequeEspecial,
  taxaCartaoCredito,
  ehFluxoEp,
}) {
  // const [saldoDevedor, setSaldoDevedor] = useState(null);
  const [dadosSimulacao, setDadosSimulacao] = useState(null);
  const [dadosGraficoComparativo, setDadosGraficoComparativo] = useState(null);
  const [parcelasFormatadas, setParcelasFormatadas] = useState([]);
  const [linkContratoEp, setLinkContratoEp] = useState('');
  const [linkBoletoEp, setLinkBoletoEp] = useState('');
  const [atualizaContratoEp, setAtualizaContratoEp] = useState(false);
  const [atualizaBoletoEp, setAtualizaBoletoEp] = useState(false);

  const {
    valor,
    id: idNegociacao,
    status: statusNegociacao,
    portocred: ehPortocred,
    dadosTomador: { pessoa: idPessoa },
  } = negociacao;
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const {
    state: { pessoa, organizacao },
  } = useCreditoExpress();
  useEffect(() => {
    realizaConfiguracoesIniciais().then();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => pushRota('/meus-emprestimos');

  const realizaConfiguracoesIniciais = async () => {
    if (empresa) {
      try {
        const simCreditoExpressPromise = realizaCalculoSimulacao(
          'creditoExpress',
          negociacao,
          empresa,
          taxaChequeEspecial,
          taxaCartaoCredito,
          organizacao,
        );
        const simChequeEspecialPromise = realizaCalculoSimulacao(
          'chequeEspecial',
          negociacao,
          empresa,
          taxaChequeEspecial,
          taxaCartaoCredito,
          organizacao,
        );
        const simCartaoCreditoPromise = realizaCalculoSimulacao(
          'cartaoCredito',
          negociacao,
          empresa,
          taxaChequeEspecial,
          taxaCartaoCredito,
          organizacao,
        );
        const [
          simCreditoExpress,
          simChequeEspecial,
          simCartaoCredito,
        ] = await Promise.all([
          simCreditoExpressPromise,
          simChequeEspecialPromise,
          simCartaoCreditoPromise,
        ]);

        setDadosSimulacao({
          simulacaoCreditoExpress: simCreditoExpress,
          simulacaoChequeEspecial: simChequeEspecial,
          simulacaoCartaoCredito: simCartaoCredito,
        });
      } catch (err) {
        const msgErro = err.erro;
        console.log(msgErro);
        exibirAlerta(msgErro, 'error');
      }
    }
  };

  const calculaTamanhoGrafico = (chequeValor, cartaoValor, creditoValor) => {
    const tamanhoLimite = 22;
    const valorMaior = [chequeValor, cartaoValor, creditoValor].reduce(
      (anterior, atual) => (atual > anterior ? atual : anterior),
      0,
    );
    return {
      tamanhoChequeEspecial: (chequeValor / valorMaior) * tamanhoLimite,
      tamanhoCartaoCredito: (cartaoValor / valorMaior) * tamanhoLimite,
      tamanhoCreditoExpress: (creditoValor / valorMaior) * tamanhoLimite,
    };
  };

  const formataDadosComparativos = paramDadosSimulacao => {
    const {
      simulacaoChequeEspecial,
      simulacaoCartaoCredito,
      simulacaoCreditoExpress,
    } = paramDadosSimulacao;

    const {
      juros: chequeEspecialJuros,
      totalApagar: chequeEspecialTotal,
    } = simulacaoChequeEspecial;
    const {
      juros: cartaoCreditoJuros,
      totalApagar: cartaoCreditoTotal,
    } = simulacaoCartaoCredito;
    const {
      juros: creditoJuros,
      totalApagar: creditoTotal,
    } = simulacaoCreditoExpress;
    const {
      tamanhoChequeEspecial,
      tamanhoCartaoCredito,
      tamanhoCreditoExpress,
    } = calculaTamanhoGrafico(
      chequeEspecialTotal,
      cartaoCreditoTotal,
      creditoTotal,
    );
    const dados = [
      {
        tipo: 'cartao-credito',
        titulo1: 'Juros',
        valor1: cartaoCreditoJuros,
        nome: 'Cartão de Crédito',
        texto: 'Total a pagar',
        valor2: cartaoCreditoTotal,
        size: tamanhoCartaoCredito,
        destaque: false,
      },
      {
        tipo: 'cheque-especial',
        titulo1: 'Juros',
        valor1: chequeEspecialJuros,
        nome: 'Cheque Especial',
        texto: 'Total a pagar',
        valor2: chequeEspecialTotal,
        size: tamanhoChequeEspecial,
        destaque: false,
      },
      {
        tipo: 'credito-express',
        titulo1: 'Juros',
        valor1: creditoJuros,
        nome: 'Crédito Express',
        texto: 'Total a pagar',
        valor2: creditoTotal,
        size: tamanhoCreditoExpress,
        destaque: true,
      },
    ];
    setDadosGraficoComparativo(dados);
  };

  const formataParcelas = () => {
    const {
      emprestimo: { parcelas, valorDaParcela },
    } = negociacao;

    const parcelasAtualizadas = parcelas.map(
      ({ numero, pago, dataVencimento }) => {
        const dataVencimentoMoment = transformarDataApiParaDataLocal(
          dataVencimento,
        );
        const dataVencimentoFormatada = dataVencimentoMoment.format(
          'DD/MM/YYYY',
        );
        return {
          numero,
          dataVencimentoMoment,
          dataVencimento: dataVencimentoFormatada,
          valor: valorDaParcela,
          pago,
        };
      },
    );
    setParcelasFormatadas(parcelasAtualizadas);
  };

  useEffect(() => {
    if (ehFluxoEp) {
      buscarDocumentosSemear(idNegociacao, 'cedula', setLinkContratoEp);
    }
  }, [idNegociacao, ehFluxoEp, atualizaContratoEp]);

  useEffect(() => {
    if (ehFluxoEp) {
      buscarDocumentosSemear(idNegociacao, 'carne', setLinkBoletoEp);
    }
  }, [idNegociacao, ehFluxoEp, atualizaBoletoEp]);

  useEffect(() => {
    if (dadosSimulacao) {
      formataDadosComparativos(dadosSimulacao);
    }
  }, [dadosSimulacao]); // eslint-disable-line react-hooks/exhaustive-deps

  // const getSaldoDevedor = async paramNegociacao => {
  //   const { id } = paramNegociacao;
  //   const {
  //     saldoDevedor: saldoDevedorAtual,
  //   } = await NegociacaoApi.saldoDevedor(id);
  //   setSaldoDevedor(saldoDevedorAtual);
  // };

  useMemo(() => {
    if (negociacao) {
      // getSaldoDevedor(negociacao);

      if (negociacao.emprestimo) {
        formataParcelas();
      }
    }
  }, [negociacao]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box mt={3}>
      <Container maxWidth="lg">
        <HeaderTomador pessoa={pessoa} menuSelecionadoIdx={null} />
        <TomadorTituloBox
          titulo="Detalhes do empréstimo"
          handleBack={handleBack}
        />
        <Box mt={4}>
          <Grid container spacing={6}>
            <Grid item xs={12} container spacing={4} justify="space-around">
              <Grid item name="valorEmprestimo">
                <ValorInfo label="VALOR DO EMPRÉSTIMO" valor={valor} />
              </Grid>
              {/* {saldoDevedor ? (
                <Grid item name="saldoDevedor">
                  <ValorInfo label="SALDO DEVEDOR ATUAL" valor={saldoDevedor} />
                </Grid>
              ) : null} */}
              <Grid item>
                {!ehFluxoEp ? (
                  <CardDocumentosNegociacao
                    idPessoa={idPessoa}
                    idNegociacao={idNegociacao}
                    statusNegociacao={statusNegociacao}
                    ehPortocred={!!ehPortocred}
                    getFileUrl={getFileUrl}
                  />
                ) : (
                  <>
                    <ValorInfo label="DOCUMENTOS DA NEGOCIAÇÃO" />
                    {linkContratoEp ? (
                      <ListItem
                        key="contratoEp"
                        button
                        onClick={() => {
                          setAtualizaContratoEp(!atualizaContratoEp);
                          window.open(linkContratoEp);
                        }}
                      >
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contrato" />
                      </ListItem>
                    ) : (
                      <p>Contrato indisponível no momento</p>
                    )}
                    {linkBoletoEp ? (
                      <ListItem
                        key="boletoEp"
                        button
                        onClick={() => {
                          setAtualizaBoletoEp(!atualizaBoletoEp);
                          window.open(linkBoletoEp);
                        }}
                      >
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Boleto" />
                      </ListItem>
                    ) : (
                      <p>Boleto indisponível no momento</p>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
            {!ehFluxoEp && (
              <Grid item xs={12}>
                <Typography align="center" variant="h5" color="textSecondary">
                  Gráfico Comparativo
                </Typography>
                {dadosGraficoComparativo ? (
                  <GraficoComparativo
                    dadosComparativos={dadosGraficoComparativo}
                  />
                ) : (
                  <Grid container justify="center">
                    <LoaderCircular />
                  </Grid>
                )}
              </Grid>
            )}
            {negociacao.emprestimo ? (
              <Grid item xs={12}>
                <ListagemDeParcelas
                  parcelas={parcelasFormatadas}
                  qtdPorPagina={6}
                  maxHeight={0}
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography align="center" variant="h5" color="textSecondary">
                  Essa negociação ainda não possui parcelas
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
