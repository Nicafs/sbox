import React from 'react';
import ReactCurrencyFormatter from 'react-currency-formatter';

import ProtoTypes from 'prop-types';

import Grid from '../../MaterialUI/Grid';
import {
  GridSaldoStyled,
  InfoOutlinedIconStyled,
  SaldoSpanStyled,
  ValorSaldoSpanStyled,
} from './style';

const SaldoEmConta = ({ saldo, flex = 'end' }) => (
  <GridSaldoStyled
    container
    alignItems={`flex-${flex}`}
    justify="center"
    direction="column"
  >
    <Grid item container justify={`flex-${flex}`}>
      <SaldoSpanStyled>Saldo em conta:</SaldoSpanStyled>
    </Grid>
    <Grid item className="gridSaldo">
      <InfoOutlinedIconStyled opacity={0.8} />
      &nbsp;&nbsp;
      {saldo && (
        <ValorSaldoSpanStyled>
          <ReactCurrencyFormatter quantity={saldo} currency="BRL" />
        </ValorSaldoSpanStyled>
      )}
    </Grid>
  </GridSaldoStyled>
);
SaldoEmConta.propTypes = {
  saldo: ProtoTypes.number,
  flex: ProtoTypes.string,
};

SaldoEmConta.defaultProps = {
  flex: 'end',
  saldo: null,
};

export default SaldoEmConta;
