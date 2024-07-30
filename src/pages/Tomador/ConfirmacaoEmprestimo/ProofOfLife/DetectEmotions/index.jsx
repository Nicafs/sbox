import React, { useState, useRef } from 'react';
import { FaRegSurprise } from 'react-icons/fa';
import { IoMdHappy } from 'react-icons/io';
import { MdSentimentNeutral } from 'react-icons/md';

import { useLoading } from 'components/LoaderCircular/LoadingContext';
import Button from 'components/MaterialUI/Button';
import { useAppGlobal } from 'providers/AppGlobal';

import { Grid, useTheme, Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Camera } from '../Camera';
import { SubTitleSelfie } from '../Preview/styles';
import { StyledTypography } from '../styles';
import { initDetections } from './detections';
import { AvisosExpressao } from './styles';

const DetectEmotions = ({ onFinish }) => {
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [enableCam, setEnableCam] = useState(false);
  const [text, setText] = useState('');
  const { startLoading, stopLoading } = useLoading();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderIcon = () => {
    if (text === 'feliz') {
      return <IoMdHappy />;
    }
    if (text === 'surpreso') {
      return <FaRegSurprise />;
    }
    if (text === 'neutro') {
      return <MdSentimentNeutral />;
    }
    return null;
  };

  const handlePlay = () => {
    initDetections({
      onFinish,
      webcamRef,
      canvasRef,
      setText,
      startLoading,
      stopLoading,
      moveAlong: false,
      isMobile,
    });
  };

  const handleToggleCam = () => setEnableCam(prevState => !prevState);

  return (
    <Box p={1}>
      <Grid
        container
        item
        justify="center"
        alignItems="center"
        direction="column"
        spacing={1}
      >
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <StyledTypography
            gutterBottom
            color="primary"
            text="center"
            variant="h6"
          >
            Prova de Vida
          </StyledTypography>
          <SubTitleSelfie>
            Retire óculos, chapéus e demais acessórios
          </SubTitleSelfie>
        </Grid>
        {!enableCam ? (
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignItems="center"
            direction="column"
            spacing={2}
          >
            <Grid item>
              <img src={getIcone('ilustra-celular')} alt="Face" width="350" />
            </Grid>
            <Grid item>
              <Button
                cy-element="confirmProofLife"
                primary="true"
                rounded="true"
                onClick={handleToggleCam}
                fullWidth
              >
                INICIAR AGORA
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignItems="center"
            direction="column"
            spacing={1}
            style={{ marginBottom: isMobile ? '10px' : '0px' }}
          >
            <Grid item style={{ position: 'relative' }}>
              <Camera
                handleVideoPlay={handlePlay}
                canvasRef={canvasRef}
                webcamRef={webcamRef}
                facingMode="user"
              />
              {text && (
                <AvisosExpressao
                  container
                  item
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    {`${isMobile ? '' : 'Faça a expressão '} ${
                      text.charAt(0).toUpperCase() + text.slice(1)
                    }`}
                  </Grid>
                  <Grid item>{renderIcon()}</Grid>
                </AvisosExpressao>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DetectEmotions;
