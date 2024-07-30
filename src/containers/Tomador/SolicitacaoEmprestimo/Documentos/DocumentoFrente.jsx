import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import CnhFrenteMascara from 'assets/images/cnh-frent-mask.svg';
import RgFrenteMascara from 'assets/images/rg-frent-mask.svg';
import { getImage as getImageFirebase } from 'commons/hooks/Firebase/storage';
import CardUploadDocumento from 'components/CardUploadDocumento';
import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Divider from 'components/MaterialUI/Divider';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import Modal from 'components/Modal';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';
import { useAppGlobal } from 'providers/AppGlobal';

import { useFirebase, useCreditoExpress } from '@credito-express/ce-components';

import {
  dadosPadroesListaAvisos,
  toggleItemListaDeAvisosFactory,
} from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/dadosListaDeAviso';
import HeaderModalAviso from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/HeaderModalAviso';
import ListaDeAvisos from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/ListaDeAvisos';
import ModalTipoDocumento from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/ModalTipoDocumento';
import {
  AvisosContainer,
  UploadCardsContainer,
} from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/style';
import {
  BoxContentStyled,
  SolicitarEmprestimoStyled,
  TituloStyled,
  DivContentStyled,
} from '~/pages/Tomador/ConfirmacaoEmprestimo/style';

import FooterMobileSolicitacaoEmprestimo from '~/components/FooterMobileSolicitacaoEmprestimo';

