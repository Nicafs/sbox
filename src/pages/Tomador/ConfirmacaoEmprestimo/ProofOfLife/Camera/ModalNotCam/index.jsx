import React from 'react';

import QRCodeGenerate from 'components/QRCodeGenerate';
import { useAppGlobal } from 'providers/AppGlobal';

import { Container, Box, Typography } from '@material-ui/core';
import { WhatsApp } from '@material-ui/icons';

import { Background, Content } from './styles';

const ModalNotCam = ({ error }) => {
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const whatsUrl =
    'https://api.whatsapp.com/send/?phone=5534999562676&text=%22Quero+ajuda%22&app_absent=0';

  if (error) {
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
                    <img src={getIcone('icon-cel')} alt="Continuar Celular" />
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
