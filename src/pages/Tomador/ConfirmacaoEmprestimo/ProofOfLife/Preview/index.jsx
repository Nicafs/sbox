import React, { useRef } from 'react';

import BotaoOutlineComIcone from 'components/BotaoOutlineComIcone';
import ImgAsync from 'components/ImgAsync';
import { useAppGlobal } from 'providers/AppGlobal';

import { Grid, Grow, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { StyledTypography, ImagemCentral } from '../styles';
import { TitleSelfie, SubTitleSelfie } from './styles';

const Preview = ({ onClick, img, setImg, uploadConcluido }) => {
  const {
    actions: { getIcone, exibirAlerta },
  } = useAppGlobal();

  const inputFileRef = useRef(null);

  const changeFileHandle = evt => {
    const file = evt.target.files[0];
    const regex = new RegExp('(.*?).(png|jpg|jpeg)$');

    if (regex.test(file.name.toLowerCase())) {
      const reader = new FileReader();
      reader.onloadend = function fileCap() {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      exibirAlerta(
        'Formato da Imagem não suportada. Apenas PNG ou JPG.',
        'error',
      );
    }
  };

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
          variant="h4"
        >
          Vamos tirar uma selfie?
        </StyledTypography>

        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
          direction="column"
        >
          {img ? (
            <Grow in={!!img}>
              <>
                <Grid item>
                  <Alert severity="warning">
                    Verifique se a imagem ficou nitida antes de prosseguir.
                  </Alert>
                </Grid>
                <Grid item>
                  <ImgAsync
                    src={img}
                    uploadconcluido={uploadConcluido.toString()}
                    render={ImagemCentral}
                  />
                </Grid>
              </>
            </Grow>
          ) : (
            <Grid container>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <TitleSelfie>Vamos tirar uma selfie?</TitleSelfie>
                <SubTitleSelfie>
                  Retire óculos, chapéus e demais acessórios
                </SubTitleSelfie>
              </Grid>
              <Grid item xs={12} container justify="center">
                <ImgAsync
                  src={img}
                  uploadconcluido={uploadConcluido.toString()}
                  render={ImagemCentral}
                />
              </Grid>
            </Grid>
          )}

          <input
            name="uploadFile"
            onChange={changeFileHandle}
            accept="image/x-png,image/jpeg,image/jpg"
            ref={inputFileRef}
            type="file"
            style={{ display: 'none' }}
          />
          <Grid item container spacing={2} justify="center">
            <Grid item xs={12} container justify="center">
              <BotaoOutlineComIcone
                cy-element="botaoAbrirCamera"
                onClick={onClick}
              >
                <img src={getIcone('icon-camera')} alt="icone-camera" />
                {img ? 'Tirar outra foto' : 'Abrir câmera'}
              </BotaoOutlineComIcone>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Preview;
