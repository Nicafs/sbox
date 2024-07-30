import React from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import {
  ButtonStyled,
  TextoAguarde,
  TextoSolicitacao,
  Titulo,
} from '../../ModalEmprestimoSolicitado/style';

export default function InfosEmprestimoSolicitado({ redirecionar, tipoFluxo }) {
  const getTextoInfo = tipoFluxoOrg => {
    if (tipoFluxoOrg === 'BANCO_SEMEAR') {
      return {
        titulo: `Simulação concluída com sucesso!`,
        subtitulo: `Agora aguarde enquanto processamos sua proposta`,
        paragrafo: `Dentro de alguns instantes, você poderá conferir as taxas especiais que preparamos pra você.
                    Fique atendo às atualizações!`,
      };
    }

    if (tipoFluxoOrg !== 'PORTOCRED') {
      return {
        titulo: `Empréstimo solicitado com sucesso!`,
        subtitulo: `Agora aguarde a proposta de um investidor`,
        paragrafo: `Os investidores receberão sua solicitação.
                    Fique atento às atualizações da sua solicitação de empréstimo.`,
      };
    }

    return {
      titulo: `Simulação concluída com sucesso!`,
      subtitulo: `Agora aguarde enquanto processamos sua proposta`,
      paragrafo: `Dentro de alguns instantes, você poderá conferir as taxas especiais que preparamos pra você.
                  Fique atendo às atualizações!`,
    };
  };

  const { titulo, subtitulo, paragrafo } = getTextoInfo(tipoFluxo);

  return (
    <>
      <Grid item>
        <Titulo cy-element="modalEmprestimoTitulo">{titulo}</Titulo>
      </Grid>
      <Grid item>
        <TextoAguarde>{subtitulo}</TextoAguarde>
      </Grid>
      <Grid item>
        <TextoSolicitacao>{paragrafo}</TextoSolicitacao>
      </Grid>
      <Grid item>
        <ButtonStyled
          cy-element="modalEmprestimoBtnAcompanhar"
          primary="true"
          rounded="true"
          onClick={redirecionar}
        >
          Acompanhar status
        </ButtonStyled>
      </Grid>
    </>
  );
}

InfosEmprestimoSolicitado.propTypes = {
  redirecionar: PropTypes.func.isRequired,
};
