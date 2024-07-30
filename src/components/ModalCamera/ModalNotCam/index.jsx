import React from 'react';

import { Container, Box, Typography } from '@material-ui/core';
import { WhatsApp } from '@material-ui/icons';

import QRCodeGenerate from '../../QRCodeGenerate';
import { Background, Content } from './styles';

const ModalNotCam = ({ userMediaError }) => {
  const whatsUrl =
    'https://api.whatsapp.com/send/?phone=5534999562676&text=%22Quero+ajuda%22&app_absent=0';

  if (userMediaError) {
    if (!(window.screen.width < 800)) {
      return (
        <>
          <Background />
          <Content>
            <Container>
              <Typography align="center" variant="h4" color="primary">
                Desculpe infelizmente não conseguimos acessar a câmera do seu
                dispositivo
              </Typography>
              <Box mt="10px">
                <Typography align="center" variant="h5" color="textSecondary">
                  Deseja tentar de outro dispositivo?
                </Typography>
              </Box>
              <Box
                mt="15px"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    padding="10px"
                  >
                    <WhatsApp color="primary" style={{ fontSize: '70px' }} />
                    <span>
                      <b>Continuar pelo WhatsAp</b>
                    </span>
                  </Box>
                  <QRCodeGenerate url={whatsUrl} />
                </Box>

                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    padding="10px"
                  >
                    <span>
                      <b>Continuar pelo celular</b>
                    </span>
                  </Box>
                  <QRCodeGenerate url={window.location.origin} />
                </Box>
              </Box>
            </Container>
          </Content>
        </>
      );
    }

    return (
      <>
        <Background />
        <Content>
          <Typography align="center" variant="h5" color="primary">
            Desculpe infelizmente não conseguimos acessar a câmera do seu
            dispositivo
          </Typography>
          <Box mt="10px">
            <Typography
              align="center"
              variant="subtitle1"
              color="textSecondary"
            >
              Deseja tentar com outro dispositivo?
            </Typography>
          </Box>
          <Box
            mt="15px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box>
              <a href={whatsUrl}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  padding="10px"
                >
                  <WhatsApp color="primary" style={{ fontSize: '80px' }} />
                  <span>
                    <b>Continuar pelo WhatsAp</b>
                  </span>
                </Box>
              </a>
            </Box>
          </Box>
        </Content>
      </>
    );
  }
  return null;
};

export default ModalNotCam;
