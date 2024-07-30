import { useEffect, useReducer } from 'react';

import moment from 'moment';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

import EmprestimoApi from '../commons/resources/emprestimo';
import { transformarDataApiParaDataLocal } from '../commons/tratativasParaDatasApi';
import { useSimulacaoState } from '../pages/Tomador/SolicitacaoEmprestimo/state';

export default function usePersisteHistoricoSimulacao(
  fluxo,
  salvarEmTempoReal,
) {
  const firebase = useFirebase();
  const [simulacaoState] = useSimulacaoState();
  const ignore = process.env.REACT_APP_ENV === 'e2e';

  const { calculoEmprestimo = {} } = simulacaoState;

  const {
    state: { pessoa, organizacao },
  } = useCreditoExpress();
  const { id: idPessoa } = pessoa;
  const { id: idOrganizacao } = organizacao;

  if (!fluxo) {
    throw Error('Nome do Fluxo deve ser informado!');
  }

  const actions = {
    ATUALIZAR_SIMULACAO_LOCAL: 'ATUALIZAR_SIMULACAO_LOCAL',
    SALVAR_DB_REF: 'SALVAR_DB_REF',
  };

  const initialState = {
    objetivo: '',
    tokenUrl: '',
    origem: '',
    realtimeDbRef: null,
    sessaoCancelada: false,
    inicializado: false,
  };

  const reducer = (state, action) => {
    const { type, payload } = action;
    const { objetivo, tokenUrl, origem } = payload;

    if (type === actions.ATUALIZAR_SIMULACAO_LOCAL) {
      return {
        ...state,
        objetivo,
        tokenUrl,
        origem: origem || 'SITE',
        inicializado: true,
      };
    }

    if (type === actions.SALVAR_DB_REF) {
      return {
        ...state,
        objetivo: objetivo || '',
        origem: origem || 'SITE',
        realtimeDbRef: payload.realtimeDbRef,
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { objetivo, tokenUrl, origem = 'SITE', realtimeDbRef } = state;

  const getDbRef = (paramUserId, paramFluxo) => {
    const ref = firebase
      .database()
      .ref(`users/${paramUserId}/historico/${paramFluxo}`);
    dispatch({ type: actions.SALVAR_DB_REF, payload: { realtimeDbRef: ref } });

    return ref;
  };

  useEffect(() => {
    if (idPessoa) {
      getDbRef(idPessoa, fluxo);
    }
  }, [idPessoa]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const calcValido = calculoEhValido(calculoEmprestimo);
    if (!ignore && salvarEmTempoReal && calcValido && realtimeDbRef) {
      registrarHistorico(calculoEmprestimo);

      return cleanUp;
    }
  }, [calculoEmprestimo, objetivo, realtimeDbRef]); // eslint-disable-line react-hooks/exhaustive-deps

  const calculoEhValido = calc =>
    calc && calc.valorParcela > 0 && calc.quantidadeParcelas > 0;

  const cleanUp = async () => {
    if (realtimeDbRef) {
      const onDisconnect = realtimeDbRef.onDisconnect();
      const promise = onDisconnect.cancel();

      return promise;
    }
    return null;
  };

  const registrarHistorico = async calc => {
    const { taxaVariavel, dataPrimeiraParcela } = calc;
    const histDataPrimeiraParcela = dataPrimeiraParcela
      ? transformarDataApiParaDataLocal(
          dataPrimeiraParcela,
          'DD/MM/YYYY',
        ).format('YYYY-MM-DD')
      : '';

    const calcObj = {
      ...parseNumerosCalculoEmprestimo(calc),
      idPessoa,
      idOrganizacao,
      origem,
      emAlteracao: true,
      dataCriacao: moment().format('YYYY-MM-DD HH:mm:ss'),
      objetivo: objetivo || '',
      taxaVariavel: !!taxaVariavel,
      dataPrimeiraParcela: histDataPrimeiraParcela,
      ...(tokenUrl && { token: tokenUrl }),
    };

    await realtimeDbRef.set(calcObj);
    const onDisconnectRef = realtimeDbRef.onDisconnect();
    await onDisconnectRef.cancel();
    await onDisconnectRef.remove();
    return onDisconnectRef;
  };

  const parseNumerosCalculoEmprestimo = calc => {
    const novoCalc = { ...calc };
    novoCalc.valorParcela = parseFloat(calc.valorParcela);
    novoCalc.juros = parseFloat(calc.juros);
    novoCalc.jurosAoMes = parseFloat(calc.jurosAoMes);
    novoCalc.taxaIof = parseFloat(calc.taxaIof);
    novoCalc.despesas = parseFloat(calc.despesas);
    novoCalc.valorEmprestimo = parseFloat(calc.valorEmprestimo);
    novoCalc.quantidadeParcelas = parseInt(calc.quantidadeParcelas, 10);
    novoCalc.valorSeguro = calc.valorSeguro ? parseFloat(calc.valorSeguro) : 0;
    if (calc.valorContrato) {
      novoCalc.valorContrato = calc.valorContrato
        ? parseFloat(calc.valorContrato)
        : 0;
    }
    novoCalc.taxaAdm = calc.taxaAdm ? parseFloat(calc.taxaAdm) : 0;
    novoCalc.percSeguroConsignado = calc.percSeguroConsignado
      ? parseFloat(calc.percSeguroConsignado)
      : 0;
    return novoCalc;
  };

  const getDadosParaPersistirHistoricoSimulacao = () => {
    const { id, nome } = pessoa;
    const {
      jurosAoMes,
      taxaAdm,
      valorParcela,
      valorIof,
      juros,
      taxaIof,
      despesas,
      descricaoDespesas,
      totalApagar,
      dataPrimeiraParcela,
      comSeguro,
      percSeguroConsignado,
      valorSeguro,
      valorEmprestimo,
      quantidadeParcelas,
      cetMensal,
      cetAnual,
      dataUltimaParcela,
      valorContrato,
    } = calculoEmprestimo;

    const histPercSeguro = parseFloat(percSeguroConsignado) || 0;
    const histTaxaIof = Number(taxaIof);
    const histValor = valorEmprestimo;
    const histValorSeguro = valorSeguro;
    const histDataPrimeiraParcela = transformarDataApiParaDataLocal(
      dataPrimeiraParcela,
      'DD/MM/YYYY',
    ).format('YYYY-MM-DD');

    return {
      parametrizacao: { taxaJuros: jurosAoMes, taxaAdm },
      dadosEmprestimo: {
        valor: histValor,
        parcelas: quantidadeParcelas,
        objetivo,
      },
      dadosPessoa: { id, nome },
      calculo: {
        valorParcela,
        valorIof,
        juros,
        taxaIof: histTaxaIof,
        despesas,
        descricaoDespesas,
        totalApagar,
        dataPrimeiraParcela: histDataPrimeiraParcela,
        contratouSeguro: !!comSeguro,
        percSeguroConsignado: histPercSeguro,
        valorSeguro: histValorSeguro,
        cetMensal,
        cetAnual,
        dataUltimaParcela,
        valorContrato,
      },
      ...(tokenUrl && { token: tokenUrl }),
      origem,
    };
  };

  const salvarHistoricoSimulacaoApi = () => {
    const {
      parametrizacao: { taxaJuros, taxaAdm },
      dadosEmprestimo: { valor, parcelas, objetivo: empObjetivo },
      calculo: {
        valorParcela,
        valorIof,
        juros,
        taxaIof,
        despesas,
        descricaoDespesas,
        totalApagar,
        dataPrimeiraParcela,
        contratouSeguro,
        percSeguroConsignado,
        valorSeguro,
        cetMensal,
        cetAnual,
        dataUltimaParcela,
        valorContrato,
      },
      token,
      origem: empOrigem,
    } = getDadosParaPersistirHistoricoSimulacao();

    const params = {
      taxaJuros,
      taxaAdm,
      valor,
      qtdParcelas: parcelas,
      objetivo: empObjetivo,
      valorParcela,
      valorIof,
      valorJuros: juros,
      taxaIof,
      valorDespesas: despesas,
      descricaoDespesas,
      valorTotalApagar: totalApagar,
      dataPrimeiraParcela,
      contratouSeguro,
      ...(contratouSeguro && {
        percSeguroConsignado,
        valorSeguro,
      }),
      ...(cetMensal && { cetMensal }),
      ...(cetAnual && { cetAnual }),
      ...(dataUltimaParcela && { dataUltimaParcela }),
      ...(valorContrato && { valorContrato }),
      ...(token && { token }),
      origem: empOrigem,
    };

    return EmprestimoApi.salvarHistoricoSimulacao(params);
  };

  const atualizarSimulacaoLocal = (
    paramObjetivo,
    paramTokenUrl,
    paramOrigem,
  ) => {
    dispatch({
      type: actions.ATUALIZAR_SIMULACAO_LOCAL,
      payload: {
        objetivo: paramObjetivo,
        tokenUrl: paramTokenUrl,
        origem: paramOrigem,
      },
    });
  };

  return {
    atualizarSimulacaoLocal,
    salvarHistoricoSimulacao: salvarHistoricoSimulacaoApi,
    cleanUp,
  };
}
