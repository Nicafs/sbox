import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import ImgAsync from 'components/ImgAsync';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

import { getAudio, getFileUrl } from '~/commons/hooks/Firebase/storage';
import { saveAudio } from '~/commons/resources/api/audio';
import Negociacao from '~/commons/resources/negociacao';
import { blobToBase64 } from '~/commons/utils/ManipulacaoUtils';

import AlertaComDescricao from '~/components/AlertaComDescricao';
import DialogGravacaoAudio from '~/components/DialogGravacaoAudio';
import DialogInstrucoesPermissaoAudio from '~/components/DialogInstrucoesPermissaoAudio';
import GravacaoReproducaoAudio from '~/components/GravacaoReproducaoAudio';
import LoaderCircular from '~/components/LoaderCircular';
import { checkAudioPermission } from '~/components/ReactWebAudio';

import { podeRecuperarArquivos } from '../commons';
import {
  ImgPessoaFalandoStyled,
  TypographyInnerHeaderStyled,
  TypographyInnerSubHeaderStyled,
  GridInnerHeaderStyled,
  GridInnerBodyStyled,
  GridGravadorLoadingStyled,
  MsgPalavraChaveStyled,
} from './style';

const AssinaturaAudio = ({
  negociacao,
  setNegociacao,
  pessoa,
  setValido,
  processaAudioAssinatura,
  analyticsEventoSufixo,
  handleNextStep,
}) => {
  const isMountedRef = useRef(null);
  const history = useHistory();
  const firebase = useFirebase();
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const {
    id: idNegociacao,
    audioEstaVerificado: audioVerificadoLocal,
    status: statusNegociacao,
    analiseDocumento: {
      infosExtra: {
        audioAtual: { validado: audioPrevio = false } = {},
        solicitacaoReenvio = [],
      } = {},
    } = {},
  } = negociacao;

  const [
    reconhecimentoAssinaturaLoading,
    setReconhecimentoAssinaturaLoading,
  ] = useState(false);
  const [textoDeVerificacao, setTextoVerificacao] = useState('');
  const [usuarioAutenticado, setUsuarioAutenticado] = useState();
  const [_openGravarAudioDialog, _setOpenGravarAudioDialog] = useState(false);
  const [_countOpenGravarAudio, _setCountOpenGravarAudio] = useState(0);
  const [audioBlobUri, setAudioBlobUri] = useState(null);
  const [_openPermissaoAudioDialog, _setOpenPermissaoAudioDialog] = useState(
    false,
  );
  const [audioStorageUrl, setAudioStorageUrl] = useState('');
  const [alertaInfo, setAlertaInfo] = useState({
    tipo: null,
    mensagem: null,
    titulo: null,
  });
  const {
    state: { usuarioFirebase: user },
  } = useCreditoExpress();

  const audioVerificadoPreviamente =
    audioPrevio && !solicitacaoReenvio.includes('AUDIO');

  const getAudioPermission = async () => {
    const res = await checkAudioPermission();
    if (isMountedRef.current) {
      if (!res && _countOpenGravarAudio > 1) {
        _setOpenPermissaoAudioDialog(true);
      }
    }
  };

  const msgPalavraChave = resultadoPalavrasChave => {
    const palavrasConhecidas =
      resultadoPalavrasChave.quantidadeParcelas &&
      resultadoPalavrasChave.valorDaParcela &&
      resultadoPalavrasChave.valorEmprestimo;

    return (
      <Grid item>
        {palavrasConhecidas && (
          <p>
            Não foi reconhecido palavras chaves no aúdio. Por favor tente
            novamente!
          </p>
        )}
        {!palavrasConhecidas && (
          <>
            <p>Não entendemos muito bem as informações abaixo:</p>

            <MsgPalavraChaveStyled>
              {!resultadoPalavrasChave.quantidadeParcelas && (
                <li>Quantidade de Parcelas.</li>
              )}
              {!resultadoPalavrasChave.valorDaParcela && (
                <li>Valor da Parcela. </li>
              )}
              {!resultadoPalavrasChave.valorEmprestimo && (
                <li>Valor do Empréstimo.</li>
              )}
            </MsgPalavraChaveStyled>
            <p>Por favor, tente novamente</p>
          </>
        )}
      </Grid>
    );
  };

  const carregarTextoDeVerificacao = async () => {
    try {
      const {
        textoAssinaturaAudio,
      } = await Negociacao.buscarTextoAssinaturaTomador(idNegociacao);

      if (isMountedRef.current) {
        setTextoVerificacao(textoAssinaturaAudio);
      }
    } catch (err) {
      console.error(err);
      setAlertaInfo({
        tipo: 'error',
        mensagem:
          'Ocorreu um erro ao o carregar texto de assinatura, tente novamente mais tarde',
        titulo: 'Erro',
      });
    }
  };

  useEffect(() => {
    if (audioVerificadoLocal || audioVerificadoPreviamente) {
      setAlertaInfo({
        tipo: 'success',
        mensagem: `Sua assinatura foi reconhecida com sucesso, clique em AVANÇAR para continuar`,
        titulo: 'Sucesso',
      });
    }
  }, [audioVerificadoLocal, audioVerificadoPreviamente]);

  const confirmaAssinaturaValida = async () => {
    const { qtdTentativas = 0 } = negociacao;
    const tentativaAtualNumero = qtdTentativas + 1;
    setReconhecimentoAssinaturaLoading(true);
    setAlertaInfo({
      tipo: 'info',
      mensagem: `Estamos analisando o conteúdo da sua assinatura, aguarde! (${tentativaAtualNumero}° Tentativa)`,
      titulo: 'Analisando',
    });
    let negociacaoNovoEstado = {
      ...negociacao,
      qtdTentativas: tentativaAtualNumero,
    };
    try {
      const { id: idNegociacaoAtual } = negociacao;
      const {
        audioEstaVerificado,
        resultadoPalavrasChave,
      } = await processaAudioAssinatura(idNegociacaoAtual);

      const validadoPalavraChave = Object.keys(resultadoPalavrasChave).find(
        key => resultadoPalavrasChave[key] === false,
      );

      if (validadoPalavraChave) {
        setAlertaInfo({
          tipo: 'error',
          mensagem: msgPalavraChave(resultadoPalavrasChave),
          titulo: 'Falhou',
        });
        return;
      }

      if (isMountedRef.current) {
        if (audioEstaVerificado) {
          setAlertaInfo({
            tipo: 'success',
            mensagem: `Sua assinatura foi reconhecida com sucesso, clique em AVANÇAR para continuar!`,
            titulo: 'Sucesso',
          });
          negociacaoNovoEstado = {
            ...negociacaoNovoEstado,
            audioEstaVerificado: true,
          };
          handleNextStep();
        } else {
          setAlertaInfo({
            tipo: 'error',
            mensagem: `Não reconhecemos as condições do empréstimo na sua assinatura de áudio, tente novamente (${tentativaAtualNumero}° Tentativa)`,
            titulo: 'Falhou',
          });
        }
      }
    } catch (err) {
      console.error(err);
      if (isMountedRef.current) {
        setAlertaInfo({
          tipo: 'error',
          mensagem: `Tivemos um problema ao identificar o áudio, tente novamente (${tentativaAtualNumero}° Tentativa)`,
          titulo: 'Falhou',
        });
      }
    } finally {
      if (isMountedRef.current) {
        setReconhecimentoAssinaturaLoading(false);
      }
    }
    if (isMountedRef.current) {
      setNegociacao(negociacaoNovoEstado);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;

    firebase
      .analytics()
      .logEvent(`acessou_assinatura_audio${analyticsEventoSufixo}`);

    carregarTextoDeVerificacao();

    return () => {
      isMountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUsuarioAutenticado(user);
  }, [user]);

  useEffect(() => {
    getAudioPermission();
  }, [_countOpenGravarAudio]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (audioBlobUri && audioStorageUrl) {
      confirmaAssinaturaValida();
    }
  }, [audioStorageUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const salvarAudio = async () => {
      const base64Audio = await blobToBase64(audioBlobUri);
      const iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
      const data = {
        fileBase64: base64Audio?.split(',')[1],
        extensao: iOS ? 'mp4' : 'mp3',
      };

      saveAudio(idNegociacao, data, history.push).then(async () => {
        if (isMountedRef.current) {
          const firebaseAudioPath = `/pessoa/${pessoa.id}/${idNegociacao}/assinatura-audio.mp3`;
          const url = await getFileUrl(firebaseAudioPath);
          setAudioStorageUrl(url);
          const { qtdTentativas = 0 } = negociacao;
          const tentativaAtualNumero = qtdTentativas + 1;
          await confirmaAssinaturaValida(tentativaAtualNumero);
        }
      });
    };
    if (isMountedRef.current) {
      if (audioBlobUri) {
        salvarAudio();
        if (negociacao.analiseDocumento?.infosExtra?.audioAtual?.validado) {
          negociacao.analiseDocumento.infosExtra.audioAtual.validado = true;
        }
      }
    }
  }, [setValido, usuarioAutenticado, audioBlobUri]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const carregaAudioGravado = async () => {
      const firebaseAudioPath = `/pessoa/${pessoa.id}/${negociacao.id}/assinatura-audio.mp3`;
      const audioUrl = await getAudio(firebaseAudioPath);
      if (isMountedRef.current) {
        if (audioUrl) {
          setAudioStorageUrl(audioUrl);
        }
      }
    };

    if (negociacao) {
      const { qtdTentativas } = negociacao;
      if (podeRecuperarArquivos(statusNegociacao)) {
        if (isMountedRef.current) {
          carregaAudioGravado();
        }
      }
      if (isMountedRef.current) {
        if (audioVerificadoLocal || audioVerificadoPreviamente) {
          setValido(true);
        } else if (qtdTentativas >= 10) {
          setValido(true);
          handleNextStep();
        }
      }
    }
  }, [negociacao]); // eslint-disable-line react-hooks/exhaustive-deps

  const matchesSmBreakpoint = useMediaQuery(theme =>
    theme.breakpoints.up('sm'),
  );

  const incrementarCounterOpenGravar = () => {
    const newCounter = _countOpenGravarAudio + 1;
    _setCountOpenGravarAudio(newCounter);
  };

  return (
    <Grid container>
      {alertaInfo && alertaInfo.mensagem && (
        <AlertaComDescricao
          mensagem={alertaInfo.mensagem}
          titulo={alertaInfo.titulo}
          tipo={alertaInfo.tipo}
        />
      )}
      <GridInnerHeaderStyled item xs={12}>
        <TypographyInnerHeaderStyled variant="h6">
          Assine por áudio
        </TypographyInnerHeaderStyled>
        <TypographyInnerSubHeaderStyled variant="subtitle1">
          Grave a leitura do texto em voz alta para assinar por áudio
        </TypographyInnerSubHeaderStyled>
      </GridInnerHeaderStyled>
      <Grid item xs={12}>
        <GridInnerBodyStyled container>
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            <ImgAsync
              src={getIcone('img-gravacao')}
              alt="imagem pessoa falando"
              render={ImgPessoaFalandoStyled}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            {reconhecimentoAssinaturaLoading || !textoDeVerificacao ? (
              <GridGravadorLoadingStyled
                container
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <LoaderCircular />
                </Grid>
              </GridGravadorLoadingStyled>
            ) : (
              <GravacaoReproducaoAudio
                botaoGravarDisabled={
                  audioVerificadoLocal || audioVerificadoPreviamente
                }
                audioBlobUri={audioBlobUri || audioStorageUrl}
                setAudioBlobUri={setAudioBlobUri}
                openGravarAudioDialog={() => {
                  _setOpenGravarAudioDialog(true);
                  incrementarCounterOpenGravar();
                }}
                // botaoGravarDisabled={
                //   audioVerificadoPreviamente || audioVerificadoLocal
                // }
              />
            )}
          </Grid>
        </GridInnerBodyStyled>
      </Grid>
      {_openGravarAudioDialog && !_openPermissaoAudioDialog ? (
        <DialogGravacaoAudio
          fullScreen={!matchesSmBreakpoint}
          open={_openGravarAudioDialog}
          handleClose={() => _setOpenGravarAudioDialog(false)}
          negociacao={negociacao}
          pessoa={pessoa}
          setAudioBlobUri={setAudioBlobUri}
          textoDeVerificacao={textoDeVerificacao}
        />
      ) : null}
      {_openPermissaoAudioDialog && _openGravarAudioDialog ? (
        <DialogInstrucoesPermissaoAudio
          fullScreen={!matchesSmBreakpoint}
          open={_openPermissaoAudioDialog}
          handleClose={() => _setOpenPermissaoAudioDialog(false)}
        />
      ) : null}
    </Grid>
  );
};

AssinaturaAudio.label = 'Assine por áudio';
AssinaturaAudio.title = 'Assinatura por áudio';
AssinaturaAudio.propTypes = {
  negociacao: PropTypes.shape({
    id: PropTypes.string,
    audioEstaVerificado: PropTypes.bool,
    status: PropTypes.string,
    analiseDocumento: PropTypes.shape({
      statusAnalise: PropTypes.shape({
        audio: PropTypes.bool,
      }),
    }),
  }).isRequired,
  pessoa: PropTypes.shape({ id: PropTypes.string }).isRequired,
};

export default AssinaturaAudio;
