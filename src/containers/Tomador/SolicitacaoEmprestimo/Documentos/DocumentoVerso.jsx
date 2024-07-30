import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';
import { useAppGlobal } from 'providers/AppGlobal';

import Grid from '@material-ui/core/Grid';

import { useFirebase, useCreditoExpress } from '@credito-express/ce-components';

import {
  dadosPadroesListaAvisos,
  toggleItemListaDeAvisosFactory,
} from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/dadosListaDeAviso';
import HeaderModalAviso from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/HeaderModalAviso';
import ListaDeAvisos from '~/pages/Tomador/ConfirmacaoEmprestimo/FotosDocumentos/ListaDeAvisos';
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
import Modal from '~/components/Modal';

import CnhVersoMascara from '../../../../assets/images/cnh-vers-mask.svg';
import RgVersoMascara from '../../../../assets/images/rg-verso-mask.svg';
import { getImage as getImageFirebase } from '../../../../commons/hooks/Firebase/storage';
import CardUploadDocumento from '../../../../components/CardUploadDocumento';
import Divider from '../../../../components/MaterialUI/Divider';
import Hidden from '../../../../components/MaterialUI/Hidden';

const DocumentoVerso = ({ atualizarDadosLocal }) => {
  const firebase = useFirebase();
  const { state: { analyticsEventoSufixo = '' } = {} } = useLocation();
  const [
    { dadosDocumentos: { docFrenteCapturaAutomatica, tipoDocumento } = {} },
    { setDocumentoVerso, etapaDocumentoVerso },
  ] = useSimulacaoState();
  const {
    state: { usuarioFirebase: usuarioAutenticado },
  } = useCreditoExpress();
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const [documentoVersoBase64, setDocumentoVersoBase64] = useState('');
  const [uploadConcluidoDocVerso, setUploadConcluidoDocVerso] = useState(false);
  const [loadingVerso, setLoadingVerso] = useState(false);
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

  const firebasePath = `/pessoa/${usuarioAutenticado.uid}/ep/documentos`;

  useEffect(() => {
    firebase
      .analytics()
      .logEvent(`acessou_captura_doc_verso${analyticsEventoSufixo}`);

    if (!textoBotaoTirarFoto) {
      recuperarImagemFirebase();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uploadConcluidoDocVerso) {
      const dadosDocumentos = {
        docVersoCapturaAutomatica: capturaAutomatica,
      };
      setDocumentoVerso(dadosDocumentos);
      atualizarDadosLocal({ dadosDocumentos });
      setValido(true);
    }
  }, [uploadConcluidoDocVerso, capturaAutomatica]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (documentoVersoBase64) {
      uploadB64();
    }
  }, [documentoVersoBase64]); // eslint-disable-line react-hooks/exhaustive-deps

  const recuperarImagemFirebase = async () => {
    try {
      setLoadingVerso(true);
      const imagemUrl = await getImageFirebase(
        `${firebasePath}/documento_verso.jpeg`,
        false,
      );
      if (imagemUrl) {
        setDocumentoVersoBase64(imagemUrl);
        setUploadConcluidoDocVerso(true);
        setTextoBotaoTirarFoto('TIRAR OUTRA FOTO');
      } else {
        setTextoBotaoTirarFoto('TIRAR FOTO');
      }
    } catch (ex) {
      console.error('Ocorreu um erro ao recuperar imagem do firebase', ex);
      setTextoBotaoTirarFoto('TIRAR FOTO');
    } finally {
      setLoadingVerso(false);
    }
  };

  const getDocImagem = () => {
    if (tipoDocumento === 'RG') {
      return documentoVersoBase64 || getIcone('RG-Frente');
    }
    return documentoVersoBase64 || getIcone('CNH-verso');
  };

  const getDocCamMascara = () => {
    if (tipoDocumento === 'RG') {
      return RgVersoMascara;
    }
    return CnhVersoMascara;
  };

  const handleFotoCapturada = (fotoB64, boolCapturaAutomatica) => {
    setCapturaAutomatica(boolCapturaAutomatica);
    setDocumentoVersoBase64(fotoB64);
  };

  async function uploadB64() {
    setLoadingVerso(true);
  }

  const handleNextStep = async () => {
    etapaDocumentoVerso();
  };

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

  return (
    <DivContentStyled>
      <Grid item xs={12} container direction="column" justify="space-between">
        <SolicitarEmprestimoStyled>
          Solicitar Emprestimo
        </SolicitarEmprestimoStyled>
        <TituloStyled>Envio de documentos verso</TituloStyled>
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
                      loading={loadingVerso}
                      handleNextStep={handleNextStep}
                      uploadConcluido={uploadConcluidoDocVerso}
                      mascara={getDocCamMascara()}
                      fotoCapturadaHandle={handleFotoCapturada}
                      documentoImagem={getDocImagem()}
                      lado="verso"
                      tipo={tipoDocumento}
                      modalVisivel={modalFotoVisivel}
                      setModalVisivel={setModalFotoVisivel}
                      modalAvisosVisivel={modalAvisosVisivel}
                      setModalAvisosVisivel={setModalAvisosVisivel}
                      textoBotaoTirarFoto={textoBotaoTirarFoto}
                      setCapturaAutomatica={setCapturaAutomatica}
                      renderModalAvisos={renderModalAvisos}
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
    </DivContentStyled>
  );
};

DocumentoVerso.label = 'Envio de documentos verso';
DocumentoVerso.title = 'Envie uma imagem do verso de seu documento';
DocumentoVerso.propTypes = {};

export default DocumentoVerso;
