import React, { useState } from 'react';
import Webcam from 'react-webcam';

import ModalNotCam from './ModalNotCam';
import { WebcamContainer } from './styles';

export const handleCapture = (webcamRef, setImg, onClose, saveRealTime) => {
  const base64 = webcamRef.current?.getScreenshot();
  setImg(base64);
  onClose();
  if (saveRealTime) {
    saveRealTime(true);
  }
};

export const Camera = ({
  webcamRef,
  canvasRef,
  handleVideoPlay,
  facingMode = 'user',
}) => {
  const [error, setError] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode,
  };

  const onUserMediaError = () => setError(true);

  return (
    <>
      <ModalNotCam error={error} />
      <WebcamContainer>
        <Webcam
          audio={false}
          ref={webcamRef}
          onLoadedData={handleVideoPlay}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMediaError={onUserMediaError}
          forceScreenshotSourceSize
        />

        {canvasRef && <canvas ref={canvasRef} />}
      </WebcamContainer>
    </>
  );
};
