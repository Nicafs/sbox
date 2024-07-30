import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ImgAsync from 'components/ImgAsync';
import { useAppGlobal } from 'providers/AppGlobal';

import Grid from '@material-ui/core/Grid';

import { useFirebase } from '@credito-express/ce-components';

import { saveDocument } from '~/commons/resources/api/documento';
import { storageException } from '~/commons/resources/api/storageException';

import MulherSegurandoCelularAsset from '../../../../assets/images/mulher-segurando-celular.jpg';
import { getImage as getImageFirebase } from '../../../../commons/hooks/Firebase/storage';
import AvisosList from '../../../../components/AvisosList';
import BotaoOutlineComIcone from '../../../../components/BotaoOutlineComIcone';
import LoaderCircular from '../../../../components/LoaderCircular';
import Divider from '../../../../components/MaterialUI/Divider';
import Hidden from '../../../../components/MaterialUI/Hidden';
import ModalCamera from '../../../../components/ModalCamera';
import ModalQrCode from '../../../../components/ModalQrCode';
import { podeRecuperarArquivos } from '../commons';
import {
  AvisosContainer,
  ImagemCentral,
  SubTituloSelfie,
  TituloSelfie,
} from './styles';

const SelfieTomador = ({
  negociacao,
  usuarioAutenticado,
  setValido,
  analyticsEventoSufixo,
  handleNextStep,
}) => {
  const firebase = useFirebase();
  const { status: statusNegociacao, id: idNegociacao } = negociacao;
  const [modalCameraVisivel, setModalCameraVisivel] = useState(false);
  const [modalQrCodeVisivel, setModalQrCodeVisivel] = useState(false);
  const [selfiePreview, setSelfiePreview] = useState();
  const [uploadConcluido, setUploadConcluido] = useState(false);
  const [loading, setLoading] = useState(false);
  const firebasePath = `/pessoa/${usuarioAutenticado.uid}/${negociacao.id}`;
  const {
    actions: { getIcone, exibirAlerta },
  } = useAppGlobal();

  const history = useHistory();

  useEffect(() => {
    firebase
      .analytics()
      .logEvent(`acessou_captura_selfie${analyticsEventoSufixo}`);

    if (podeRecuperarArquivos(statusNegociacao)) {
      recuperarImagemFirebase();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uploadConcluido) {
      setValido(true);
    }
  }, [uploadConcluido]); // eslint-disable-line react-hooks/exhaustive-deps

  const recuperarImagemFirebase = async () => {
    try {
      setLoading(true);
      const imagemUrl = await getImageFirebase(
        `${firebasePath}/selfie.jpeg`,
        false,
      );
      if (imagemUrl) {
        setSelfiePreview(imagemUrl);
        setUploadConcluido(true);
      }
    } catch (ex) {
      console.error('Ocorreu um erro ao recuperar imagem do firebase', ex);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = image =>
    saveDocument(idNegociacao, image, 'selfie').catch(error => {
      storageException({ error, push: history.push, exibirAlerta });
      throw error;
    });

  return (
    <>
      {modalCameraVisivel && (
        <ModalCamera
          onClose={() => setModalCameraVisivel(false)}
          handleFinish={handleFinish}
          handleNextStep={handleNextStep}
        />
      )}
      {modalQrCodeVisivel && (
        <ModalQrCode
          open={modalQrCodeVisivel}
          dismissHandler={() => setModalQrCodeVisivel(false)}
          fecharHandler={() => setModalQrCodeVisivel(false)}
          maxWidth="md"
        />
      )}
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={8} container justify="center">
              {loading && (
                <Grid container justify="flex-end">
                  <LoaderCircular />
                </Grid>
              )}
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <TituloSelfie>Vamos tirar uma selfie?</TituloSelfie>
                <SubTituloSelfie>
                  Retire óculos, chapéus e demais acessórios
                </SubTituloSelfie>
              </Grid>
              <Grid item xs={12} container justify="center">
                <ImgAsync
                  src={selfiePreview || MulherSegurandoCelularAsset}
                  uploadconcluido={uploadConcluido.toString()}
                  render={ImagemCentral}
                />
              </Grid>
              <Grid item xs={12} container justify="center">
                <BotaoOutlineComIcone
                  cy-element="botaoAbrirCamera"
                  onClick={() => setModalCameraVisivel(true)}
                >
                  <img src={getIcone('icon-camera')} alt="icone-camera" />
                  {selfiePreview ? 'Tirar outra foto' : 'Abrir câmera'}
                </BotaoOutlineComIcone>
              </Grid>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={1} container justify="center">
                <Divider orientation="vertical" />
              </Grid>
            </Hidden>
            <AvisosContainer item xs={12} md={3}>
              <AvisosList
                data={{
                  titulo: 'Atenção!',
                  items: [
                    {
                      descricao: `Retire óculos, chapéus e demais acessórios.`,
                      destaque: true,
                    },
                    {
                      descricao: `Tire a foto em um ambiente iluminado.`,
                    },
                  ],
                }}
              />
            </AvisosContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

SelfieTomador.label = 'Tire um selfie';
SelfieTomador.title = 'Selfie de autenticação';

export default SelfieTomador;
