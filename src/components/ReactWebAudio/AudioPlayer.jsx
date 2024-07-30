import React from 'react';

import PropTypes from 'prop-types';

import AudioAnalyzer from './AudioAnalyzer';

const AudioPlayer = ({ audioElem, showVisualizer, visualizerOptions }) => {
  // OBS: can be expanded to include more than just the analyzer

  const LocalAudioAnalyzer = () => {
    if (audioElem) {
      return (
        <AudioAnalyzer
          streamMode={false}
          audioElem={audioElem}
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
AudioPlayer.propTypes = {
  audioElem: PropTypes.object,
  showVisualizer: PropTypes.bool.isRequired,
  visualizerOptions: PropTypes.object,
};

AudioPlayer.defaultProps = {
  audioElem: undefined,
  showVisualizer: true,
  visualizerOptions: {
    backgroundColor: '#fff',
    lineWidth: 2,
    strokeColor: '#000',
    width: '300',
    height: '300',
  },
};

export default AudioPlayer;
