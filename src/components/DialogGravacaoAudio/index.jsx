import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { AudioRecorder } from 'components/ReactWebAudio';
import VerificaPermissaoDeMidia from 'components/VerificaPermissaoDeMidia';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import LoaderCircular from '../LoaderCircular';
import {
  ButtonStyled,
  CloseIconStyled,
  DialogContentStyled,
  GridDialogStyled,
  GridHeaderStyled,
} from './style';

const DialogGravacaoAudio = ({
  fullScreen,
  open,
  handleClose,
  setAudioBlobUri,
  textoDeVerificacao,
}) => {
  const [audioRecorderCount, setAudioRecorderCount] = useState(0);
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);
  const [gravandoAudio, setGravandoAudio] = useState(false);
  const [finalizouGravacao, setFinalizouGravacao] = useState(false);
  const [audioBlobLink, setAudioBlobLink] = useState('');
  const [_permissionError, _setPermissionError] = useState('');

  const theme = useTheme();

  const visualizerOptions = {
    strokeColor: theme.palette.primary.main,
    backgroundColor: '#fff',
  };

  useEffect(() => {
    if (open) {
      setFinalizouGravacao(false);
    }
  }, [open]);

  useEffect(() => {
    if (audioBlobLink && finalizouGravacao) {
      setAudioBlobUri(audioBlobLink);
      handleClose();
    }
  }, [handleClose, setAudioBlobUri, audioBlobLink, finalizouGravacao]);

  useEffect(() => {
    if (_permissionError) {
      setGravandoAudio(false);
      handleClose();
    }
  }, [_permissionError]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCloseDialog = () => {
    setGravandoAudio(false);
    handleClose();
  };

  const finalizarGravacao = () => {
    setGravandoAudio(false);
    setFinalizouGravacao(true);
  };

  const iniciarGravacao = () => {
    setGravandoAudio(true);
    setFinalizouGravacao(false);
  };

  const getTextoInstrucao = () => {
    return gravandoAudio ? (
      <>
        Repita o texto e clique no botão <strong>FINALIZAR</strong>
      </>
    ) : (
      <>
        Clique no botão <strong>GRAVAR</strong> e leia o texto abaixo em voz
        alta
      </>
    );
  };

  // const iniciarGravacaoWrapper = () => {
  //   // BUG FIX: Problemas com audio ao gravar pela primeira vez (NÃO ALTERAR)
  //   setLoading(true);
  //   setGravandoAudio(true);
  //   setTimeout(() => setGravandoAudio(false), 200);
  //   setTimeout(() => {
  //     iniciarGravacao();
  //   }, 400);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 600);
  //   // BUG FIX: Problemas com audio ao gravar pela primeira vez (NÃO ALTERAR)
  // };

  const renderBotoes = () => {
    return gravandoAudio ? (
      <Grid container justify="center">
        <ButtonStyled
          cy-element="botaoFinalizarAudio"
          name="botaoFinalizarAudio"
          variant="contained"
          color="secondary"
          type="submit"
          onClick={() => finalizarGravacao()}
        >
          Finalizar Gravação
        </ButtonStyled>
      </Grid>
    ) : (
      <Grid container justify="center">
        <ButtonStyled
          cy-element="botaoGravarAudio"
          name="botaoGravarAudio"
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => iniciarGravacao()}
        >
          Iniciar Gravação
        </ButtonStyled>
      </Grid>
    );
  };

  const [bugFixGravando, setBugFixGravando] = useState(true);
  const renderAudioRecorderBugFix = () => {
    setTimeout(() => {
      setBugFixGravando(false);
    }, 600);
    setTimeout(() => {
      setAudioRecorderCount(1);
    }, 1000);

    return (
      // <div style={{ display: 'none' }}>
      <Dialog open maxWidth="sm">
        <Box m={3}>
          <LoaderCircular />
        </Box>
        <AudioRecorder
          blobOptions={{
            type: 'audio/mpeg',
          }}
          record={bugFixGravando}
          setAudioBlobUri={() => {}}
          showVisualizer
          visualizerOptions={visualizerOptions}
          setPermissionError={() => {}}
        />
      </Dialog>
    );
  };

  return (
    <VerificaPermissaoDeMidia
      mediaType="audioinput"
      onPermissaoAutorizadaHandler={() => setPermissaoConcedida(true)}
    >
      {permissaoConcedida &&
        audioRecorderCount === 0 &&
        renderAudioRecorderBugFix()}
      {permissaoConcedida && audioRecorderCount > 0 && (
        <Dialog
          fullScreen={fullScreen}
          maxWidth="sm"
          open={open}
          onClose={handleCloseDialog}
        >
          <Grid container>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <GridHeaderStyled container>
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <Grid container justify="center" align="center" spacing={2}>
                    <Grid item>
                      <Typography
                        id="form-dialog-title"
                        variant="h6"
                        align="center"
                        color="textPrimary"
                      >
                        {gravandoAudio ? 'Gravando' : 'Assinatura por áudio'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Fechar" placement="top-end">
                    <IconButton
                      onClick={handleCloseDialog}
                      style={{ padding: '0px' }}
                    >
                      <CloseIconStyled />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </GridHeaderStyled>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary" align="center">
                {getTextoInstrucao()}
              </Typography>
            </Grid>
            <GridDialogStyled item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <DialogContentStyled>
                    <Typography
                      variant="body1"
                      align="center"
                      color="textSecondary"
                    >
                      "{textoDeVerificacao}"
                    </Typography>
                  </DialogContentStyled>
                </Grid>
                <Grid item xs={12}>
                  <AudioRecorder
                    blobOptions={{
                      type: 'audio/mpeg',
                    }}
                    record={gravandoAudio}
                    setAudioBlobUri={setAudioBlobLink}
                    showVisualizer
                    visualizerOptions={visualizerOptions}
                    setPermissionError={_setPermissionError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DialogActions
                    style={{ justifyContent: 'center', marginTop: 16 }}
                  >
                    {renderBotoes()}
                  </DialogActions>
                </Grid>
              </Grid>
            </GridDialogStyled>
          </Grid>
        </Dialog>
      )}
    </VerificaPermissaoDeMidia>
  );
};

/* eslint-disable react/forbid-prop-types */
DialogGravacaoAudio.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setAudioBlobUri: PropTypes.func.isRequired,
  textoDeVerificacao: PropTypes.string.isRequired,
};

export default withRouter(withTranslation()(DialogGravacaoAudio));
