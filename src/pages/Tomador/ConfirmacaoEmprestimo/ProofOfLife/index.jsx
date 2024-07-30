import React, { useEffect, useState } from 'react';

import { getImage as getImageFirebase } from 'commons/hooks/Firebase/storage';
import ConfirmacaoEmprestimoApi from 'commons/resources/confirmacao-emprestimo';
import { saveSelfie, saveProofOfLife } from 'commons/resources/selfie';
import AvisosList from 'components/AvisosList';
import { FullScreenLoading } from 'components/LoaderCircular/FullScreenLoading';
import ModalQrCode from 'components/ModalQrCode';
import { useAppGlobal } from 'providers/AppGlobal';

import { Grid, Divider, Hidden } from '@material-ui/core';

import { useFirebase } from '@credito-express/ce-components';

import MulherSegurandoCelularAsset from '../../../../assets/images/mulher-segurando-celular.jpg';
import pushRota from '../../../../routes/push';
import { podeRecuperarArquivos } from '../commons';
import DetectEmotions from './DetectEmotions';
import { Instructions, Help } from './Modal';
import Preview from './Preview';
import Selfie from './Selfie';
import { FormContainer, AvisosContainer } from './styles';

const ProofOfLife = ({
  usuarioAutenticado,
  negociacao,
  analyticsEventoSufixo,
  setValido,
  setFaceApi,
  realizouProvaVida,
  setRealizouProvaVida,
}) => {
  const firebase = useFirebase();
  const [capturaSelfie, setCapturaSelfie] = useState(false);
  const [selfiePreview, setSelfiePreview] = useState();
  const [uploadConcluido, setUploadConcluido] = useState(false);
  const [verificaEtapa, setVerificaEtapa] = useState(false);
  const [modalQrCodeVisivel, setModalQrCodeVisivel] = useState(false);
  const [modalHelp, setModalHelp] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id: idNegociacao, status: statusNegociacao } = negociacao;

  const [capturaProofOfLife, setCapturaProofOfLife] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const textoBotaoTirarFoto = !podeRecuperarArquivos(statusNegociacao)
    ? 'TIRAR OUTRA FOTO'
    : undefined;
  const FIREBASE_PATH = `/pessoa/${usuarioAutenticado.uid}/${idNegociacao}/selfie.jpeg`;

  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  const uploadProofOfLife = async ({ surpImg, happyImg, neutralImg }) => {
    const uploadFireBase = async ({ img: fileBase64, tipo }) => {
      try {
        await saveProofOfLife(idNegociacao, fileBase64, tipo);
      } catch (error) {
        if (error?.response?.data?.erros) {
          const { descricao, codigo } = error?.response?.data?.erros[0] || {};
          if (codigo === 'STORAGE005') {
            exibirAlerta(descricao, 'error');
            pushRota('/meus-emprestimos');
          }
        }
      }
    };

    await uploadFireBase({
      img: surpImg,
      type: 'selfie_surpreso',
      tipo: 'surpreso',
    });
    await uploadFireBase({
      img: happyImg,
      type: 'selfie_feliz',
      tipo: 'feliz',
    });
    await uploadFireBase({
      img: neutralImg,
      type: 'selfie_neutro',
      tipo: 'neutro',
    });
  };

  const onFinish = async faceDetections => {
    setLoading(true);
    const { img: surpImg, ...surprised } = faceDetections.surprised;
    const { img: happyImg, ...hapy } = faceDetections.happy;
    const { img: neutralImg, ...neutral } = faceDetections.neutral;
    const surpresoScore = {
      pessoaScore: surprised.identifiedUser,
      expressaoScore: surprised.expression,
    };
    const felizScore = {
      pessoaScore: hapy.identifiedUser,
      expressaoScore: hapy.expression,
    };
    const neutroScore = {
      pessoaScore: neutral.identifiedUser,
      expressaoScore: neutral.expression,
    };
    await uploadProofOfLife({ surpImg, happyImg, neutralImg })
      .then(async () => {
        setCapturaProofOfLife(true);
        setRealizouProvaVida(true);

        firebase
          .analytics()
          .logEvent(`acessou_captura_selfie${analyticsEventoSufixo}`);

        setFaceApi({ surpresoScore, felizScore, neutroScore });
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const recuperarImagemFirebase = () => {
    try {
      setLoading(true);
      getImageFirebase(FIREBASE_PATH, false)
        .then(imageBucket => {
          if (imageBucket) {
            setSelfiePreview(imageBucket);
            setUploadConcluido(true);

            firebase
              .analytics()
              .logEvent(`acessou_captura_selfie${analyticsEventoSufixo}`);
          } else {
            setOpenInstructions(true);
          }

          setVerificaEtapa(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (ex) {
      console.error('Ocorreu um erro ao recuperar imagem do firebase', ex);
    }
  };

  const selfieHandler = async base64 => {
    if (base64) {
      setLoading(true);
      try {
        setSelfiePreview(base64);
        await saveSelfie(idNegociacao, base64)
          .then(() => ConfirmacaoEmprestimoApi.confirmaSelfie({ idNegociacao }))
          .then(() => {
            setUploadConcluido(true);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        if (error?.response?.data?.erros) {
          const { descricao, codigo } = error?.response?.data?.erros[0] || {};
          if (codigo === 'STORAGE005') {
            exibirAlerta(descricao, 'error');
            pushRota('/meus-emprestimos');
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (uploadConcluido) {
      setValido(true);
    }
  }, [uploadConcluido]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    firebase.analytics().logEvent(`acessou_prova_vida${analyticsEventoSufixo}`);

    if (!textoBotaoTirarFoto && podeRecuperarArquivos(statusNegociacao)) {
      recuperarImagemFirebase();
    } else {
      setOpenInstructions(true);
      setVerificaEtapa(true);
    }

    if (realizouProvaVida) {
      setCapturaProofOfLife(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleInstructions = () => {
    setOpenInstructions(prevState => !prevState);
  };
  const toggleCapturaSelfie = () => setCapturaSelfie(prevState => !prevState);
  const toogleModalHelp = () => setModalHelp(prevState => !prevState);

  return (
    <FormContainer>
      <FullScreenLoading loading={loading} />
      <Grid container>
        {!verificaEtapa && (
          <Grid container item xs={12} sm={12} md={8} justify="center" />
        )}

        {verificaEtapa && (
          <Grid container item xs={12} sm={12} md={8} justify="center">
            {!capturaProofOfLife ? (
              <>
                <DetectEmotions onFinish={onFinish} />
                <Instructions
                  open={openInstructions}
                  onClose={toggleInstructions}
                  onSubmit={toogleModalHelp}
                />
                <Help open={modalHelp} onClose={toogleModalHelp} />
              </>
            ) : null}

            {capturaProofOfLife && !capturaSelfie ? (
              <Preview
                onClick={toggleCapturaSelfie}
                setImg={setSelfiePreview}
                uploadConcluido={uploadConcluido}
                img={selfiePreview || MulherSegurandoCelularAsset}
              />
            ) : null}

            {capturaProofOfLife && capturaSelfie ? (
              <Selfie
                onClose={toggleCapturaSelfie}
                selfiePreview={selfiePreview}
                selfieHandler={selfieHandler}
              />
            ) : null}
          </Grid>
        )}

        <Hidden mdDown>
          <Grid item xs={1} container justify="center">
            <Divider orientation="vertical" />
          </Grid>

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
        </Hidden>
      </Grid>

      {modalQrCodeVisivel && (
        <ModalQrCode
          open={modalQrCodeVisivel}
          dismissHandler={() => setModalQrCodeVisivel(false)}
          fecharHandler={() => setModalQrCodeVisivel(false)}
          maxWidth="md"
        />
      )}
    </FormContainer>
  );
};

ProofOfLife.label = 'Prova de Vida';
ProofOfLife.title = 'Prova de Vida';
ProofOfLife.propTypes = {};

export default ProofOfLife;
