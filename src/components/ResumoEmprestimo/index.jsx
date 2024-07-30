import React from 'react';

import Box from 'components/MaterialUI/Box';
import Card from 'components/MaterialUI/Card';
import CardContent from 'components/MaterialUI/CardContent';
import Divider from 'components/MaterialUI/Divider';
import Grid from 'components/MaterialUI/Grid';
import TextField from 'components/MaterialUI/TextField';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { transformarDataApiParaDataLocal } from '../../commons/tratativasParaDatasApi';
import { moneyMask, percentMask } from '../../commons/utils/MaskHandle';
import {
  // DataPrimeiraParcela,
  Item,
  Titulo,
  TypographyObsStyled,
  // ValorParcela,
} from './style';

export default function ResumoEmprestimo({
  withCard,
  valor,
  qtdParcelas,
  valorParcela,
  jurosAoMes,
  iof,
  taxaIof,
  valorDespesas,
  descricaoDespesas,
  dataPrimeiraParcela,
  valorSeguro,
  percSeguroConsignado,
  resumoRef,
  statusNegociacao,
  textoOpcional,
  resumoCompleto = true,
  cetAnual,
  cetMensal,
}) {
  function renderResumo() {
    const ehAproximado = () => {
      return !(
        statusNegociacao === 'APROVADO' ||
        statusNegociacao === 'AGUARDANDO_TRANSFERENCIA' ||
        statusNegociacao === 'TRANSFERENCIA_SOLICITADA' ||
        statusNegociacao === 'TRANSFERENCIA_CONFIRMADA' ||
        statusNegociacao === 'AGUARDANDO_NOVA_CONTA' ||
        statusNegociacao === 'GRANA_NA_CONTA'
      );
    };

    // const prazoIof = new Date('2020-12-31');

    return (
      <Grid container direction="column" ref={resumoRef}>
        <Titulo style={{ whiteSpace: 'initial' }}>
          {`Resumo dos valores ${ehAproximado() ? 'aproximados' : ''} 
          ${textoOpcional || ''}`}
        </Titulo>
        {valor && (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Valor do empréstimo</p>
                  <TextField
                    type="tel"
                    required
                    value={moneyMask(valor) || ''}
                    currency
                    currencyRenderer={({ value }) => (
                      <h2 cy-element="valorEmprestimo">R$ {value}</h2>
                    )}
                  />
                </Grid>
                <Grid item>
                  <span>a receber</span>
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        )}
        {qtdParcelas && resumoCompleto && (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Valor das parcelas</p>
                  <TextField
                    type="tel"
                    required
                    value={moneyMask(valorParcela) || ''}
                    currency
                    currencyRenderer={({ value }) => (
                      <div cy-element="valorParcela">
                        <h2 cy-element="qtd-parcelas">R$ {value}</h2>
                      </div>
                    )}
                  />
                </Grid>
                <Grid item>
                  <span>{qtdParcelas}x</span>
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        )}
        {!resumoCompleto && (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Parcelamento</p>
                  <TextField
                    type="tel"
                    required
                    value={qtdParcelas || ''}
                    currency
                    currencyRenderer={() => (
                      <h2 cy-element="qtdParcelas">{qtdParcelas}x</h2>
                    )}
                  />
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        )}
        {!!valorSeguro && (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Valor do seguro</p>

                  <TextField
                    type="tel"
                    required
                    value={valorSeguro || ''}
                    currency
                    currencyRenderer={({ value }) => (
                      <h2 cy-element="valorSeguro">R$ {value}</h2>
                    )}
                  />
                </Grid>
                <Grid item>
                  <span>
                    {percentMask(percSeguroConsignado || valorSeguro / valor)}%
                  </span>
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        )}
        {jurosAoMes && resumoCompleto && (
          <>
            {/* <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Juros</p>
                  <TextField
                    type="tel"
                    required
                    value={juros}
                    currency
                    currencyRenderer={({ value }) => <h1>R$ {value}</h1>}
                  />
                </Grid>
                <Grid item>
                  <span>{percentMask(jurosAoMes)}% a.m.</span>
                </Grid>
              </Item>
            </Grid> */}

            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Juros</p>
                  <TextField
                    type="tel"
                    required
                    value={jurosAoMes}
                    currency
                    currencyRenderer={() => <h1>{percentMask(jurosAoMes)}%</h1>}
                  />
                </Grid>
                <Grid item>
                  <span>a.m.</span>
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        )}
        {iof && resumoCompleto ? (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>IOF</p>
                  <TextField
                    type="tel"
                    required
                    value={iof || ''}
                    currency
                    currencyRenderer={({ value }) => <h1>R$ {value}</h1>}
                  />
                </Grid>
                <Grid item>
                  <span>{percentMask(taxaIof)}% a.m.</span>
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        ) : null}
        {cetAnual && cetAnual > 0 && resumoCompleto ? (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>CET Anual</p>
                  <TextField
                    type="tel"
                    required
                    value={cetAnual}
                    currency
                    currencyRenderer={() => <h1>{percentMask(cetAnual)}%</h1>}
                  />
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        ) : null}
        {cetMensal && cetMensal > 0 && resumoCompleto ? (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>CET Mensal</p>
                  <TextField
                    type="tel"
                    required
                    value={cetMensal}
                    currency
                    currencyRenderer={() => <h1>{percentMask(cetMensal)}%</h1>}
                  />
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        ) : null}
        {/* new Date().getTime() < prazoIof.getTime() && (
            <>
              <Grid container justify="center">
                <Item
                  container
                  item
                  xs={12}
                  direction="column"
                  style={{ textDecoration: 'line-through' }}
                >
                  <Grid container justify="space-between">
                    <p>IOF</p>
                    <TextField
                      type="tel"
                      required
                      value={iof || ''}
                      currency
                      currencyRenderer={() => <h1>0,38%</h1>}
                    />
                  </Grid>
                  <Grid item>
                    <span>a.m.</span>
                  </Grid>
                </Item>
                <Grid item>
                  <span style={{ color: 'red' }}>
                    Aproveite o IOF zerado até 31/12/2020
                  </span>
                </Grid>
              </Grid>
              <Box mt={2} mb={2}>
                <Divider />
              </Box>
            </>
          )
        )} */}
        {valorDespesas > 0 && resumoCompleto ? (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>{descricaoDespesas}</p>
                  <TextField
                    type="tel"
                    required
                    value={valorDespesas || 0}
                    currency
                    currencyRenderer={({ value }) => <h2>R$ {value}</h2>}
                  />
                </Grid>
              </Item>
            </Grid>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
          </>
        ) : null}
        {/* {totalApagar && (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Total a pagar</p>
                  <TextField
                    type="tel"
                    required
                    value={totalApagar || ''}
                    currency
                    currencyRenderer={({ value }) => (
                      <h2 cy-element="valorTotalApagar">R$ {value}</h2>
                    )}
                  />
                </Grid>
              </Item>
            </Grid>
          </>
        )} */}
        {dataPrimeiraParcela && (
          <>
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <p>Previsão primeira parcela</p>
                  <TextField
                    type="tel"
                    required
                    currency
                    currencyRenderer={() => (
                      <h2 cy-element="dataPrimeiraParcela">
                        {transformarDataApiParaDataLocal(
                          dataPrimeiraParcela,
                        ).format('DD/MM/YYYY')}
                      </h2>
                    )}
                  />
                </Grid>
              </Item>
            </Grid>
            <Box mt={1} mb={1}>
              <Divider />
            </Box>
          </>
        )}
        {ehAproximado() && (
          <Box mt={2} width="100%" margin="0">
            <Grid container>
              <Item container item xs={12} direction="column">
                <Grid container justify="space-between">
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      color="textSecondary"
                      display="block"
                    >
                      Estamos considerando as taxas médias oferecidas pelos
                      parceiros
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TypographyObsStyled
                      align="center"
                      color="textSecondary"
                      display="block"
                    >
                      *Sujeito à análise de crédito
                    </TypographyObsStyled>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Box>
        )}
      </Grid>
    );
  }

  return withCard ? (
    <Card>
      <CardContent>{renderResumo()}</CardContent>
    </Card>
  ) : (
    renderResumo()
  );
}

ResumoEmprestimo.propTypes = {
  withCard: PropTypes.bool,
  valorParcela: PropTypes.number.isRequired,
  jurosAoMes: PropTypes.number.isRequired,
  iof: PropTypes.number.isRequired,
  dataPrimeiraParcela: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valorSeguro: PropTypes.number.isRequired,
  qtdParcelas: PropTypes.number.isRequired,
  valorDespesas: PropTypes.number,
  descricaoDespesas: PropTypes.string,
  statusNegociacao: PropTypes.string,
  resumoRef: PropTypes.shape({}),
};

ResumoEmprestimo.defaultProps = {
  withCard: true,
  statusNegociacao: '',
  resumoRef: null,
  descricaoDespesas: '',
  valorDespesas: undefined,
  dataPrimeiraParcela: undefined,
};
