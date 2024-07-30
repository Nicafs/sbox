import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

import { Typography } from '@material-ui/core';

import ImagePreview from './ImagePreview';
import ModalNotCam from './ModalNotCam';
import {
  Container,
  Footer,
  Capture,
  CloseStyled,
  Header,
  HelpStyled,
  Mask,
} from './styles';

export default function ModalCamera({
  handleHelp,
  onClose,
  handleFinish,
  handleNextStep,
  lado,
}) {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment',
  };

  const [image, setImage] = useState('');
  const [userMediaError, setUserMediaError] = useState(false);

  const webcamRef = useRef(null);

  const handleUserMediaError = () => setUserMediaError(true);

  const onButtonCapture = () => {
    const base64 = webcamRef.current?.getScreenshot();
    setImage(base64);
  };
  const handleCancel = () => setImage('');

  const getTitle = () => {
    if (lado === 'frente') {
      return ' Frente da CNH ou RG';
    }
    if (lado === 'verso') {
      return ' Verso da CNH ou RG';
    }
    return 'Uma foto sua';
  };

  return (
    <Container>
      <ModalNotCam userMediaError={userMediaError} />
      {image ? (
        <ImagePreview
          handleNextStep={handleNextStep}
          handleFinish={handleFinish}
          img={image}
          handleClose={handleCancel}
        />
      ) : (
        <>
          <Header>
            <CloseStyled onClick={onClose} />
            <Typography variant="h5" style={{ color: '#fff' }}>
              {getTitle()}
            </Typography>
            <HelpStyled onClick={handleHelp} />
          </Header>
          <Mask>
            <Webcam
              width={1280}
              height={720}
              style={{
                width: '100%',
                height: '100%',
              }}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMediaError={handleUserMediaError}
              forceScreenshotSourceSize
            />
          </Mask>
          <Footer>
            <Capture onClick={onButtonCapture} />
          </Footer>
        </>
      )}
    </Container>
  );
}
