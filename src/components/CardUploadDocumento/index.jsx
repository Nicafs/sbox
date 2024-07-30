import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ImgAsync from 'components/ImgAsync';
import LoaderCircular from 'components/LoaderCircular';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import ModalCamera from 'components/ModalCamera';
import { useAppGlobal } from 'providers/AppGlobal';

import { saveDocument } from '~/commons/resources/api/documento';
import { storageException } from '~/commons/resources/api/storageException';

import BotaoOutlineComIcone from '../BotaoOutlineComIcone';
import ImagePreview from '../ModalCamera/ImagePreview';
import CardUploadDocumentoLoader from './CardUploadDocumentoLoader';
import { Container, DocumentoImagem, PaperStyled } from './styles';

export default function CardUploadDocumento({
  idNegociacao,
  handleNextStep,
  documentoImagem,
  uploadConcluido,
  loading,
  lado,
  modalVisivel,
  setModalVisivel,
  textoBotaoTirarFoto = 'TIRAR FOTO',
  modalAvisosVisivel,
  setModalAvisosVisivel,
  renderModalAvisos,
}) {
  const {
    actions: { getIcone, exibirAlerta },
  } = useAppGlobal();
  const [imageUpload, setImageUpload] = useState('');
  const [fotoPreview, setFotoPreview] = useState(documentoImagem);
  let inputFileRef = React.createRef();
  const history = useHistory();

  const abrirUpload = () => {
    inputFileRef.click();
  };

  const changeFileHandle = evt => {
    const file = evt.target.files[0];
    const regex = new RegExp('(.*?).(jpg|jpeg)$');

    if (regex.test(file?.name?.toLowerCase())) {
      const reader = new FileReader();
      reader.onloadend = function fileCap() {
        const img = reader.result;

        setFotoPreview(img);
        setImageUpload(img);
      };
      reader.readAsDataURL(file);
    } else {
      exibirAlerta(
        'Formato da Imagem não suportada. Apenas JPG ou JPEG.',
        'error',
      );
    }
  };

  const getImagem = () => {
    if (fotoPreview) {
      return (
        <ImgAsync
          src={documentoImagem || fotoPreview}
          render={DocumentoImagem}
        />
      );
    }
    return <CardUploadDocumentoLoader />;
  };

  const handleFinish = image =>
    saveDocument(idNegociacao, image, lado).catch(error => {
      storageException({ error, push: history.push, exibirAlerta });
      throw error;
    });

  const handleClose = () => setImageUpload('');

  const handleHelp = () => setModalAvisosVisivel(true);

  const handleBotaoTirarFoto = () => {
    setModalVisivel(true);
    if (lado === 'frente') {
      handleHelp();
    }
  };

  return (
    <PaperStyled
      uploadconcluido={uploadConcluido ? uploadConcluido.toString() : ''}
      elevation={2}
    >
      {imageUpload && (
        <ImagePreview
          handleFinish={handleFinish}
          handleClose={handleClose}
          img={imageUpload}
          handleNextStep={handleNextStep}
        />
      )}
      {modalAvisosVisivel && renderModalAvisos()}
      {modalVisivel && (
        <ModalCamera
          lado={lado}
          handleHelp={handleHelp}
          onClose={() => setModalVisivel(false)}
          handleFinish={handleFinish}
          handleNextStep={handleNextStep}
        />
      )}
      <Container>
        {loading && (
          <Grid container justify="flex-end">
            <LoaderCircular />
          </Grid>
        )}
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} container justify="center">
            {getImagem()}
          </Grid>
          <Grid item xs={12} container justify="center" spacing={3}>
            <input
              name="uploadFile"
              onChange={changeFileHandle}
              accept="image/x-png,image/jpeg,image/jpg"
              ref={r => (inputFileRef = r)}
              type="file"
              style={{ display: 'none' }}
            />
            <Hidden smDown>
              <BotaoOutlineComIcone onClick={abrirUpload}>
                <img src={getIcone('icon-upload')} alt="Icone de Upload" />
                Upload
              </BotaoOutlineComIcone>
            </Hidden>
            <BotaoOutlineComIcone
              cy-element="botaoTirarFoto"
              onClick={handleBotaoTirarFoto}
            >
              <img src={getIcone('icon-camera')} alt="Icone de Câmera" />
              {textoBotaoTirarFoto}
            </BotaoOutlineComIcone>
          </Grid>
        </Grid>
      </Container>
    </PaperStyled>
  );
}
