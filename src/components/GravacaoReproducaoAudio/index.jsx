import React, { useState, createRef, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { isIos } from 'commons/utils';
import { AudioPlayer } from 'components/ReactWebAudio';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { PlayArrow as PlayArrowIcon } from '@material-ui/icons';

const MicIconImgStyled = styled.img`
  width: ${({ theme }) => theme.spacing(4)}px;
  height: ${({ theme }) => theme.spacing(4)}px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: ${({ theme }) => theme.spacing(8)}px;
    height: ${({ theme }) => theme.spacing(6)}px;
  }
`;

const WaveIconImgStyled = styled.img`
  width: 80%;
  margin: 2%;
`;

const TypographyInnerSubHeaderAudioStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  font-size: 80%;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    font-size: 100%;
  }
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

const PlayArrowIconStyled = styled(PlayArrowIcon)`
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.grey[300] : theme.palette.primary.main}};
  width: ${({ theme }) => theme.spacing(3)}px;
  height: ${({ theme }) => theme.spacing(3)}px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: ${({ theme }) => theme.spacing(5)}px;
    height: ${({ theme }) => theme.spacing(5)}px;
  }
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

const GravacaoReproducaoAudio = ({
  audioBlobUri,
  setAudioBlobUri,
  openGravarAudioDialog,
  botaoGravarDisabled,
}) => {
  const [audioPlayerControl, setAudioPlayerControl] = useState({
    isPlaying: false,
    audioElem: undefined,
  });
  const [waveGridDimensions, setWaveGridDimensions] = useState(null);
  const [visualizerOptions, setVisualizerOptions] = useState(null);
  const {
    actions: { getIcone },
    tema: { muiTheme },
  } = useAppGlobal();

  const waveIconRef = createRef();

  useEffect(() => {
    const handleResize = () => {
      if (waveIconRef.current) {
        setWaveGridDimensions(
          waveIconRef.current.getBoundingClientRect().toJSON(),
        );
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    setWaveGridDimensions(waveIconRef.current.getBoundingClientRect().toJSON());
  }, [waveIconRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (waveGridDimensions) {
      const visualizerOptionsLocal = {
        strokeColor: muiTheme.palette.primary.main,
        backgroundColor: muiTheme.palette.common.white,
        width: waveGridDimensions.width,
      };
      setVisualizerOptions(visualizerOptionsLocal);
    }
  }, [waveGridDimensions, muiTheme]);

  const gravarAudio = () => {
    setAudioBlobUri(null);
    openGravarAudioDialog();
  };

  const tocarAudio = () => {
    if (isIos()) {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.src = audioBlobUri;
      audio.type = 'audio/mpeg';
      audio.play();

      setAudioPlayerControl({
        isPlaying: true,
        audioElem: audio,
      });

      audio.addEventListener('ended', () => {
        setAudioPlayerControl({
          isPlaying: false,
          audioElem: undefined,
        });
      });
    } else {
      const generatedAudioElem = document.createElement('audio');
      generatedAudioElem.setAttribute('hidden', false);
      generatedAudioElem.setAttribute('src', audioBlobUri);
      generatedAudioElem.setAttribute('type', 'audio/mpeg');
      generatedAudioElem.setAttribute('crossOrigin', 'anonymous');
      document.body.appendChild(generatedAudioElem);

      generatedAudioElem.load();
      generatedAudioElem.play();

      setAudioPlayerControl({
        isPlaying: true,
        audioElem: generatedAudioElem,
      });

      generatedAudioElem.addEventListener('ended', () => {
        setAudioPlayerControl({
          isPlaying: false,
          audioElem: undefined,
        });
      });
    }
  };

  const botaoPlayDisabled = !!(audioBlobUri && audioPlayerControl.isPlaying);

  return (
    <Grid container>
      {!botaoGravarDisabled && (
        <Grid item xs={12}>
          <Tooltip title="Gravar" placement="top">
            <IconButton cy-element="botaoAbrirModalAudio" onClick={gravarAudio}>
              <MicIconImgStyled src={getIcone('gravar')} />
            </IconButton>
          </Tooltip>
          {!audioBlobUri && (
            <TypographyInnerSubHeaderAudioStyled variant="subtitle1">
              Clique no botão para iniciar a gravação
            </TypographyInnerSubHeaderAudioStyled>
          )}
        </Grid>
      )}
      <Grid item xs={12}>
        {audioPlayerControl.audioElem && visualizerOptions ? (
          <AudioPlayer
            audioElem={audioPlayerControl.audioElem}
            showVisualizer
            visualizerOptions={visualizerOptions}
          />
        ) : (
          audioBlobUri && (
            <WaveIconImgStyled src={getIcone('audio')} ref={waveIconRef} />
          )
        )}
        {!(audioPlayerControl.audioElem && visualizerOptions) &&
          !audioBlobUri && (
            <WaveIconImgStyled
              src={getIcone('audio-houver')}
              ref={waveIconRef}
            />
          )}
        {audioBlobUri && (
          <Tooltip title="Tocar" placement="bottom">
            <div>
              <IconButton
                cy-element="botaoTocarAudio"
                style={{ padding: 0 }}
                disabled={botaoPlayDisabled}
                onClick={tocarAudio}
              >
                <PlayArrowIconStyled disabled={botaoPlayDisabled} />
              </IconButton>
            </div>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
};

GravacaoReproducaoAudio.propTypes = {
  audioBlobUri: PropTypes.string.isRequired,
  setAudioBlobUri: PropTypes.func.isRequired,
  openGravarAudioDialog: PropTypes.func.isRequired,
};

export default withRouter(withTranslation()(GravacaoReproducaoAudio));
