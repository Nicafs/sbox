import React, { useState, useEffect, useRef } from 'react';

import { getAudioContext, createAudioContext } from './AudioContext';
import AudioVisualizer from './AudioVisualizer';

const AudioAnalyzer = ({
  streamMode,
  audioStream,
  audioElem,
  showVisualizer,
  visualizerOptions,
  gainValue,
}) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const [analyzer, setAnalyzer] = useState(null);

  const requestRef = useRef();

  const animate = () => {
    const data = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteTimeDomainData(data);
    requestRef.current = requestAnimationFrame(animate);
    setAudioData(data);
  };

  useEffect(() => {
    if (!getAudioContext()) {
      createAudioContext();
    }

    const localAnalyzer = getAudioContext().createAnalyser();

    let source;
    if (streamMode) {
      source = getAudioContext().createMediaStreamSource(audioStream);
    } else {
      source = getAudioContext().createMediaElementSource(audioElem);
    }
    const gainNode = getAudioContext().createGain();

    gainNode.gain.value = gainValue || 1.2;

    source.connect(gainNode);
    gainNode.connect(localAnalyzer);

    if (!streamMode) {
      localAnalyzer.connect(getAudioContext().destination);
    }

    setAnalyzer(localAnalyzer);

    return () => {
      localAnalyzer.disconnect();
      gainNode.disconnect();
      source.disconnect();
    };
  }, [audioStream, audioElem]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (analyzer) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [analyzer]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div name="canvasVisualizerDiv" style={{ width: '100%' }}>
      {showVisualizer && audioData.length ? (
        <AudioVisualizer
          audioData={audioData}
          visualizerOptions={visualizerOptions}
        />
      ) : null}
    </div>
  );
};

export default AudioAnalyzer;