const DocumentoFrente = ({ atualizarDadosLocal }) => {
  const [
    {
      dadosDocumentos: {
        docFrenteCapturaAutomatica,
        tipoDocumento: tipoDoc,
      } = {},
    },
    { setDocumentoFrente, etapaDocumentoFrente },
  ] = useSimulacaoState();
  const { state: { analyticsEventoSufixo = '' } = {} } = useLocation();
  const {
    state: { usuarioFirebase: usuarioAutenticado },
  } = useCreditoExpress();
  const firebase = useFirebase();
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const [tipoDocumento, setTipoDocumento] = useState(tipoDoc);
  const [documentoNaoReconhecido, setdocumentoNaoReconhecido] = useState(false);
  const [documentoFrenteBase64, setDocumentoFrenteBase64] = useState('');
  const [uploadConcluidoDocFrente, setUploadConcluidoDocFrente] = useState(
    false,
  );
  const [uploadConcluidoInit, setUploadConcluidoInit] = useState(false);
  const [loadingFrente, setLoadingFrente] = useState(false);
  const [modalAvisosVisivel, setModalAvisosVisivel] = useState(false);
  const [capturaAutomatica, setCapturaAutomatica] = useState(
    docFrenteCapturaAutomatica || false,
  );
  const [dadosListaDeAviso, setDadosListaDeAvisos] = useState(
    dadosPadroesListaAvisos,
  );
  const [modalFotoVisivel, setModalFotoVisivel] = useState(false);
  const [valido, setValido] = useState(false);
  const [textoBotaoTirarFoto, setTextoBotaoTirarFoto] = useState(undefined);

  const botaoModalAvisoVisivel = useMemo(() => {
    if (dadosListaDeAviso) {
      const { items } = dadosListaDeAviso;
      const checkboxNaoSelecionado = items.find(d => !d.selecionado);
      if (!checkboxNaoSelecionado) {
        return true;
      }
    } else {
      return false;
    }
  }, [dadosListaDeAviso]);

  const firebasePath = `/pessoa/${usuarioAutenticado.uid}/ep/documentos`;

  useEffect(() => {
    firebase
      .analytics()
      .logEvent(`acessou_captura_doc_frente${analyticsEventoSufixo}`);
    if (!textoBotaoTirarFoto) {
      recuperarImagemFirebase();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (documentoFrenteBase64) {
      uploadB64();
    }
  }, [documentoFrenteBase64]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uploadConcluidoDocFrente) {
      const dadosDocumentos = {
        bucketPath: firebasePath,
        docFrenteCapturaAutomatica: capturaAutomatica,
        tipoDocumento,
      };

      setDocumentoFrente(dadosDocumentos);
      atualizarDadosLocal({ dadosDocumentos });
      setUploadConcluidoDocFrente(false);
      setValido(true);

      if (!capturaAutomatica && !uploadConcluidoInit) {
        setdocumentoNaoReconhecido(true);
      } else {
        setUploadConcluidoInit(false);
      }
    }
  }, [uploadConcluidoDocFrente, capturaAutomatica]); // eslint-disable-line react-hooks/exhaustive-deps

  const confirmTipoDocumento = tipoDocumentoRetorno => {
    if (tipoDocumentoRetorno) {
      const dadosDocumentos = {
        bucketPath: firebasePath,
        docFrenteCapturaAutomatica: capturaAutomatica,
        tipoDocumento: tipoDocumentoRetorno,
      };
      setTipoDocumento(tipoDocumentoRetorno);
      setDocumentoFrente(dadosDocumentos);
      atualizarDadosLocal({ dadosDocumentos });

      setdocumentoNaoReconhecido(false);
    }
  };

  const recuperarImagemFirebase = async () => {
    try {
      setLoadingFrente(true);
      const imagemUrl = await getImageFirebase(
        `${firebasePath}/documento_frente.jpeg`,
        false,
      );
      if (imagemUrl) {
        setDocumentoFrenteBase64(imagemUrl);
        setUploadConcluidoInit(true);
        setUploadConcluidoDocFrente(true);
        setTextoBotaoTirarFoto('TIRAR OUTRA FOTO');
      } else {
        setTextoBotaoTirarFoto('TIRAR FOTO');
      }
    } catch (ex) {
      console.error('Ocorreu um erro ao recuperar imagem do firebase', ex);
      setTextoBotaoTirarFoto('TIRAR FOTO');
    } finally {
      setLoadingFrente(false);
    }
  };

  const getDocImagem = () => {
    if (tipoDocumento === 'RG') {
      return documentoFrenteBase64 || getIcone('RG-Frente');
    }
    return documentoFrenteBase64 || getIcone('CNH-frente');
  };

  const getDocCamMascara = () => {
    if (tipoDocumento === 'RG') {
      return RgFrenteMascara;
    }
    return CnhFrenteMascara;
  };

  const handleFotoCapturada = (fotoB64, boolCapturaAutomatica) => {
    setCapturaAutomatica(boolCapturaAutomatica);
    setDocumentoFrenteBase64(fotoB64);
  };

  async function uploadB64() {
    setLoadingFrente(true);
  }

  const renderModalAvisos = () => (
    <Modal
      open={modalAvisosVisivel}
      dismissHandler={() => setModalAvisosVisivel(false)}
      fecharHandler={() => setModalAvisosVisivel(false)}
      maxWidth="md"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <Box p={4}>
        <Grid container>
          <ListaDeAvisos
            exibirContinuarNoCelular={false}
            comCheckbox
            data={dadosListaDeAviso}
            toggleItemListaDeAvisos={toggleItemListaDeAvisosFactory(
              dadosListaDeAviso,
              setDadosListaDeAvisos,
            )}
            ModalHeaderComponent={textoBotaoTirarFoto ? HeaderModalAviso : null}
            textEnvio="Envie"
          />
          {botaoModalAvisoVisivel && (
            <Grid container justify="center">
              <Grid item xs={12} md={3}>
                <Box mb={2}>
                  <Button
                    cy-element="modalBotaoAviso"
                    primary="true"
                    rounded="true"
                    onClick={() => {
                      setModalAvisosVisivel(false);
                      setModalFotoVisivel(true);
                    }}
                    fullWidth
                  >
                    Ok, entendi
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );

  const handleNextStep = async () => {
    if (!tipoDocumento) {
      setdocumentoNaoReconhecido(true);
    } else {
      etapaDocumentoFrente();
    }
  };

  return (
    <DivContentStyled>
      <Grid item xs={12} container direction="column" justify="space-between">
        <SolicitarEmprestimoStyled>
          Solicitar Emprestimo
        </SolicitarEmprestimoStyled>
        <TituloStyled>Envie uma imagem da frente de seu documento</TituloStyled>
      </Grid>

      <BoxContentStyled>
        <Grid container>
          <Grid item xs={12} container>
            <Grid item xs={12} md={8} container justify="center">
              <UploadCardsContainer
                container
                justify="center"
                spacing={3}
                alignItems="center"
              >
                <Grid item container xs={12} md={6} justify="center">
                  <Grid item xs={12}>
                    <CardUploadDocumento
                      loading={loadingFrente}
                      handleNextStep={handleNextStep}
                      uploadConcluido={uploadConcluidoDocFrente}
                      mascara={getDocCamMascara()}
                      fotoCapturadaHandle={handleFotoCapturada}
                      documentoImagem={getDocImagem()}
                      lado="frente"
                      setTipoDocumento={setTipoDocumento}
                      modalVisivel={modalFotoVisivel}
                      setModalVisivel={setModalFotoVisivel}
                      textoBotaoTirarFoto={textoBotaoTirarFoto}
                      modalAvisosVisivel={modalAvisosVisivel}
                      setModalAvisosVisivel={setModalAvisosVisivel}
                      renderModalAvisos={renderModalAvisos}
                      setCapturaAutomatica={setCapturaAutomatica}
                    />
                  </Grid>
                </Grid>
              </UploadCardsContainer>
            </Grid>
            <Hidden smDown>
              <Grid item xs={1} container justify="center">
                <Divider orientation="vertical" />
              </Grid>
              <AvisosContainer
                item
                xs={12}
                md={3}
                justify="center"
                style={{ alignSelf: 'center' }}
              >
                <ListaDeAvisos
                  data={dadosListaDeAviso}
                  toggleItemListaDeAvisos={toggleItemListaDeAvisosFactory(
                    dadosListaDeAviso,
                    setDadosListaDeAvisos,
                  )}
                />
              </AvisosContainer>
            </Hidden>
            <Hidden smDown>
              <Grid item container justify="flex-end">
                <Grid item xs={12} md={2}>
                  <Box mt={4} mb={4}>
                    <Button
                      cy-element="btnSubmit"
                      secondary="true"
                      rounded="true"
                      fullWidth
                      disabled={!valido}
                      onClick={handleNextStep}
                    >
                      Avançar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>

        <FooterMobileSolicitacaoEmprestimo
          getBotaoTexto={() => 'AVANÇAR'}
          getBotaoHabilitado={valido}
          handleNext={handleNextStep}
        />
      </BoxContentStyled>

      {documentoNaoReconhecido && (
        <ModalTipoDocumento
          open={documentoNaoReconhecido}
          btnConfirmHandler={confirmTipoDocumento}
        />
      )}
    </DivContentStyled>
  );
};

DocumentoFrente.label = 'Envio de documentos frente';
DocumentoFrente.title = 'Envie uma imagem da frente de seu documento';
DocumentoFrente.propTypes = {};

export default DocumentoFrente;
