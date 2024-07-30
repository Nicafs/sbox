import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import ModalDetalhesTermo from '../../../../VerificaAceiteTermosDeUso/ModalDetalhesTermo';
import TermoSCR from '../../../../VerificaAceiteTermosDeUso/ModalDetalhesTermo/TermoSCR';
import {
  ButtonStyled,
  Descricao,
  DividerStyled,
  GridStyled,
  Titulo,
  FormControlLabelStyled,
} from '../style';

export default function AutorizacaoCompartilhamentoDadosBancoSemear({
  enviarDados,
  loading,
}) {
  const [cond1, setCond1] = useState(false);
  const [cond2, setCond2] = useState(false);
  const [TermoEmExibicao, setTermoEmExibicao] = useState();

  const texto = `O Banco Semear S/A solicita a sua autorização para o compartilhamento de informações relacionadas aos seus dados pessoais, profissionais e residenciais.
As informações serão utilizadas exclusivamente para fins de instruir a sua proposta de empréstimo consignado.`;

  if (TermoEmExibicao) {
    return (
      <ModalDetalhesTermo
        open
        titulo={TermoEmExibicao.titulo}
        termoRender={() => <TermoEmExibicao />}
        dismissHandler={() => setTermoEmExibicao(null)}
      />
    );
  }

  return (
    <>
      <GridStyled item>
        <Titulo cy-element="modalEmprestimoTitulo">
          Aceite para simulação de empréstimo
        </Titulo>
      </GridStyled>
      <GridStyled item>
        <Descricao>{texto}</Descricao>
      </GridStyled>
      <Grid item>
        <FormControl component="fieldset" margin="normal">
          <FormGroup aria-label="position">
            <FormControlLabelStyled
              value="cond1"
              control={
                <Checkbox
                  color="primary"
                  cy-element="checkboxCond1"
                  checked={cond1}
                  onChange={() => setCond1(v => !v)}
                  style={{ paddingTop: 0 }}
                />
              }
              label={
                <Typography variant="subtitle2">
                  Aceito compartilhar meus dados pessoais, profissionais e
                  residencias com a instituição financeira Banco Semear S/A
                </Typography>
              }
            />
            <Hidden mdUp>
              <DividerStyled />
            </Hidden>
            <FormControlLabelStyled
              value="cond2"
              control={
                <Checkbox
                  color="primary"
                  cy-element="checkboxCond2"
                  checked={cond2}
                  onChange={() => setCond2(v => !v)}
                  style={{ paddingTop: 0 }}
                />
              }
              label={
                <Typography variant="subtitle2">
                  Aceito o Banco Semear S/A consultar{' '}
                  <Link
                    href="##"
                    onClick={() => setTermoEmExibicao(() => TermoSCR)}
                  >
                    Sistema de Informações de Crédito (SCR)
                  </Link>
                  , gerido pelo Banco Central do Brasil - Bacen, ou dos sistemas
                  que venham a complementá-lo ou a substituí-lo
                </Typography>
              }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <GridStyled item container justify="flex-end">
        <ButtonStyled
          cy-element="modalEmprestimoBtnSoliciar"
          secondary="true"
          rounded="true"
          disabled={!(cond1 && cond2) || loading}
          onClick={() => enviarDados()}
          loading={loading}
        >
          Avançar
        </ButtonStyled>
      </GridStyled>
    </>
  );
}

AutorizacaoCompartilhamentoDadosBancoSemear.propTypes = {
  enviarDados: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
