import React, { useEffect, useRef, useState } from 'react';

import { useAppGlobal } from 'providers/AppGlobal';

import { Grid, Box } from '@material-ui/core';

import Button from '../../../../../components/MaterialUI/Button';
import { Camera, handleCapture } from '../Camera';
import { SubTitleSelfie } from '../Preview/styles';
import { StyledTypography } from '../styles';
import { MaskWrapper } from './styles';

const delay = 1;

const Selfie = ({ onClose, selfieHandler }) => {
  const webcamRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const timer = useRef(null);

  const {
    actions: { getIcone },
  } = useAppGlobal();

  useEffect(() => {
    timer.current = setInterval(() => setCounter(v => v + 1), delay * 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (counter > 30) {
      clearInterval(timer.current);
    }
  }, [counter]);

  const onCapture = () => handleCapture(webcamRef, selfieHandler, onClose);

  return (
    <Box p={1}>
      <Grid
        container
        item
        spacing={1}
        alignItems="center"
        justify="center"
        direction="column"
        style={{ flexGrow: 1, flexShrink: 1 }}
      >
        <StyledTypography
          gutterBottom
          color="primary"
          text="center"
          variant="h6"
        >
          Vamos tirar uma selfie?
        </StyledTypography>

        <Grid container spacing={2} justify="center">
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <SubTitleSelfie>
              Retire óculos, chapéus e demais acessórios
            </SubTitleSelfie>
          </Grid>

          <MaskWrapper>
            <Camera
              facingMode="user"
              webcamRef={webcamRef}
              handleVideoPlay={() => ({})}
            />
          </MaskWrapper>

          <Grid
            container
            item
            alignItems="center"
            justify="center"
            spacing={2}
            style={{ margin: '0px' }}
          >
            <Grid item>
              <Button
                cy-element="tirarFotoSelfie"
                color="default"
                rounded="true"
                onClick={onClose}
                fullWidth
              >
                VOLTAR
              </Button>
            </Grid>
            <Grid item>
              <Button
                cy-element="tirarFotoSelfie"
                primary="true"
                rounded="true"
                onClick={onCapture}
                fullWidth
              >
                <img src={getIcone('icon-camera')} alt="Icone de Câmera" />{' '}
                TIRAR FOTO
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Selfie;
