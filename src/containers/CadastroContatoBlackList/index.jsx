import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CardContatoBlacklist from '../../components/CardContatoBlacklist';
import HeaderInstitucional from '../../components/HeaderInstitucional';
import HeaderInstitucionalMobile from '../../components/HeaderInstitucionalMobile';
import Hidden from '../../components/MaterialUI/Hidden';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import { HeaderGridStyled } from './style';

const CadastroContatoBlackList = ({
  descadastrarContato,
  descadastradoComSucesso,
  loading,
  contato,
  tokenEhValido,
}) => {
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);

  const modalConfirmacaoBtnSucessoHandler = () => {
    setModalConfirmacaoAberto(false);
    descadastrarContato();
  };

  const renderCard = () => {
    if (!loading && !tokenEhValido) {
      return (
        <Typography color="textSecondary" variant="h4" align="center">
          Não foi possível descadastrar pois o token fornecido não é válido!
        </Typography>
      );
    }

    return (
      <CardContatoBlacklist
        contato={contato}
        btnCadastrarClickHandler={() => setModalConfirmacaoAberto(true)}
        loading={loading}
        descadastradoComSucesso={descadastradoComSucesso}
      />
    );
  };

  return (
    <Grid container>
      <ModalConfirmacao
        open={modalConfirmacaoAberto}
        titulo="Deseja realmente descadastrar?"
        texto="Confirme para deixar de receber notificações."
        btnSucessoClickHandler={modalConfirmacaoBtnSucessoHandler}
        btnCancelarClickHandler={() => setModalConfirmacaoAberto(false)}
        handleClose={() => setModalConfirmacaoAberto(false)}
      />
      <HeaderGridStyled item xs={12}>
        <Hidden smDown>
          <HeaderInstitucional />
        </Hidden>
        <Hidden mdUp>
          <HeaderInstitucionalMobile />
        </Hidden>
      </HeaderGridStyled>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Box m={4}>{renderCard()}</Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CadastroContatoBlackList;
