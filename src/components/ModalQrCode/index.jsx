import React from 'react';

import TipoLogo from 'commons/enums/TipoLogo';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';
import { useAppGlobal } from 'providers/AppGlobal';
import QRCode from 'qrcode.react';

import { Container, ImagemTop, TextoExplicacao, BotaoVoltar } from './styles';

export default function ModalQrCode({ dismissHandler, ...props }) {
  const urlQrCode = `${
    window.location.origin + process.env.REACT_APP_TOMADOR_QRCODE_ROTA
  }`;

  const {
    actions: { getLogo, getIcone },
  } = useAppGlobal();

  return (
    <Modal {...props} dismissHandler={dismissHandler}>
      <Container>
        <Grid container>
          <Grid item xs={12} container justify="center">
            <ImagemTop src={getIcone('ilustra-celular')} />
          </Grid>
          <Grid item xs={12} container justify="center">
            <TextoExplicacao>
              Escaneie o QRCode para continuar no celular
            </TextoExplicacao>
          </Grid>
          {urlQrCode && (
            <Grid item xs={12} container justify="center">
              <QRCode
                value={urlQrCode}
                size={300}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
                renderAs="svg"
                imageSettings={{
                  src: `${
                    TipoLogo.BRASAO_COLORIDO
                      ? getLogo(TipoLogo.BRASAO_COLORIDO)
                      : getLogo(TipoLogo.LOGO_PADRAO_COLORIDA)
                  }`,
                  x: null,
                  y: null,
                  height: 56,
                  width: 56,
                  excavate: true,
                }}
              />
              {console.log(TipoLogo)}
            </Grid>
          )}
          <Grid item xs={12} container justify="center">
            <Grid item xs={12} md={3}>
              <BotaoVoltar
                cy-element="btnVoltar"
                primary="true"
                rounded="true"
                fullWidth
                onClick={dismissHandler}
              >
                Fechar
              </BotaoVoltar>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
}
