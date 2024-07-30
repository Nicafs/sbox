import React, { useEffect, useMemo, useState } from 'react';

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
import { useAppGlobal } from 'providers/AppGlobal';

import { useFirebase } from '@credito-express/ce-components';

import ConfirmacaoEmprestimoApi from '~/commons/resources/confirmacao-emprestimo';

import { podeRecuperarArquivos } from '../commons';
import {
  dadosPadroesListaAvisos,
  toggleItemListaDeAvisosFactory,
} from './dadosListaDeAviso';
import HeaderModalAviso from './HeaderModalAviso';
import ListaDeAvisos from './ListaDeAvisos';
import { AvisosContainer, UploadCardsContainer } from './style';

const DocumentoFrente = ({
  usuarioAutenticado,
  negociacao,
  setValido,
  setNegociacao,
  analyticsEventoSufixo,
  setStepDocVersoReconhecido,
  handleNextStep,
}) => {
  const firebase = useFirebase();
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const { id: idNegociacao, status: statusNegociacao } = negociacao;
  const TIPOS_DOCUMENTO = { cnh: 'CNH', rg: 'RG' };
  const [tipoDocumento, setTipoDocumento] = useState();
  const [documentoFrenteBase64, setDocumentoFrenteBase64] = useState('');
  const [uploadConcluidoDocFrente, setUploadConcluidoDocFrente] = useState(
    false,
  );
  const [loadingFrente, setLoadingFrente] = useState(false);
  const [modalAvisosVisivel, setModalAvisosVisivel] = useState(false);
  const [capturaAutomatica, setCapturaAutomatica] = useState(false);
  const [dadosListaDeAviso, setDadosListaDeAvisos] = useState(
    dadosPadroesListaAvisos,
  );
  const [modalFotoVisivel, setModalFotoVisivel] = useState(false);
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
  const firebasePath = `/pessoa/${usuarioAutenticado.uid}/${negociacao.id}`;
  const textoBotaoTirarFoto = !podeRecuperarArquivos(statusNegociacao)
    ? 'TIRAR OUTRA FOTO'
    : undefined;

  useEffect(() => {
    firebase
      .analytics()
      .logEvent(`acessou_captura_doc_frente${analyticsEventoSufixo}`);
    if (!textoBotaoTirarFoto && podeRecuperarArquivos(statusNegociacao)) {
      recuperarImagemFirebase();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uploadConcluidoDocFrente) {
      setNegociacao({
        ...negociacao,
        analiseDocumento: {
          ...negociacao.analiseDocumento,
          tipoDocumentoIdentificacao: tipoDocumento,
        },
      });
      persisteConfirmacoes();
      setStepDocVersoReconhecido(false);
    }
  }, [uploadConcluidoDocFrente, tipoDocumento, capturaAutomatica]); // eslint-disable-line react-hooks/exhaustive-deps

  const recuperarImagemFirebase = async () => {
    try {
      setLoadingFrente(true);
      const imagemUrl = await getImageFirebase(
        `${firebasePath}/documento_frente.jpeg`,
        false,
      );
      if (imagemUrl) {
        setDocumentoFrenteBase64(imagemUrl);
        setUploadConcluidoDocFrente(true, true);
      }
    } catch (ex) {
      console.error('Ocorreu um erro ao recuperar imagem do firebase', ex);
    } finally {
      setLoadingFrente(false);
    }
  };

  const getDocImagem = () => {
    if (tipoDocumento === TIPOS_DOCUMENTO.rg) {
      return documentoFrenteBase64 || getIcone('RG-Frente');
    }
    return documentoFrenteBase64 || getIcone('CNH-frente');
  };

  const getDocCamMascara = () => {
    if (tipoDocumento === TIPOS_DOCUMENTO.rg) {
      return RgFrenteMascara;
    }
    return CnhFrenteMascara;
  };

  const persisteConfirmacoes = async () => {
    if (tipoDocumento) {
      await ConfirmacaoEmprestimoApi.confirmaTipoDocumento({
        idNegociacao,
        tipoDocumento,
      });
    }
    await ConfirmacaoEmprestimoApi.confirmaDocFrente({
      idNegociacao,
      capturaAutomatica,
    });
    setValido(true);
  };

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
    <>
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
                    idNegociacao={negociacao.id}
                    handleNextStep={handleNextStep}
                    loading={loadingFrente}
                    uploadConcluido={uploadConcluidoDocFrente}
                    mascara={getDocCamMascara()}
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
            <AvisosContainer item xs={12} md={3}>
              <ListaDeAvisos
                data={dadosListaDeAviso}
                toggleItemListaDeAvisos={toggleItemListaDeAvisosFactory(
                  dadosListaDeAviso,
                  setDadosListaDeAvisos,
                )}
              />
            </AvisosContainer>
          </Hidden>
        </Grid>
      </Grid>
    </>
  );
};

DocumentoFrente.label = 'Envio de documentos frente';
DocumentoFrente.title = 'Envie uma imagem da frente de seu documento';
DocumentoFrente.propTypes = {};

export default DocumentoFrente;
