import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import { Hidden } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  ButtonStyled,
  Descricao,
  DividerStyled,
  GridStyled,
  Titulo,
  FormControlLabelStyled,
} from '../style';

export default function AutorizacaoCompartilhamentoDadosP2P({
  enviarDados,
  loading,
}) {
  const [cond1, setCond1] = useState(false);
  const [cond2, setCond2] = useState(false);
  const [cond3, setCond3] = useState(false);
  const [cond4, setCond4] = useState(false);

  const {
    tema: { nomeOrganizacao, artigoDefinido },
  } = useAppGlobal();

  const texto = `${artigoDefinido.toUpperCase()} ${nomeOrganizacao} solicita a sua autorização para o compartilhamento de informações relacionadas aos seus dados pessoais, profissionais e residenciais.
As informações serão utilizadas exclusivamente para fins de instruir a sua proposta de empréstimo consignado.`;

  return (
    <>
      <GridStyled item>
        <Titulo cy-element="modalEmprestimoTitulo">
          Aceite para solicitação de empréstimo
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
                  Aceito compartilhar meus dados com investidores
                </Typography>
              }
              labelPlacement="end"
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
                  Aceito compartilhar o nome da empresa onde eu trabalho com os
                  investidores
                </Typography>
              }
              labelPlacement="end"
            />
            <Hidden mdUp>
              <DividerStyled />
            </Hidden>
            <FormControlLabelStyled
              value="cond3"
              control={
                <Checkbox
                  color="primary"
                  cy-element="checkboxCond3"
                  checked={cond3}
                  onChange={() => setCond3(v => !v)}
                  style={{ paddingTop: 0 }}
                />
              }
              label={
                <Typography variant="subtitle2">
                  Aceito compartilhar o tempo de carteira assinada com os
                  investidores
                </Typography>
              }
              labelPlacement="end"
            />
            <Hidden mdUp>
              <DividerStyled />
            </Hidden>
            <FormControlLabelStyled
              value="cond4"
              control={
                <Checkbox
                  color="primary"
                  cy-element="checkboxCond4"
                  checked={cond4}
                  onChange={() => setCond4(v => !v)}
                  style={{ paddingTop: 0 }}
                />
              }
              label={
                <Typography variant="subtitle2">
                  Aceito compartilhar a cidade onde eu moro com os investidores
                </Typography>
              }
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <GridStyled item container justify="flex-end">
        <ButtonStyled
          cy-element="modalEmprestimoBtnSoliciar"
          secondary="true"
          rounded="true"
          disabled={!(cond1 && cond2 && cond3 && cond4) || loading}
          onClick={() => enviarDados()}
          loading={loading}
        >
          Avançar
        </ButtonStyled>
      </GridStyled>
    </>
  );
}

AutorizacaoCompartilhamentoDadosP2P.propTypes = {
  enviarDados: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
