import React, { useState, useEffect } from 'react';

import { Grid, DialogTitle } from '@material-ui/core';

import { useFirebase } from '@credito-express/ce-components';

import { useSimulacaoState } from '../../../pages/Tomador/SolicitacaoEmprestimo/state';
import pushRota from '../../../routes/push';
import Modal from '../../Modal';
import {
  ButtonStyled,
  GridStyled,
} from '../DadosFinais/AutorizacaoCompartilhamentoDados/style';
import InfosEmprestimoSolicitado from '../DadosFinais/InfosEmprestimoSolicitado';

export default function ModalSimulacaoEmprestimo() {
  const firebase = useFirebase();
  const [trocarModal, setTrocarModal] = useState(false);
  const [
    {
      persistido = false,
      prontoParaNovaSimulacao = false,
      novoCustomToken = '',
      organizacao: { tipoFluxoEcp },
    },
    { persistir, resetarEstadoInicial, cancelarNovaSimulacao },
  ] = useSimulacaoState();

  const handleClose = () => {
    cancelarNovaSimulacao();
  };

  function enviarDados() {
    persistir();
    firebase.analytics().logEvent('finalizou_solicitacao');
  }

  useEffect(() => {
    if (persistido && !novoCustomToken) {
      exibirModalAcompanhamento();
    }
  }, [persistido, novoCustomToken]);

  const exibirModalAcompanhamento = () => {
    setTrocarModal(true);
  };

  return (
    <Modal id="modal-nova-simulacao" open={prontoParaNovaSimulacao}>
      <Grid
        container
        spacing={3}
        style={{ margin: '0px', width: '100%', textAlign: 'center' }}
      >
        <GridStyled item container justify="center" direction="column">
          {trocarModal ? (
            <InfosEmprestimoSolicitado
              redirecionar={() => {
                if (resetarEstadoInicial) {
                  resetarEstadoInicial();
                }
                pushRota('/meus-emprestimos');
              }}
              tipoFluxo={tipoFluxoEcp}
            />
          ) : (
            <>
              <DialogTitle id="alert-dialog-title">
                Deseja realizar uma nova solicitação de empréstimo?
              </DialogTitle>

              <span>** Sujeito a análise de crédito</span>

              <GridStyled
                item
                container
                justify="center"
                spacing={2}
                style={{ margin: '0px' }}
              >
                <Grid item xs={12} md={6}>
                  <ButtonStyled
                    cy-element="modalNovaSimulacaoBtnConfirmar"
                    primary="true"
                    rounded="true"
                    fullWidth
                    onClick={() => enviarDados()}
                    autoFocus
                  >
                    Confirmar
                  </ButtonStyled>
                </Grid>

                <Grid item xs={12} md={6}>
                  <ButtonStyled
                    cy-element="modalNovaSimulacaoBtnCancelar"
                    variant="outlined"
                    rounded="true"
                    fullWidth
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </ButtonStyled>
                </Grid>
              </GridStyled>
            </>
          )}
        </GridStyled>
      </Grid>
    </Modal>
  );
}
