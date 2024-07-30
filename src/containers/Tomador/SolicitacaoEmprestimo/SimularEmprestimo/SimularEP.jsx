import React, { useEffect, useState, useRef } from 'react';

import { useFormik } from 'formik';
import { useAppGlobal } from 'providers/AppGlobal';

import { useFirebase } from '@credito-express/ce-components';

import EmprestimoApi from '~/commons/resources/emprestimo';
import Organizacao from '~/commons/resources/organizacao';
import SolicitacaoEmprestimoApi from '~/commons/resources/solicitacao-emprestimo';
import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';
import { stringToNumber } from '~/commons/utils/ManipulacaoUtils';
import { moneyMask } from '~/commons/utils/MaskHandle';

import SimulacaoEP from '~/components/SolicitacaoEmprestimo/SimulacaoEmprestimo/SimulacaoEP';

import { useSimulacaoState } from '../../../../pages/Tomador/SolicitacaoEmprestimo/state';
import buildSchema from './schemaEP';
import ModalSeguro from './ModalSeguro';

export default function SimularEmprestimoContainer({
  atualizarSimulacaoLocal,
  salvarHistoricoSimulacao,
  atualizarDadosLocal,
}) {
  const firebase = useFirebase();
  const isMountedRef = useRef(null);
  const [historicoSimulacaoLoading, setHistoricoSimulacaoLoading] = useState(
    false,
  );
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  const [
    state,
    {
      etapaValores,
      calcularEmprestimoEP,
      atualizarResumeStatus,
      atualizarValoresFormSimulacao,
      calcularEmprestimoEPParcelamento,
      setOrganizacaoCamposPersonalizados,
    },
  ] = useSimulacaoState();

  const {
    parametrizacao = {},
    parametrosSistema: { taxaChequeEspecial = 0, taxaCartaoCredito = 0 } = {},
    simulacaoValues = {
      objetivo: '',
      valor: 0,
      dataPrimeiraParcela: 0,
      parcelamento: undefined,
    },
    calculoEmprestimo = {
      parcelamento: [],
      qtdParcelas: 0,
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
      valorContrato: 0,
    },
    resumeStatus = {},
    tokenData: { token: tokenUrl } = {},
    origem,
    camposAdicionais,
    pessoa,
  } = state;

  const [motivos, setMotivos] = useState([]);
  const [oldValor, setOldValor] = useState(simulacaoValues.valor);
  const [oldDataPrimeiraParcela, setOldDataPrimeiraParcela] = useState(
    simulacaoValues.dataPrimeiraParcela,
  );
  const [oldComSeguro, setOldComSeguro] = useState(simulacaoValues.comSeguro);

  const [dataVencimento, setDataVencimento] = useState([]);
  const [modalSeguroVisivel, setModalSeguroVisivel] = useState(false);
  const [countModalSeguroVisivel, setCountModalSeguroVisivel] = useState(0);

  const SimulacaoSchema = buildSchema({
    valorMinimo: parametrizacao.valorMinimo || 0,
    valorMaximo: parametrizacao.valorMaximo || 999999,
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
    const usuarioVisualizouModalSeguro = countModalSeguroVisivel > 0;
    if (comSeguro || usuarioVisualizouModalSeguro) {
      etapaValores();
    } else {
      setModalSeguroVisivel(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      objetivo: simulacaoValues.objetivo,
      parcelamento: simulacaoValues.parcelamento,
      valor: simulacaoValues.valor
        ? moneyMask(simulacaoValues.valor)
        : moneyMask(parametrizacao.valorMaximo),
      dataPrimeiraParcela: simulacaoValues.dataPrimeiraParcela || null,
      comSeguro:
        simulacaoValues.comSeguro !== undefined
          ? simulacaoValues.comSeguro
          : true,
      ocupacaoProfissional:
        pessoa?.ocupacaoProfissional ||
        camposAdicionais?.ocupacaoProfissional ||
        '',
    },
    validate: () => {},
    validationSchema: SimulacaoSchema,
    onSubmit: formikSubmitHandler,
  });

  const {
    values: {
      valor,
      dataPrimeiraParcela,
      objetivo,
      parcelamento,
      ocupacaoProfissional,
      comSeguro,
    },
    isValid,
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

  const calcularParcela = async () => {
    calcularEmprestimoEP(valor, dataPrimeiraParcela, objetivo, comSeguro);
  };

  const calcularParcelaParcelamento = async parcelamentoParam => {
    calcularEmprestimoEPParcelamento(parcelamentoParam);
  };

  const btnVerCondicoesClickHandler = () => {
    setModalSeguroVisivel(true);
  };

  const modalContinuarHandler = async continuarComSeguroSwitchVal => {
    setFieldValue('comSeguro', !!continuarComSeguroSwitchVal);
    let callback = etapaValores;
    if (!!continuarComSeguroSwitchVal !== comSeguro) {
      callback = () => setModalSeguroVisivel(false);
    }

    calcularEmprestimoEP(
      valor,
      dataPrimeiraParcela,
      objetivo,
      continuarComSeguroSwitchVal,
      callback,
    );

    setModalSeguroVisivel(false);
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

  async function buscarDataVencimento() {
    try {
      const {
        parametrizacao: { datasVencimento },
      } = await SolicitacaoEmprestimoApi.parametrosTomadorEP();
      if (isMountedRef.current) {
        const dataVenc = datasVencimento.map(d => {
          return {
            label: transformarDataApiParaDataLocal(d).format('DD/MM/YYYY'),
            value: d,
          };
        });
        setDataVencimento(dataVenc);
      }
    } catch (err) {
      if (err.erro) {
        exibirAlerta(err.erro);
      }
      console.error(err);
    }
  }

  // Buscar motivos utilizados no combo
  useEffect(() => {
    isMountedRef.current = true;
    buscarMotivos();
    buscarDataVencimento();
    firebase.analytics().logEvent('iniciou_simulacao');

    return () => {
      isMountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fazer e validar o calculo de acordo com as entradas
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (
      valor &&
      dataPrimeiraParcela &&
      (toValorNumerico(valor) !== toValorNumerico(oldValor) ||
        dataPrimeiraParcela !== oldDataPrimeiraParcela ||
        comSeguro !== oldComSeguro)
    ) {
      const valorNumerico = toValorNumerico(valor);
      atualizarValoresFormSimulacao({
        valor: valorNumerico,
        dataPrimeiraParcela,
        objetivo,
        comSeguro,
        isValid,
      });

      atualizarResumeStatus(false, false);
      setOldDataPrimeiraParcela(dataPrimeiraParcela);
      setOldValor(valor);
      setOldComSeguro(comSeguro);
      calculoEmprestimo.parcelamento = [];
      formik.values.parcelamento = null;
    }
  }, [valor, dataPrimeiraParcela, comSeguro, objetivo]);

  useEffect(() => {
    if (parcelamento) {
      atualizarResumeStatus(true, false);
    }
  }, [parcelamento]);

  useEffect(() => {
    if (calculoEmprestimo && calculoEmprestimo.valorParcela) {
      atualizarSimulacaoLocal(objetivo, tokenUrl, origem);
    }
  }, [calculoEmprestimo, calculoEmprestimo.valorParcela]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (modalSeguroVisivel) {
      setCountModalSeguroVisivel(countModalSeguroVisivel + 1);
    }
  }, [modalSeguroVisivel]); // eslint-disable-line react-hooks/exhaustive-deps

  const primeiroRender = useRef(true);
  useEffect(() => {
    if (primeiroRender.current) {
      primeiroRender.current = false;
      return;
    }
    pessoa.ocupacaoProfissional = ocupacaoProfissional;
    atualizarDadosLocal({ pessoa });

    const updateCamposPersonalizados = async ocupacaoProfissionalParam => {
      const response = await Organizacao.getCamposPersonalizadosPorOcupacao(
        ocupacaoProfissionalParam,
      );
      setOrganizacaoCamposPersonalizados(response);
    };

    updateCamposPersonalizados(ocupacaoProfissional);
  }, [ocupacaoProfissional]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ModalSeguro
        open={modalSeguroVisivel}
        dismissHandler={() => setModalSeguroVisivel(false)}
        continuarComSeguro={modalContinuarHandler}
        exibirBotoes={!!isValid && !!objetivo}
        ocupacaoProfissional={ocupacaoProfissional}
      />

      <SimulacaoEP
        motivos={motivos}
        dataVencimento={dataVencimento}
        parcelamentos={calculoEmprestimo.parcelamento}
        valoresCalculados={calculoEmprestimo}
        taxaChequeEspecial={taxaChequeEspecial}
        taxaCartaoCredito={taxaCartaoCredito}
        formik={formik}
        resumeStatus={resumeStatus}
        calcularParcelaPorOrganizacao={calcularParcela}
        calcularParcelaParcelamento={calcularParcelaParcelamento}
        simulacaoValues={simulacaoValues}
        historicoSimulacaoLoading={historicoSimulacaoLoading}
        btnVerCondicoesClickHandler={btnVerCondicoesClickHandler}
      />
    </>
  );
}
