import React, { useCallback, useEffect, useState } from 'react';
import {
  mobileModel,
  browserName,
  osName,
  osVersion,
  fullBrowserVersion,
} from 'react-device-detect';
import { useLocation } from 'react-router';

import { useFirebase, useCreditoExpress } from '@credito-express/ce-components';

import pushRota from '~/routes/push';

import Negociacao from '~/commons/resources/negociacao';
import ReconhecimentoAssinatura from '~/commons/resources/reconhecimento-assinatura';

import { useAppGlobal } from '~/providers/AppGlobal';

import AssinaturaAudio from './AssinaturaAudio';
import Confirmacao from './Confirmacao';
import FotosDocumentosFrente from './FotosDocumentos/DocumentoFrente';
import FotosDocumentosVerso from './FotosDocumentos/DocumentoVerso';
import ProofOfLife from './ProofOfLife';
import ConfirmacaoEmprestimoRender from './render';
import ResumoValores from './ResumoValores';
import TermoEmprestimo from './TermoEmprestimo';
import { verificacaoNegociacaoFinalizadaTempoReal } from './verificacaoEmTempoReal';

export default function ConfirmacaoEmprestimo() {
  const firebase = useFirebase();
  const {
    state: { idNegociacao, analyticsEventoSufixo = '' } = {},
  } = useLocation();
  const {
    state: {
      organizacao: { tipoFluxoEp = '' },
      usuarioFirebase: user,
      pessoa,
    },
  } = useCreditoExpress();
  const ehFluxoEp = tipoFluxoEp === 'BANCO_SEMEAR';
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const [negociacao, setNegociacao] = useState();
  const [negociacaoObj, setNegociacaoObj] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [valido, setValido] = useState(false);
  const [exibirCheckBoxTermo, setExibirCheckBoxTermo] = useState(false);
  const [aceiteTermo, setAceiteTermo] = useState(false);
  const [calculo, setCaculo] = useState({});
  const [steps, setSteps] = useState([]);
  const [faceApi, setFaceApi] = useState();
  const [docNaoReconhecido, setDocNaoReconhecido] = useState(false);
  const [stepDocVersoReconhecido, setStepDocVersoReconhecido] = useState(false);
  const [usouACamera, setUsouACamera] = useState(false);
  const [realizouProvaVida, setRealizouProvaVida] = useState(false);
  const [coordenadasGps, setCoordenadasGps] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  const StepEmExibicao = steps[activeStep];
  const processarFluxoConfirmacaoEmprestimo = useCallback(() => {
    const stepsDoFluxo = [
      FotosDocumentosFrente,
      FotosDocumentosVerso,
      ProofOfLife,
      AssinaturaAudio,
      TermoEmprestimo,
      Confirmacao,
    ];
    setSteps(stepsDoFluxo);
    setNegociacaoObj(negociacao);
    const {
      analiseDocumento: { infosExtra: { etapaAtual = 0 } = {} } = {},
    } = negociacao;
    setActiveStep(etapaAtual);

    return true;
  }, [negociacao]); // eslint-disable-line react-hooks/exhaustive-deps

  const processarFluxoPendenciaConfirmacao = useCallback(() => {
    const stepsDoFluxo = [];
    setSteps(stepsDoFluxo);
    setNegociacaoObj(negociacao);
    const {
      analiseDocumento: { infosExtra: { solicitacaoReenvio = [] } = {} } = {},
    } = negociacao;
    if (solicitacaoReenvio.includes('DOCUMENTO')) {
      stepsDoFluxo.push(FotosDocumentosFrente);
      stepsDoFluxo.push(FotosDocumentosVerso);
      stepsDoFluxo.push(ProofOfLife);
    }
    if (solicitacaoReenvio.includes('AUDIO')) {
      stepsDoFluxo.push(AssinaturaAudio);
    }

    stepsDoFluxo.push(Confirmacao);

    setActiveStep(0);
    return true;
  }, [negociacao]);

  const processarFluxoConfirmacaoValores = useCallback(() => {
    const stepsDoFluxo = [
      ResumoValores,
      AssinaturaAudio,
      TermoEmprestimo,
      Confirmacao,
    ];
    setSteps(stepsDoFluxo);
    setNegociacaoObj(negociacao);
    setActiveStep(0);
    return true;
  }, [negociacao]);

  const fluxosConfig = {
    AGUARDANDO_TOMADOR: {
      processaFluxoFn: processarFluxoConfirmacaoEmprestimo,
    },
    PENDENCIA_CONFIRMACAO_EMPRESTIMO: {
      processaFluxoFn: processarFluxoPendenciaConfirmacao,
    },
    AGUARDANDO_TOMADOR_CONFIRMAR_VALORES: {
      processaFluxoFn: processarFluxoConfirmacaoValores,
    },
  };

  useEffect(() => {
    if (idNegociacao) {
      buscarNegociacao(idNegociacao);
    } else {
      pushRota('/meus-emprestimos');
    }
  }, [idNegociacao]);

  useEffect(() => {
    if (negociacao) {
      const { status } = negociacao;
      const fluxoConfig = fluxosConfig[status];
      if (!fluxoConfig) {
        console.warn(
          `Fluxo de confirmação inexistente para o status ${status}`,
        );
        return;
      }
      const { processaFluxoFn } = fluxoConfig;
      if (!processaFluxoFn()) {
        console.warn(
          `Função processa fluxo de confirmação inexistente para o status ${status}`,
        );
      }
    }
  }, [negociacao]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const etapasCarregadas = steps.length > 0;
    if (etapasCarregadas && negociacao) {
      const { id: idNegociacaoAtual } = negociacao;
      const unsubscribeFn = verificacaoNegociacaoFinalizadaTempoReal(
        idNegociacaoAtual,
        steps,
        setActiveStep,
      );
      return unsubscribeFn;
    }
  }, [steps, negociacao]);

  useEffect(() => {
    if (StepEmExibicao) {
      const { precisaAceitarTermo } = StepEmExibicao;
      if (aceiteTermo) {
        setValido(true);
      } else if (precisaAceitarTermo === true && !aceiteTermo) {
        setValido(false);
      }
    }
  }, [aceiteTermo, StepEmExibicao]);

  useEffect(() => {
    const calcularParcelas = async () => {
      const { id } = negociacaoObj;
      if (id) {
        const calculoNegocicao = await Negociacao.calcularParcelas(id);
        setCaculo(calculoNegocicao);
      }
    };
    calcularParcelas();
  }, [negociacaoObj]);

  useEffect(() => {
    if (StepEmExibicao === ResumoValores) {
      setValido(true);
    }
  }, [StepEmExibicao]);

  const buscarNegociacao = async id => {
    const negociacaoApi = await Negociacao.buscarPorId(id);
    setNegociacao(negociacaoApi);
  };

  const handleBackStep = () => {
    if (activeStep === 0) {
      pushRota('/meus-emprestimos');
      return;
    }
    setValido(false);
    setActiveStep(activeStep - 1);
  };

  const efetivar = () => {
    const { id, status } = negociacao;
    if (status === 'AGUARDANDO_TOMADOR_CONFIRMAR_VALORES') {
      return efetivarEmprestimoValorAlterado(id);
    }
    return efetivarEmprestimo(id);
  };

  const handleNextStep = async () => {
    if (activeStep === steps.length - 2) {
      const novaNegociacao = await efetivar(negociacao.faceApi);
      if (novaNegociacao) {
        setNegociacaoObj(novaNegociacao);
      } else {
        return;
      }
    }

    if (usouACamera) {
      if (stepDocVersoReconhecido) {
        const docInfo = negociacaoObj.analiseDocumento.infosExtra;
        if (
          !docInfo.docFrenteCapturaAutomatica ||
          !docInfo.docVersoCapturaAutomatica
        ) {
          setDocNaoReconhecido(true);
        }
        setStepDocVersoReconhecido(false);
        setUsouACamera(false);
      }
    }

    setValido(false);
    setActiveStep(activeStep + 1);
  };

  const efetivarEmprestimo = async idNegociacaoAtual => {
    try {
      const fluxo = ehFluxoEp ? '/ep' : '';
      const { latitude, longitude } = coordenadasGps;
      const identificouModelo = mobileModel !== 'none';
      const params = {
        ...(latitude && { latitude: latitude.toString() }),
        ...(longitude && { longitude: longitude.toString() }),
        navegador: `${browserName} ${fullBrowserVersion}`,
        sistemaOperacional: `${osName} ${osVersion}`,
        ...(identificouModelo && { modelo: mobileModel }),
        faceApi,
      };
      return await Negociacao.efetivarEmprestimo(
        idNegociacaoAtual,
        params,
        fluxo,
      );
    } catch (err) {
      const { erro } = err;
      exibirAlerta(erro, 'error');
      return null;
    }
  };

  const efetivarEmprestimoValorAlterado = async idNegociacaoAtual => {
    try {
      const { latitude, longitude } = coordenadasGps;
      const identificouModelo = mobileModel !== 'none';
      const params = {
        ...(latitude && { latitude: latitude.toString() }),
        ...(longitude && { longitude: longitude.toString() }),
        navegador: `${browserName} ${fullBrowserVersion}`,
        sistemaOperacional: `${osName} ${osVersion}`,
        ...(identificouModelo && { modelo: mobileModel }),
      };
      const res = await Negociacao.efetivarEmprestimoValorAlterado(
        idNegociacaoAtual,
        params,
      );
      firebase.analytics().logEvent('finalizou_nova_formalizacao');
      return res;
    } catch (err) {
      const { erro } = err;
      exibirAlerta(erro, 'error');
      return null;
    }
  };

  const processaAudioAssinatura = idNegociacaoAtual =>
    ReconhecimentoAssinatura.processarAssinatura(idNegociacaoAtual);

  return (
    <ConfirmacaoEmprestimoRender
      {...{
        activeStep,
        steps,
        handleBackStep,
        negociacaoObj,
        calculo,
        StepEmExibicao,
        user,
        setNegociacaoObj,
        setValido,
        pessoa,
        exibirCheckBox: exibirCheckBoxTermo,
        aceiteTermo,
        setAceiteTermo,
        valido,
        handleNextStep,
        processaAudioAssinatura,
        setCoordenadasGps,
        setExibirCheckBoxTermo,
        analyticsEventoSufixo,
        docNaoReconhecido,
        setDocNaoReconhecido,
        setStepDocVersoReconhecido,
        setUsouACamera,
        ehFluxoEp,
        setFaceApi,
        realizouProvaVida,
        setRealizouProvaVida,
      }}
    />
  );
}
