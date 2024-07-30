import React, { useState, useEffect, useRef, createRef } from 'react';

import PropTypes from 'prop-types';

const AudioVisualizer = ({ audioData, visualizerOptions }) => {
  const canvasRef = createRef();
  const didMountRef = useRef(false);
  const [newDimensions, setNewDimensions] = useState(null);

  /* TODO: depois usar como ref o parent div e mandar as dimensões para cá no
  resize. Um useEffect depois lê essas dimensões da props e atualiza o componente.
  Assim, vai ficar responsivo mesmo se der resize na tela. Atualmente tá responsivo
  apenas se começar naquela tela. Nada grave, mas pode melhorar. */

  useEffect(() => {
    if (didMountRef.current && newDimensions) {
      draw();
    } else {
      didMountRef.current = true;
    }
  });

  useEffect(() => {
    const canvasCurrent = canvasRef.current;
    setNewDimensions({
      height: visualizerOptions.height
        ? visualizerOptions.height
        : canvasCurrent.parentElement.clientWidth * 0.2,
      width: visualizerOptions.width
        ? visualizerOptions.width
        : canvasCurrent.parentElement.clientWidth,
    });
  }, [canvasRef.current, visualizerOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setNewDimensions(canvasRef.current.getBoundingClientRect().toJSON());
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const draw = () => {
    const { height } = newDimensions;
    const { width } = newDimensions;

    const canvasCtx = canvasRef.current.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    canvasCtx.fillStyle = visualizerOptions.backgroundColor
      ? visualizerOptions.backgroundColor
      : '#fff';
    canvasCtx.lineWidth = visualizerOptions.lineWidth
      ? visualizerOptions.lineWidth
      : 2;
    canvasCtx.strokeStyle = visualizerOptions.strokeColor
      ? visualizerOptions.strokeColor
      : '#000';
    canvasCtx.clearRect(0, 0, width, height);

    canvasCtx.beginPath();
    canvasCtx.moveTo(0, height / 2);
    audioData.forEach(item => {
      const y = (item / 255.0) * height;
      canvasCtx.lineTo(x, y);
      x += sliceWidth;
    });
    canvasCtx.lineTo(x, height / 2);
    canvasCtx.stroke();
  };

  const canvasComponent = () => {
    if (newDimensions) {
      return (
        <canvas
          width={newDimensions.width}
          height={newDimensions.height}
          ref={canvasRef}
        />
      );
    }
    return <canvas ref={canvasRef} />;
  };

  return canvasComponent();
};
/* eslint-disable react/forbid-prop-types */
AudioVisualizer.propTypes = {
  audioData: PropTypes.object,
  visualizerOptions: PropTypes.object,
};

AudioVisualizer.defaultProps = {
  audioData: new Uint8Array(0),
  visualizerOptions: {
    backgroundColor: '#fff',
    lineWidth: 2,
    strokeColor: '#000',
    width: '300',
    height: '150',
  },
};

export default AudioVisualizer;
