import React, { useEffect, useState, useRef } from 'react';

import EmprestimoApi from 'commons/resources/emprestimo';
import {
  inputDinheiroComCentavosZeradoParaNumerico,
  stringToNumber,
} from 'commons/utils/ManipulacaoUtils';
import { useFormik } from 'formik';
import { useAppGlobal } from 'providers/AppGlobal';

import { useFirebase, useCreditoExpress } from '@credito-express/ce-components';

import { moneyMask } from '~/commons/utils/MaskHandle';

import ModalInstrucoesDePermissao from '~/components/ModalInstrucoesDePermissao';
import SimulacaoECP from '~/components/SolicitacaoEmprestimo/SimulacaoEmprestimo/SimulacaoECP';

import ModalSeguroInfo from '../../../../components/ModalSeguroInfo';
import { useSimulacaoState } from '../../../../pages/Tomador/SolicitacaoEmprestimo/state';
import buildSchema from './schemaECP';

export default function SimularECP({
  atualizarSimulacaoLocal,
  salvarHistoricoSimulacao,
}) {
  const firebase = useFirebase();
  const isMountedRef = useRef(null);
  const [historicoSimulacaoLoading, setHistoricoSimulacaoLoading] = useState(
    false,
  );
  const {
    actions: { exibirAlerta },
    organizacao: { tipoFluxoEcp },
  } = useAppGlobal();

  const [
    state,
    {
      etapaValores,
      calcularEmprestimo,
      atualizarResumeStatus,
      atualizarValoresFormSimulacao,
    },
  ] = useSimulacaoState();

  const {
    parametrizacao = {},
    parametrosSistema: { taxaChequeEspecial = 0, taxaCartaoCredito = 0 } = {},
    simulacaoValues = {
      objetivo: '',
      valor: 0,
      parcelas: 0,
    },
    calculoEmprestimo = {
      valorParcela: 0,
      juros: 0,
      jurosAoMes: 0,
      valorIof: 0,
      valorIofAoDia: 0,
      taxaIof: 0,
      despesas: 0,
      descricaoDespesas: '',
      totalApagar: 0,
      dataPrimeiraParcela: null,
      valorSeguro: 0,
      percSeguroConsignado: 0,
    },
    resumeStatus = {},
    tokenData: { token: tokenUrl } = {},
    origem,
  } = state;

  const {
    state: {
      pessoa: { parametrizacaoAtiva },
    },
  } = useCreditoExpress();

  const parametrizacaoCarregada = !!Object.keys(parametrizacao).length;

  const {
    seguroConsignado: seguroConsignadoDisponivel,
    intervaloEntreParcelas,
  } = parametrizacao;
  const [limites, setLimites] = useState({
    maxParcelas: 0,
    minParcelas: 0,
    parcelasPossiveis: [parametrizacao.maxParcelas || 0],
  });
  const [motivos, setMotivos] = useState([]);
  const [modalSeguroVisivel, setModalSeguroVisivel] = useState(false);
  const [countModalSeguroVisivel, setCountModalSeguroVisivel] = useState(0);
  const [modalAvisoParcelasVisivel, setModalAvisoParcelasVisivel] = useState(
    tipoFluxoEcp === 'PORTOCRED' && !parametrizacaoAtiva,
  );

  const SimulacaoSchema = buildSchema({
    valorMinimo: parametrizacao.valorMinimo,
    valorMaximo: parametrizacao.valorMaximo,
    getLimites,
  });

  const salvarHistoricoSimulacaoWrapper = async () => {
    try {
      setHistoricoSimulacaoLoading(true);
      await salvarHistoricoSimulacao();
      return true;
    } catch (err) {
      exibirAlerta(
        'Ocorreu um erro ao processar sua simulação, por favor entre em contato com o suporte técnico',
      );
      console.error('Ocorreu um erro salvar o histórico de simulação:', err);
      return false;
    } finally {
      setHistoricoSimulacaoLoading(false);
    }
  };

  const formikSubmitHandler = async () => {
    const simulacaoSalvaComSucesso = await salvarHistoricoSimulacaoWrapper();
    if (!simulacaoSalvaComSucesso) {
      return;
    }
    if (seguroConsignadoDisponivel && isMountedRef.current) {
      const usuarioVisualizouModalSeguro = countModalSeguroVisivel > 0;
      if (comSeguro || usuarioVisualizouModalSeguro) {
        etapaValores();
      } else {
        setModalSeguroVisivel(true);
      }
    } else {
      etapaValores();
    }
  };
  const { comSeguro: comSeguroReducerValue } = calculoEmprestimo;
  const formik = useFormik({
    initialValues: {
      objetivo: simulacaoValues.objetivo,
      valor: simulacaoValues.valor
        ? moneyMask(simulacaoValues.valor)
        : moneyMask(
            parametrizacao.valorMaximo / 3 > parametrizacao.valorMinimo
              ? parametrizacao.valorMaximo / 3
              : parametrizacao.valorMinimo,
          ),
      parcelas:
        simulacaoValues.parcelas ||
        (parametrizacao.limites.length > 0
          ? parametrizacao.limites[
              Math.round(parametrizacao.limites.length / 2) - 1
            ].parcelas
          : parametrizacao.minParcelas), // parametrizacao.maxParcelas,
      comSeguro:
        comSeguroReducerValue !== undefined
          ? comSeguroReducerValue
          : parametrizacao.seguroConsignado,
    },
    validate: () => {},
    validationSchema: SimulacaoSchema,
    onSubmit: formikSubmitHandler,
  });

  function getLimites(valor) {
    if (!parametrizacao || !parametrizacao.limites) {
      return {
        minParcelas: 0,
        maxParcelas: 0,
      };
    }
    const parcelasPossiveis = parametrizacao.limites
      .filter(
        ({ valorMaximo, valorMinimo }) =>
          valorMaximo >= valor && valorMinimo <= valor,
      )
      .map(({ parcelas }) => parcelas);
    const maxParcelas = parcelasPossiveis.reduce((a, b) => (a >= b ? a : b), 0);
    const minParcelas = parcelasPossiveis.reduce(
      (a, b) => (a <= b ? a : b),
      1000,
    );
    return {
      minParcelas,
      maxParcelas,
      parcelasPossiveis,
    };
  }

  const {
    values: { valor, parcelas, objetivo, comSeguro },
    isValid,
    isValidating,
    setFieldValue,
  } = formik;

  const toValorNumerico = numero => {
    let valorNumerico = 0;
    if (typeof numero === 'number') {
      valorNumerico = numero;
    } else if (typeof numero === 'string') {
      valorNumerico = stringToNumber(numero);
    }
    return valorNumerico;
  };

  const calcularParcelaPorOrganizacao = async () => {
    calcularEmprestimo(valor, parcelas, objetivo, comSeguro);
  };

  const calcularParcelaInicial = async () => {
    calcularEmprestimo(valor, parcelas, objetivo, comSeguro);
  };

  async function buscarMotivos() {
    try {
      const motivosResult = await EmprestimoApi.getMotivos();

      if (isMountedRef.current) {
        motivosResult.sort((a, b) => a.label.localeCompare(b.label));
        setMotivos(motivosResult);
      }
    } catch (err) {
      if (err.erro) {
        exibirAlerta(err.erro);
      }
      console.error(err);
    }
  }

  useEffect(() => {
    if (modalSeguroVisivel) {
      setCountModalSeguroVisivel(countModalSeguroVisivel + 1);
    }
  }, [modalSeguroVisivel]); // eslint-disable-line react-hooks/exhaustive-deps

  // Buscar motivos utilizados no combo
  useEffect(() => {
    isMountedRef.current = true;
    buscarMotivos();
    firebase.analytics().logEvent('iniciou_simulacao');

    return () => {
      isMountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (parametrizacaoCarregada) {
      calcularParcelaInicial();
    }
  }, [parametrizacaoCarregada]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fazer e validar o calculo de acordo com as entradas
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (valor && parcelas && parametrizacaoCarregada) {
      const valorNumerico = toValorNumerico(valor);
      atualizarValoresFormSimulacao({
        valor: valorNumerico,
        parcelas,
        objetivo,
        comSeguro,
        isValid,
      });
      atualizarResumeStatus(false, false);
    } else {
      atualizarResumeStatus(false, false);
    }
  }, [
    valor,
    parcelas,
    objetivo,
    isValid,
    isValidating,
    comSeguro,
    parametrizacaoCarregada,
    isValid,
  ]);

  useEffect(() => {
    if (calculoEmprestimo && calculoEmprestimo.valorParcela) {
      atualizarSimulacaoLocal(objetivo, tokenUrl, origem);
    }
  }, [calculoEmprestimo]); // eslint-disable-line react-hooks/exhaustive-deps

  // configurar o minimo e máximo de parcelas de acordo com o valor estipulado
  useEffect(() => {
    const valorNumerico = inputDinheiroComCentavosZeradoParaNumerico(valor);
    const { minParcelas, maxParcelas, parcelasPossiveis } = getLimites(
      valorNumerico,
    );

    setLimites({
      minParcelas,
      maxParcelas,
      valorMaximo: parametrizacao.valorMaximo,
      valorMinimo: parametrizacao.valorMinimo,
      parcelasPossiveis,
    });
  }, [parametrizacao, valor]); // eslint-disable-line react-hooks/exhaustive-deps

  const modalContinuarHandler = async continuarComSeguroSwitchVal => {
    const valorNumerico = inputDinheiroComCentavosZeradoParaNumerico(valor);
    setFieldValue('comSeguro', !!continuarComSeguroSwitchVal);
    let callback = etapaValores;
    if (!!continuarComSeguroSwitchVal !== comSeguro) {
      callback = () => setModalSeguroVisivel(false);
    }

    calcularEmprestimo(
      valorNumerico,
      parcelas,
      objetivo,
      continuarComSeguroSwitchVal,
      callback,
    );

    setModalSeguroVisivel(false);
  };

  const btnVerCondicoesClickHandler = () => {
    setModalSeguroVisivel(true);
  };

  return (
    <>
      <ModalSeguroInfo
        open={modalSeguroVisivel}
        dismissHandler={() => setModalSeguroVisivel(false)}
        continuarComSeguro={modalContinuarHandler}
        exibirBotoes={!!objetivo}
      />

      <ModalInstrucoesDePermissao
        open={modalAvisoParcelasVisivel}
        titulo="Oi, temos um recadinho pra você ;)"
        renderInfo={`Os valores finais da parcela serão disponibilizados após sua 
        solicitação de empréstimo, SEM COMPROMISSO! Finalize sua solicitação nas 
        próximas etapas, e dentro de alguns minutos, você receberá os valores finais. 
        Ah, fique tranquilo, o empréstimo será efetivado apenas após você 
        confirmar as condições e valores!`}
        erro={false}
        solicitaPermissao={() => setModalAvisoParcelasVisivel(false)}
      />

      <SimulacaoECP
        formik={formik}
        motivos={motivos}
        resumeStatus={resumeStatus}
        limites={limites}
        valoresCalculados={calculoEmprestimo}
        taxaChequeEspecial={taxaChequeEspecial}
        taxaCartaoCredito={taxaCartaoCredito}
        calcularParcelaPorOrganizacao={calcularParcelaPorOrganizacao}
        seguroConsignadoDisponivel={!!parametrizacao.seguroConsignado}
        intervaloEntreParcelas={intervaloEntreParcelas}
        btnVerCondicoesClickHandler={btnVerCondicoesClickHandler}
        simulacaoValues={simulacaoValues}
        historicoSimulacaoLoading={historicoSimulacaoLoading}
      />
    </>
  );
}
