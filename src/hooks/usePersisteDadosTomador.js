import { useEffect, useReducer } from 'react';

import moment from 'moment';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';

export default function usePersisteHistoricoSimulacao(
  fluxo,
  salvarEmTempoReal,
) {
  const firebase = useFirebase();
  const ignore = process.env.REACT_APP_ENV === 'e2e';
  const {
    state: {
      pessoa: { id: idPessoa },
    },
  } = useCreditoExpress();

  if (!fluxo) {
    throw Error('Nome do Fluxo deve ser informado!');
  }

  const actions = {
    ATUALIZAR_DADOS_LOCAL: 'ATUALIZAR_DADOS_LOCAL',
    SALVAR_DB_REF: 'SALVAR_DB_REF',
  };

  const initialState = {
    pessoa: {},
    contaBancaria: {},
    dadosDocumentos: {},
    realtimeDbRef: null,
    inicializado: false,
  };

  const reducer = (state, action) => {
    const { type, payload } = action;
    const { pessoa, realtimeDbRef, contaBancaria, dadosDocumentos } = payload;

    if (type === actions.ATUALIZAR_DADOS_LOCAL) {
      let contaBancariaDados;
      if (contaBancaria && Object.keys(contaBancaria).length > 0) {
        contaBancariaDados = {
          banco: {
            id: contaBancaria.banco?.data?.id || null,
            nome: contaBancaria.banco?.data?.nome || null,
            data: {
              id: contaBancaria.banco?.data?.id || null,
              nome: contaBancaria.banco?.data?.nome || null,
              codigo: contaBancaria.banco?.data?.codigo || null,
              value: contaBancaria.banco?.value || null,
              label: contaBancaria.banco?.data?.nome || null,
            },
            value: contaBancaria.banco?.value || null,
            label: contaBancaria.banco?.data?.nome || null,
          },
          agencia: contaBancaria.agencia || null,
          conta: contaBancaria?.conta || null,
          tipoConta: contaBancaria?.tipoConta || null,
          tipoOperacao: contaBancaria?.tipoOperacao || null,
        };
        contaBancaria.banco = contaBancariaDados.banco;
      }

      return {
        ...state,
        pessoa: { ...state.pessoa, ...pessoa },
        contaBancaria: {
          ...state.contaBancaria,
          ...contaBancaria,
          ...contaBancariaDados,
        },
        dadosDocumentos: { ...state.dadosDocumentos, ...dadosDocumentos },
        inicializado: true,
      };
    }

    if (type === actions.SALVAR_DB_REF) {
      return {
        ...state,
        pessoa: { ...state.pessoa, ...pessoa } || {},
        realtimeDbRef,
      };
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { pessoa, contaBancaria, dadosDocumentos, realtimeDbRef } = state;

  const getDbRef = (paramUserId, paramFluxo) => {
    const ref = firebase
      .database()
      .ref(`users/${paramUserId}/historico/${paramFluxo}`);
    dispatch({
      type: actions.SALVAR_DB_REF,
      payload: { realtimeDbRef: ref },
    });
    return ref;
  };

  useEffect(() => {
    if (idPessoa) {
      getDbRef(idPessoa, fluxo);
    }
  }, [idPessoa, fluxo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      !ignore &&
      (pessoa || contaBancaria || dadosDocumentos) &&
      realtimeDbRef &&
      salvarEmTempoReal
    ) {
      registrarDados({ pessoa, contaBancaria, dadosDocumentos });
    }
  }, [pessoa, contaBancaria, dadosDocumentos, realtimeDbRef]); // eslint-disable-line react-hooks/exhaustive-deps

  const registrarDados = async ({
    pessoa: pessoaParam,
    contaBancaria: contaBancariaParam,
    dadosDocumentos: documentosParam,
  }) => {
    let data = {};
    let pessoaSalvar = {};
    let contaBancariaSalvar = {};
    let dadosDocumentosSalvar = {};

    await realtimeDbRef.on('value', snapshot => {
      data = snapshot.val();
    });

    if (data) {
      pessoaSalvar = Object.fromEntries(
        Object.entries({ ...data.pessoa, ...pessoaParam }).filter(
          ([_, v]) => v, // eslint-disable-line no-unused-vars
        ),
      );
      contaBancariaSalvar = Object.fromEntries(
        Object.entries({ ...data.contaBancaria, ...contaBancariaParam }).filter(
          ([_, v]) => v, // eslint-disable-line no-unused-vars
        ),
      );
      dadosDocumentosSalvar = Object.fromEntries(
        Object.entries({ ...data.dadosDocumentos, ...documentosParam }).filter(
          ([_, v]) => v, // eslint-disable-line no-unused-vars
        ),
      );
    }

    const pessoaObj = {
      idPessoa,
      emAlteracao: true,
      dataCriacao: moment().format('YYYY-MM-DD HH:mm:ss'),
      pessoa: pessoaSalvar,
      contaBancaria: contaBancariaSalvar,
      dadosDocumentos: dadosDocumentosSalvar,
    };

    await realtimeDbRef.set(pessoaObj);
  };

  const atualizarDadosLocal = ({
    pessoa: paramPessoa,
    contaBancaria: paramContaBancaria,
    dadosDocumentos: paramDocumentos,
  }) => {
    let pessoaParam;
    if (paramPessoa) {
      pessoaParam = { ...paramPessoa };
      // TRATATIVA PARA O TIPO DATA
      Object.keys(pessoaParam).map(nome => {
        if (pessoaParam[nome] && nome.includes('data', 0)) {
          pessoaParam[nome] = transformarDataApiParaDataLocal(
            pessoaParam[nome],
          ).format('YYYY-MM-DD');
        }
        return null;
      });
    }

    let contaBancariaParam;
    if (paramContaBancaria) {
      contaBancariaParam = { ...paramContaBancaria };
      // TRATATIVA PARA O TIPO DATA
      Object.keys(contaBancariaParam).map(nome => {
        if (contaBancariaParam[nome] && nome.includes('data', 0)) {
          contaBancariaParam[nome] = transformarDataApiParaDataLocal(
            contaBancariaParam[nome],
          ).format('YYYY-MM-DD');
        }
        return null;
      });
    }

    dispatch({
      type: actions.ATUALIZAR_DADOS_LOCAL,
      payload: {
        pessoa: pessoaParam,
        contaBancaria: contaBancariaParam,
        dadosDocumentos: paramDocumentos,
      },
    });
  };

  return {
    atualizarDadosLocal,
  };
}
