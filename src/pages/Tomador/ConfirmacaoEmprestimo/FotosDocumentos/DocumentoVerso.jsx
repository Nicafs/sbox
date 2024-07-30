import React, { useEffect, useMemo, useState } from 'react';

import Button from 'components/MaterialUI/Button';
import { useAppGlobal } from 'providers/AppGlobal';

import Grid from '@material-ui/core/Grid';

import { useFirebase } from '@credito-express/ce-components';

import Box from '~/components/MaterialUI/Box';
import Modal from '~/components/Modal';

import CnhVersoMascara from '../../../../assets/images/cnh-vers-mask.svg';
import RgVersoMascara from '../../../../assets/images/rg-verso-mask.svg';
import { getImage as getImageFirebase } from '../../../../commons/hooks/Firebase/storage';
import ConfirmacaoEmprestimoApi from '../../../../commons/resources/confirmacao-emprestimo';
import CardUploadDocumento from '../../../../components/CardUploadDocumento';
import Divider from '../../../../components/MaterialUI/Divider';
import Hidden from '../../../../components/MaterialUI/Hidden';
import { podeRecuperarArquivos } from '../commons';
import {
  dadosPadroesListaAvisos,
  toggleItemListaDeAvisosFactory,
} from './dadosListaDeAviso';
import HeaderModalAviso from './HeaderModalAviso';
import ListaDeAvisos from './ListaDeAvisos';
import { AvisosContainer, UploadCardsContainer } from './style';

const DocumentoVerso = ({
  usuarioAutenticado,
  negociacao,
  setValido,
  analyticsEventoSufixo,
  setStepDocVersoReconhecido,
  handleNextStep,
}) => {
  const firebase = useFirebase();
  const { status: statusNegociacao } = negociacao;
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const TIPOS_DOCUMENTO = { cnh: 'CNH', rg: 'RG' };
  const [documentoVersoBase64, setDocumentoVersoBase64] = useState('');
  const [uploadConcluidoDocVerso, setUploadConcluidoDocVerso] = useState(false);
  const [loadingVerso, setLoadingVerso] = useState(false);
  const [modalAvisosVisivel, setModalAvisosVisivel] = useState(false);
  const [capturaAutomatica, setCapturaAutomatica] = useState(false);
  const [dadosListaDeAviso, setDadosListaDeAvisos] = useState(
    dadosPadroesListaAvisos,
  );
  const [modalFotoVisivel, setModalFotoVisivel] = useState(false);
  const firebasePath = `/pessoa/${usuarioAutenticado.uid}/${negociacao.id}`;
  const tipoDocumento = negociacao.analiseDocumento.tipoDocumentoIdentificacao;
  const textoBotaoTirarFoto = !podeRecuperarArquivos(statusNegociacao)
    ? 'TIRAR OUTRA FOTO'
    : undefined;

  useEffect(() => {
    firebase
      .analytics()
      .logEvent(`acessou_captura_doc_verso${analyticsEventoSufixo}`);

    if (podeRecuperarArquivos(statusNegociacao)) {
      recuperarImagemFirebase();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uploadConcluidoDocVerso) {
      confirmaEmprestimo();
      setStepDocVersoReconhecido(true);
    }
  }, [uploadConcluidoDocVerso, capturaAutomatica]); // eslint-disable-line react-hooks/exhaustive-deps

  const confirmaEmprestimo = () => {
    const idNegociacao = negociacao.id;
    ConfirmacaoEmprestimoApi.confirmaDocVerso({
      idNegociacao,
      capturaAutomatica,
    }).then(() => setValido(true));
  };

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
      }
    } catch (ex) {
      console.error('Ocorreu um erro ao recuperar imagem do firebase', ex);
    } finally {
      setLoadingVerso(false);
    }
  };

  const getDocImagem = () => {
    if (tipoDocumento === TIPOS_DOCUMENTO.rg) {
      return documentoVersoBase64 || getIcone('RG-Verso');
    }
    return documentoVersoBase64 || getIcone('CNH-verso');
  };

  const getDocCamMascara = () => {
    if (tipoDocumento === TIPOS_DOCUMENTO.rg) {
      return RgVersoMascara;
    }
    return CnhVersoMascara;
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
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} md={8} container justify="center">
            <UploadCardsContainer container justify="center" spacing={3}>
              <Grid
                item
                container
                xs={12}
                md={6}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <CardUploadDocumento
                    idNegociacao={negociacao.id}
                    handleNextStep={handleNextStep}
                    loading={loadingVerso}
                    uploadConcluido={uploadConcluidoDocVerso}
                    mascara={getDocCamMascara()}
                    documentoImagem={getDocImagem()}
                    lado="verso"
                    tipo={tipoDocumento}
                    modalVisivel={modalFotoVisivel}
                    setModalVisivel={setModalFotoVisivel}
                    textoBotaoTirarFoto={textoBotaoTirarFoto}
                    setCapturaAutomatica={setCapturaAutomatica}
                    modalAvisosVisivel={modalAvisosVisivel}
                    setModalAvisosVisivel={setModalAvisosVisivel}
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
    </Grid>
  );
};

DocumentoVerso.label = 'Envio de documentos verso';
DocumentoVerso.title = 'Envie uma imagem do verso de seu documento';
DocumentoVerso.propTypes = {};

export default DocumentoVerso;
