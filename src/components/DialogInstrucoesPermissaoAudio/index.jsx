import React from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import InstrucaoPermissaoAudioAsset from '../../assets/images/instrucao-permissao-audio.png';

const GridHeaderStyled = styled(Grid)`
  padding-top: ${({ theme }) => theme.spacing(4)}px;
`;

const TypographyTitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  font-size: ${({ theme }) => theme.spacing(4)}px;
  padding: 0px;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  line-height: 1;
  @media (max-width: 320px) {
    font-size: ${({ theme }) => theme.spacing(3.5)}px;
  }
`;

const CloseIconStyled = styled(CloseIcon)`
  width: ${({ theme }) => theme.spacing(4)}px;
  height: ${({ theme }) => theme.spacing(4)}px;
`;

const GridSubtitleStyled = styled(Grid)`
  padding-top: 5%;
  padding-left: 10%;
  padding-right: 10%;
`;

const TypographySubtitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]};
  text-align: justify;
  font-size: 22px;
  padding-top: ${({ theme }) => theme.spacing(1)}px;
`;

const GridDialogStyled = styled(Grid)`
  padding-left: 10%;
  padding-right: 10%;
`;

const DialogContentStyled = styled(DialogContent)`
  padding: 0px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  text-align: center;
`;

const ImagemInstrucao = styled.img`
  width: 500px;
  border-radius: 4px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

export default function DialogInstrucoesPermissaoAudio({
  fullScreen,
  open,
  handleClose,
}) {
  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
    >
      <Grid container>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <GridHeaderStyled container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Grid container justify="center">
                <TypographyTitleStyled id="form-dialog-title">
                  Permissão de Áudio
                </TypographyTitleStyled>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Fechar" placement="top-end">
                <IconButton onClick={handleClose} style={{ padding: '0px' }}>
                  <CloseIconStyled />
                </IconButton>
              </Tooltip>
            </Grid>
          </GridHeaderStyled>
        </Grid>
        <GridSubtitleStyled item xs={12}>
          <TypographySubtitleStyled>
            A aplicação não possui acesso ao microfone para gravação do áudio de
            identificação. <br />
            Favor liberar o acesso ao microfone. <br />
            Seguem as instruções abaixo:
          </TypographySubtitleStyled>
        </GridSubtitleStyled>
        <GridDialogStyled item xs={12}>
          <DialogContentStyled>
            <Grid container justify="center">
              <Grid item xs={12}>
                <ImagemInstrucao src={InstrucaoPermissaoAudioAsset} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Box mt={3} mb={3}>
                  <Button
                    cy-element="modalBotaoAviso"
                    primary="true"
                    rounded="true"
                    onClick={handleClose}
                    fullWidth
                  >
                    Ok, entendi
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContentStyled>
        </GridDialogStyled>
      </Grid>
    </Dialog>
  );
}

DialogInstrucoesPermissaoAudio.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
