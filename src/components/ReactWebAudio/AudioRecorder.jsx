import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useAppGlobal } from '../../providers/AppGlobal';
import AudioAnalyzer from './AudioAnalyzer';

const AudioRecorder = ({
  record,
  onStart,
  onStop,
  onData,
  setAudioBlobUri,
  setPermissionError,
  userMediaAudioOptions,
  recorderOptions,
  blobOptions,
  showVisualizer,
  visualizerOptions,
}) => {
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const [audioStream, setAudioStream] = useState();
  const [mediaRecorder, setMediaRecorder] = useState();
  const [_audioBlobUri, _setAudioBlobUri] = useState();

  const getAudioMedia = async () => {
    if (audioStream) {
      return audioStream;
    }
    try {
      navigator.allMediaStreams = [];
      const localAudioStream = await navigator.mediaDevices.getUserMedia({
        audio: userMediaAudioOptions || true,
        video: false,
      });

      // navigator.allMediaStreams.push({
      //   audioStream0: localAudioStream,
      // });

      if (setPermissionError) setPermissionError('');
      setAudioStream(localAudioStream);
      return localAudioStream;
    } catch (e) {
      const msgError =
        'It was not possible to start recording. Permission denied or recording through microphone is not supported.';
      exibirAlerta(msgError, 'error');
      console.warn(msgError);
      if (setPermissionError) setPermissionError(msgError);
      setAudioStream(null);
      return null;
    }
  };

  const startRecording = async () => {
    const localAudioStream = await getAudioMedia();
    if (!localAudioStream) return exibirAlerta('LocalAudioStream inválido');

    const recordedChunks = [];

    let localMediaRecorder;
    if (recorderOptions) {
      localMediaRecorder = new MediaRecorder(localAudioStream, recorderOptions);
    } else {
      localMediaRecorder = new MediaRecorder(localAudioStream);
    }

    if (onStart) onStart();

    localMediaRecorder.addEventListener('dataavailable', e => {
      if (onData) onData(e.data);
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    });

    localMediaRecorder.addEventListener('stop', () => {
      let localAudioBlobUri;
      if (blobOptions) {
        localAudioBlobUri = URL.createObjectURL(
          new Blob(recordedChunks, blobOptions),
        );
      } else {
        localAudioBlobUri = URL.createObjectURL(new Blob(recordedChunks));
      }

      _setAudioBlobUri(localAudioBlobUri);
    });

    localMediaRecorder.start();

    setMediaRecorder(localMediaRecorder);
  };

  const stopRecording = () => {
    if (onStop) onStop();

    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (navigator.allMediaStreams) {
        navigator.allMediaStreams.forEach(m => {
          if (m.audioStream0) {
            try {
              m.audioStream0.getTracks().forEach(track => track.stop());
              m.audioStream0 = null;
            } catch (err) {
              console.error('Erro ao parar audioStreams', err);
            }
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    if (record) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [record]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (_audioBlobUri) {
      setMediaRecorder(null);
      if (audioStream) {
        try {
          audioStream.getTracks().forEach(track => track.stop());
        } catch (err) {
          console.error('Erro ao parar audioStreams', err);
        }
        setAudioStream(null);
      }
      setAudioBlobUri(_audioBlobUri);
    }
  }, [_audioBlobUri]); // eslint-disable-line react-hooks/exhaustive-deps

  const LocalAudioAnalyzer = () => {
    if (mediaRecorder && audioStream && showVisualizer) {
      return (
        <AudioAnalyzer
          streamMode
          audioStream={audioStream}
          showVisualizer={showVisualizer}
          visualizerOptions={visualizerOptions}
        />
      );
    }
    return null;
  };

  return LocalAudioAnalyzer();
};

/* eslint-disable react/forbid-prop-types */
AudioRecorder.propTypes = {
  record: PropTypes.bool.isRequired,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onData: PropTypes.func,
  setAudioBlobUri: PropTypes.func.isRequired,
  setPermissionError: PropTypes.func,
  userMediaAudioOptions: PropTypes.object,
  recorderOptions: PropTypes.object,
  blobOptions: PropTypes.object,
  showVisualizer: PropTypes.bool.isRequired,
  visualizerOptions: PropTypes.object,
};

AudioRecorder.defaultProps = {
  record: false,
  onStart: undefined,
  onStop: undefined,
  onData: undefined,
  setAudioBlobUri: undefined,
  setPermissionError: undefined,
  userMediaAudioOptions: undefined,
  recorderOptions: undefined,
  blobOptions: undefined,
  showVisualizer: true,
  visualizerOptions: {
    backgroundColor: '#fff',
    lineWidth: 2,
    strokeColor: '#000',
    width: '300',
    height: '300',
  },
};

export default AudioRecorder;
