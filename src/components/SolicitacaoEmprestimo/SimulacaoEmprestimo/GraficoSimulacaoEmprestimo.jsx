import React from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import { percentMask } from '../../../commons/utils/MaskHandle';
import Grid from '../../MaterialUI/Grid';

const GraficoTextoDestaque = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.common.black};
`;

const GraficoTexto = styled.span`
  font-size: 12px;
`;

const GraficoItem = styled(Grid)`
  color: ${({ theme }) => theme.palette.common.black};
  text-align: center;
`;

const Bar = styled.div`
  width: 100%;
  height: ${props => `${props.size * 8}px`};
  background: ${props =>
    props.destaque ? props.theme.palette.primary.main : 'rgba(0,0,0,0.2)'};
`;

export default function GraficoSimulacaoEmprestimo({
  taxaJuros,
  taxaChequeEspecial,
  taxaCartaoCredito,
}) {
  const {
    tema: { nomeOrganizacao },
  } = useAppGlobal();
  const taxaCreditoAnual = parseFloat(taxaJuros * 100);
  const taxaChequeAnual = parseFloat(taxaChequeEspecial * 100);
  const taxaCartaoAnual = parseFloat(taxaCartaoCredito * 100);
  const taxaChequeFormatada = percentMask(taxaChequeAnual);
  const taxaCartaoFormatada = percentMask(taxaCartaoAnual);
  const taxaCreditoFormatada = percentMask(taxaCreditoAnual);

  const calculaTamanhoGrafico = (chequeValor, cartaoValor, creditoValor) => {
    const tamanhoLimite = 16;
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

  const {
    tamanhoChequeEspecial,
    tamanhoCartaoCredito,
    tamanhoCreditoExpress,
  } = calculaTamanhoGrafico(taxaChequeAnual, taxaCartaoAnual, taxaCreditoAnual);

  return (
    <Grid container justify="space-around" alignItems="flex-end">
      <Grid item xs={2}>
        <GraficoItem container direction="column" spacing={1}>
          <Grid item>
            <GraficoTexto>Juros a.m.</GraficoTexto>
          </Grid>
          <Grid item>
            <GraficoTextoDestaque>{taxaCartaoFormatada}%</GraficoTextoDestaque>
          </Grid>
          <Grid item>
            <Bar size={tamanhoCartaoCredito} />
          </Grid>
          <Grid item>
            <GraficoTexto>Cartão de crédito</GraficoTexto>
          </Grid>
        </GraficoItem>
      </Grid>
      <Grid item xs={2}>
        <GraficoItem container direction="column" spacing={1}>
          <Grid item>
            <GraficoTexto>Juros a.m.</GraficoTexto>
          </Grid>
          <Grid item>
            <GraficoTextoDestaque>{taxaChequeFormatada}%</GraficoTextoDestaque>
          </Grid>
          <Grid item>
            <Bar size={tamanhoChequeEspecial} />
          </Grid>
          <Grid item>
            <GraficoTexto>Cheque especial</GraficoTexto>
          </Grid>
        </GraficoItem>
      </Grid>
      <Grid item xs={2}>
        <GraficoItem container direction="column" spacing={1}>
          <Grid item>
            <GraficoTexto>Juros a.m.</GraficoTexto>
          </Grid>
          <Grid item>
            <GraficoTextoDestaque>{taxaCreditoFormatada}%</GraficoTextoDestaque>
          </Grid>
          <Grid item>
            <Bar size={tamanhoCreditoExpress} destaque="true" />
          </Grid>
          <Grid item>
            <GraficoTexto>{nomeOrganizacao}</GraficoTexto>
          </Grid>
        </GraficoItem>
      </Grid>
    </Grid>
  );
}

GraficoSimulacaoEmprestimo.propTypes = {
  taxaJuros: PropTypes.number.isRequired,
};
