import React from 'react';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { moneyMask } from '../../../../commons/utils/MaskHandle';
import {
  KeyboardBackspaceIconStyled,
  ParcelasStyled,
  VoltarStyled,
} from '../../../../pages/Tomador/ConfirmacaoEmprestimo/style';
import pushRota from '../../../../routes/push';
import {
  BotaoSairStyled,
  DivLogo,
  HeaderGridStyled,
  LogoStyled,
  ValorStyled,
  ValorTotalStyled,
} from '../styles';

const SolicitacaoEmprestimoHeaderDesktop = ({
  btnVoltarClickHandler,
  taxaJuros,
  logo,
  temaPadrao,
  parcelas,
  valor,
  valorParcela,
  logout,
  resumoCompleto = true,
}) => {
  const fraseSemSimulacao =
    taxaJuros && resumoCompleto
      ? `Taxa de ${(taxaJuros * 100).toFixed(2)}% ao mês`
      : 'Melhores taxas do mercado';

  return (
    <HeaderGridStyled
      item
      xs={12}
      container
      justify="space-between"
      alignContent="center"
    >
      <Grid
        item
        xs={4}
        container
        alignContent="center"
        style={{ paddingLeft: '1%' }}
        onClick={btnVoltarClickHandler}
      >
        <KeyboardBackspaceIconStyled />
        <Hidden xsDown>
          <VoltarStyled name="btnVoltar">Voltar</VoltarStyled>
        </Hidden>
      </Grid>
      <Grid item xs={4} container justify="center" alignItems="center">
        <DivLogo>
          <LogoStyled temaPadrao={temaPadrao} alt="logo" src={logo} />
        </DivLogo>
      </Grid>
      <Grid
        item
        xs={4}
        container
        direction="column"
        justify="space-between"
        alignItems="flex-end"
        style={{ alignSelf: 'center', paddingRight: '1%' }}
      >
        <BotaoSairStyled
          onClick={() => {
            logout();
            pushRota('/');
          }}
        >
          SAIR
        </BotaoSairStyled>
        {valorParcela ? (
          <>
            <Hidden smDown>
              <ValorTotalStyled>Valor Empréstimo</ValorTotalStyled>
              <ValorStyled>R$ {moneyMask(valor)}</ValorStyled>
              {resumoCompleto && (
                <ParcelasStyled>
                  {parcelas} parcelas de R$
                  {` ${moneyMask(valorParcela)}`}
                </ParcelasStyled>
              )}
            </Hidden>
          </>
        ) : (
          <ParcelasStyled>{fraseSemSimulacao}</ParcelasStyled>
        )}
      </Grid>
    </HeaderGridStyled>
  );
};

export default SolicitacaoEmprestimoHeaderDesktop;
