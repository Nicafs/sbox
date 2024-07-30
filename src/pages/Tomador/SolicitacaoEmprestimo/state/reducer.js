import { transformarDataApiParaDataLocal } from 'commons/tratativasParaDatasApi';
import { stringToNumber } from 'commons/utils/ManipulacaoUtils';
import parseISO from 'date-fns/parseISO';

import { useFirebase } from '@credito-express/ce-components';

import Organizacao from '~/commons/resources/organizacao';
import { getOrganizacaoWhitelabel } from '~/commons/utils';

import PessoaAPI from '../../../../commons/resources/pessoa';
import calculaSimulacaoConsignado, {
  getMsgErro,
} from '../../../../commons/simulacao/CalculaSimulacaoConsignado';
import calculaSimulacaoEP from '../../../../commons/simulacao/CalculaSimulacaoEP';
import pushRota from '../../../../routes/push';
import {
  getEtapaPorId,
  getProximaEtapa,
  IDS_FLUXO_SIMULACAO_ENUM,
} from '../etapas';
import {
  enviarConfirmacaoContato,
  verificaContatoConfirmado,
} from './confirmacaoContato';
import ESTADO_INICIAL from './estadoInicial';
import etapaAutenticacao from './etapaAutenticacao';
import etapaAutenticacaoEP from './etapaAutenticacaoEP';
import { etapaCadastro } from './etapaCadastro';
import etapaContato from './etapaContato';
import etapaCriarSenha from './etapaCriarSenha';
import etapaInfosComplementares from './etapaInfosComplementares';
import etapaSimulacao from './etapaSimulacao';
import init from './init';
import initEP from './initEP';
import persistir from './persistir';
import { parseDadosRg } from './tomador';
import voltar from './voltar';

const actions = {
  VOLTAR: 'VOLTAR',
  INIT: 'INIT',
  ETAPA_AUTENTICACAO: 'ETAPA_AUTENTICACAO',
  ETAPA_AUTENTICACAO_EP: 'ETAPA_AUTENTICACAO_EP',
  ETAPA_VALORES: 'ETAPA_VALORES',
  ETAPA_CONTATO: 'ETAPA_CONTATO',
  ETAPA_CADASTRO: 'ETAPA_CADASTRO',
  ETAPA_CRIAR_SENHA: 'ETAPA_CRIAR_SENHA',
  ETAPA_INFO_COMPL: 'ETAPA_INFO_COMPL',
  ETAPA_DOCUMENTO_FRENTE: 'ETAPA_DOCUMENTO_FRENTE',
  ETAPA_DOCUMENTO_VERSO: 'ETAPA_DOCUMENTO_VERSO',
  PERSISTIR: 'PERSISTIR',
  CALCULAR_EMPRESTIMO: 'CALCULAR_EMPRESTIMO',
  CALCULAR_EMPRESTIMO_EP: 'CALCULAR_EMPRESTIMO_EP',
  CALCULAR_EMPRESTIMO_EP_PARCELAMENTO: 'CALCULAR_EMPRESTIMO_EP_PARCELAMENTO',
  NEW_ASYNC_STATE: 'NEW_ASYNC_STATE',
  SET_EMAIL: 'SET_EMAIL',
  EXIBIR_ALERTA: 'EXIBIR_ALERTA',
  ATUALIZAR_RESUME_STATUS: 'ATUALIZAR_RESUME_STATUS',
  VERIFICAR_ENVIO_CONTATO: 'VERIFICAR_ENVIO_CONTATO',
  VERIFICAR_CONFIRMACAO_CONTATO: 'VERIFICAR_CONFIRMACAO_CONTATO',
  ENVIAR_CONFIRMACAO_CONTATO: 'ENVIAR_CONFIRMACAO_CONTATO',
  ABRIR_MODAL_CONTATO: 'ABRIR_MODAL_CONTATO',
  PODE_REENVIAR: 'PODE_REENVIAR',
  ETAPA_CONTA_BANCARIA: 'ETAPA_CONTA_BANCARIA',
  SINCRONIZAR_PESSOA: 'SINCRONIZAR_PESSOA',
  SET_CAMPOS_PERSONALIZADOS: 'SET_CAMPOS_PERSONALIZADOS',
  SET_MODELO_DOCUMENTO: 'SET_MODELO_DOCUMENTO',
};

const firebase = useFirebase(); // eslint-disable-line react-hooks/rules-of-hooks

async function getFireBaseDadosTomador({
  pessoa,
  contaBancaria,
  dadosDocumentos,
}) {
  let dadosTomadorRealTime = { pessoa, contaBancaria, dadosDocumentos };

  const realtimeDbRef = await firebase
    .database()
    .ref(`users/${pessoa.id}/historico/dadosTomador`);

  return new Promise((resolve, reject) => {
    try {
      return realtimeDbRef.on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const pessoaData = data.pessoa;
          if (pessoaData) {
            // TRATATIVA PARA O TIPO DATA
            Object.keys(pessoaData).map(nome => {
              if (
                pessoaData[nome] &&
                nome.includes('data', 0) &&
                nome !== 'dataNascimento'
              ) {
                pessoaData[nome] = parseISO(pessoaData[nome]);
              }
              return null;
            });
          }
          let contaBancariaData = data.contaBancaria;
          let camposAdicionaisBanco;
          if (contaBancariaData) {
            // TRATATIVA PARA O TIPO DATA
            Object.keys(contaBancariaData).map(nome => {
              if (contaBancariaData[nome] && nome.includes('data', 0)) {
                contaBancariaData[nome] = parseISO(contaBancariaData[nome]);
              }
              return null;
            });

            const {
              banco,
              agencia,
              conta,
              tipoConta,
              tipoOperacao,
              ...camposAdicionais
            } = contaBancariaData;
            camposAdicionaisBanco = camposAdicionais;
            contaBancariaData = {
              banco,
              agencia,
              conta,
              tipoConta,
              tipoOperacao,
            };
          }

          dadosTomadorRealTime = {
            pessoa: { ...pessoa, ...pessoaData },
            ...(contaBancaria ||
              (data.contaBancaria && {
                contaBancaria: { ...contaBancaria, ...contaBancariaData },
                camposAdicionais: { ...camposAdicionaisBanco },
              })),
            ...(dadosDocumentos ||
              (data.dadosDocumentos && {
                dadosDocumentos: {
                  ...dadosDocumentos,
                  ...data.dadosDocumentos,
                },
              })),
          };
          return resolve(dadosTomadorRealTime);
        }
        return resolve(dadosTomadorRealTime);
      });
    } catch (e) {
      reject(dadosTomadorRealTime);
    }
  }).then(response => response);
}

function tratativaPossivelErro(state, dispatch) {
  const { err, fnErr, ...newState } = state;
  if (err && fnErr) {
    dispatch({
      type: actions.EXIBIR_ALERTA,
      payload: { msg: { err, duracao: 3000, tipo: 'error' } },
    });
    return setTimeout(() => fnErr(), 3000);
  }

  return dispatch({ type: actions.NEW_ASYNC_STATE, payload: newState });
}

export function reducerMiddleware(state, dispatch) {
  return async action => {
    const { type, payload } = action;
    try {
      dispatch({ type: actions.LOADING });

      if (type === actions.INIT) {
        const { pessoa, organizacao, idNegociacao, cpfBuscado } = payload;
        const novaSimulacao = !!idNegociacao;

        const etapaLoading = getEtapaPorId({
          idBusca: IDS_FLUXO_SIMULACAO_ENUM.LOADING_INICIAL,
          pessoa,
          organizacao,
        });

        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: {
            etapaAtualObj: etapaLoading,
            novaSimulacao,
            idNegociacao,
            cpfBuscado,
          },
        });

        let newState;
        if (organizacao?.tipoFluxoEp !== 'BANCO_SEMEAR') {
          newState = await init(
            pessoa,
            organizacao,
            novaSimulacao,
            idNegociacao,
          );
        } else {
          newState = await initEP(
            pessoa,
            organizacao,
            novaSimulacao,
            idNegociacao,
          );
        }

        const { organizacao: orgState } = newState;
        newState.tipoFluxo = orgState?.tipoFluxoEp
          ? orgState?.tipoFluxoEp
          : orgState?.tipoFluxoEcp;

        if (newState.pessoa) {
          const dadosTomadorRealTime = await getFireBaseDadosTomador({
            pessoa: newState.pessoa,
            contaBancaria: newState.contaBancaria,
            dadosDocumentos: newState.dadosDocumentos,
          });

          if (
            !!dadosTomadorRealTime?.pessoa &&
            !!dadosTomadorRealTime?.pessoa?.ocupacaoProfissional &&
            dadosTomadorRealTime.pessoa.ocupacaoProfissional !==
              newState?.camposAdicionais?.ocupacaoProfissional
          ) {
            newState.camposAdicionais.ocupacaoProfissional =
              dadosTomadorRealTime.pessoa.ocupacaoProfissional;
            const orgCampo = Organizacao.getCamposPersonalizadosPorOcupacao(
              dadosTomadorRealTime.pessoa.ocupacaoProfissional,
            );
            dispatch({
              type: actions.SET_CAMPOS_PERSONALIZADOS,
              payload: { orgCampo },
            });
          }

          newState.pessoa = dadosTomadorRealTime.pessoa;
          newState.contaBancaria =
            dadosTomadorRealTime.contaBancaria ||
            newState.contaBancaria ||
            state.contaBancaria;
          newState.camposAdicionais =
            dadosTomadorRealTime.camposAdicionais ||
            newState.camposAdicionais ||
            state.camposAdicionais;
          newState.dadosDocumentos =
            dadosTomadorRealTime.dadosDocumentos ||
            newState.dadosDocumentos ||
            state.dadosDocumentos;
        }

        return tratativaPossivelErro(newState, dispatch);
      }

      if (type === actions.ETAPA_AUTENTICACAO) {
        const { tokenData } = payload;
        const { pessoa, organizacao } = state;

        const etapaLoading = getEtapaPorId({
          idBusca: IDS_FLUXO_SIMULACAO_ENUM.LOADING_INICIAL,
          pessoa,
          organizacao,
        });
        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: { etapaAtualObj: etapaLoading },
        });

        const newState = await etapaAutenticacao(tokenData);

        if (newState.pessoa) {
          const dadosTomadorRealTime = await getFireBaseDadosTomador({
            pessoa: newState.pessoa,
            contaBancaria: newState.contaBancaria,
            dadosDocumentos: newState.dadosDocumentos,
          });
          newState.pessoa = dadosTomadorRealTime.pessoa;
          newState.contaBancaria =
            dadosTomadorRealTime.contaBancaria ||
            newState.camposAdicionais ||
            state.contaBancaria;
          newState.camposAdicionais =
            dadosTomadorRealTime.camposAdicionais ||
            newState.camposAdicionais ||
            state.camposAdicionais;
          newState.dadosDocumentos =
            dadosTomadorRealTime.dadosDocumentos ||
            newState.dadosDocumentos ||
            state.dadosDocumentos;
        }

        return tratativaPossivelErro(newState, dispatch);
      }

      if (type === actions.ETAPA_CADASTRO_EP) {
        const pessoa = payload;
        const { organizacao } = state;
        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: {
            pessoa,
            etapaAtualObj: getEtapaPorId({
              idBusca: IDS_FLUXO_SIMULACAO_ENUM.CADASTROEP,
              pessoa,
              organizacao,
            }),
          },
        });
      }

      if (type === actions.ETAPA_AUTENTICACAO_EP) {
        const { tokenData } = payload;
        const { pessoa, organizacao } = state;
        tokenData.organizacao = organizacao;

        const etapaLoading = getEtapaPorId({
          idBusca: IDS_FLUXO_SIMULACAO_ENUM.LOADING_INICIAL,
          pessoa,
          organizacao,
        });
        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: { etapaAtualObj: etapaLoading },
        });

        const newState = await etapaAutenticacaoEP(tokenData);

        if (newState.pessoa) {
          const dadosTomadorRealTime = await getFireBaseDadosTomador({
            pessoa: newState.pessoa,
            contaBancaria: newState.contaBancaria,
            dadosDocumentos: newState.dadosDocumentos,
          });
          newState.pessoa = dadosTomadorRealTime.pessoa;
          newState.contaBancaria =
            dadosTomadorRealTime.contaBancaria ||
            newState.camposAdicionais ||
            state.contaBancaria;
          newState.camposAdicionais =
            dadosTomadorRealTime.camposAdicionais ||
            newState.camposAdicionais ||
            state.camposAdicionais;
          newState.dadosDocumentos =
            dadosTomadorRealTime.dadosDocumentos ||
            newState.dadosDocumentos ||
            state.dadosDocumentos;
        }

        return tratativaPossivelErro(newState, dispatch);
      }

      if (type === actions.ETAPA_CONTATO) {
        const newStateContato = await etapaContato(
          payload.novoValores,
          payload.pessoa,
          payload.camposAdicionais,
          state.organizacao,
          state.confirmacaoContato,
          state.tokenData,
        );

        return dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: newStateContato,
        });
      }

      if (type === actions.PERSISTIR) {
        const {
          parametrizacao,
          emprestimo,
          pessoa,
          endereco,
          dadosDocumentos,
          origem,
          camposAdicionais,
          tokenEmailAtual,
          contaBancaria,
          novaSimulacao,
          idNegociacao,
          tipoFluxo,
        } = payload;

        const newState = await persistir(
          parametrizacao,
          emprestimo,
          pessoa,
          endereco,
          tokenEmailAtual,
          camposAdicionais,
          origem,
          contaBancaria,
          novaSimulacao,
          idNegociacao,
          tipoFluxo,
          dadosDocumentos,
        );

        if (newState.persistido) {
          return dispatch({ type: actions.NEW_ASYNC_STATE, payload: newState });
        }

        const { err, persistido } = newState;
        dispatch({
          type: actions.EXIBIR_ALERTA,
          payload: { msg: { err, duracao: 3000, tipo: 'error' } },
        });

        return dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: { persistido },
        });
      }

      if (type === actions.CALCULAR_EMPRESTIMO) {
        const {
          valor,
          parcelas,
          empresa,
          parametrizacao,
          organizacao,
          comSeguro,
          callback,
        } = payload;

        const { simulacaoValues, idNegociacao } = state;

        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: {
            resumeStatus: { isVisivel: true, isLoading: true },
          },
        });

        try {
          const calculoEmprestimo = await calculaSimulacaoConsignado({
            valorEmprestimo: stringToNumber(valor),
            quantidadeParcelas: parcelas,
            empresa,
            parametrizacao,
            organizacao,
            comSeguro,
            idNegociacao,
          });

          dispatch({
            type: actions.NEW_ASYNC_STATE,
            payload: {
              simulacaoValues: { ...simulacaoValues, ...payload },
              calculoEmprestimo,
              taxaJuros: calculoEmprestimo.jurosAoMes,
              resumeStatus: { isVisivel: true, isLoading: false },
            },
          });

          if (callback) {
            callback();
          }
        } catch (err) {
          const msgErro = getMsgErro(err);
          const duracaoAlerta = 6000;
          dispatch({
            type: actions.EXIBIR_ALERTA,
            payload: {
              msg: {
                err: msgErro,
                duracao: duracaoAlerta,
                tipo: 'error',
              },
            },
          });

          setTimeout(() => pushRota('/logout'), duracaoAlerta);
        }

        return;
      }

      if (type === actions.CALCULAR_EMPRESTIMO_EP) {
        const {
          valor: valorCalc,
          dataPrimeiraParcela,
          comSeguro,
          callback,
        } = payload;

        const { simulacaoValues: simulacaoCalc } = state;

        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: {
            resumeStatus: { isVisivel: true, isLoading: true },
          },
        });

        try {
          const calculoEmprestimo = await calculaSimulacaoEP({
            valorEmprestimo: stringToNumber(valorCalc),
            dataPrimeiraParcela: transformarDataApiParaDataLocal(
              dataPrimeiraParcela,
            ).format('YYYY-MM-DD'),
            comSeguro,
          });

          dispatch({
            type: actions.NEW_ASYNC_STATE,
            payload: {
              simulacaoValues: { ...simulacaoCalc, ...payload },
              calculoEmprestimo,
              taxaJuros: calculoEmprestimo.jurosAoMes,
              resumeStatus: { isVisivel: false, isLoading: false },
            },
          });
          if (callback) {
            callback();
          }
        } catch (err) {
          const msgErro = getMsgErro(err);
          const duracaoAlerta = 6000;
          dispatch({
            type: actions.EXIBIR_ALERTA,
            payload: {
              msg: {
                err: msgErro,
                duracao: duracaoAlerta,
                tipo: 'error',
              },
            },
          });
        }

        return;
      }

      if (type === actions.CALCULAR_EMPRESTIMO_EP_PARCELAMENTO) {
        const { parcelamento } = payload;
        const {
          calculoEmprestimo: calculoEmprestimoCalc,
          simulacaoValues: simulacaoEmprestimoCalc,
        } = state;

        calculoEmprestimoCalc.quantidadeParcelas = parcelamento.qtdParcelas;
        calculoEmprestimoCalc.jurosAoMes = parcelamento.taxaJurosAoMes;
        calculoEmprestimoCalc.valorParcela = parcelamento.valorParcela;
        calculoEmprestimoCalc.valorIof = parcelamento.valorIof;
        calculoEmprestimoCalc.totalApagar = parcelamento.valorTotalAPagar;
        calculoEmprestimoCalc.juros = parcelamento.valorJuros;
        calculoEmprestimoCalc.despesas = parcelamento.valorDespesas;
        calculoEmprestimoCalc.taxaAdm = 0;
        calculoEmprestimoCalc.taxaIof = parcelamento.taxaIof;
        calculoEmprestimoCalc.cetMensal = parcelamento.cetMensal;
        calculoEmprestimoCalc.cetAnual = parcelamento.cetAnual;
        calculoEmprestimoCalc.dataUltimaParcela =
          parcelamento.dataUltimaParcela;
        calculoEmprestimoCalc.valorContrato = parcelamento.valorContrato;
        calculoEmprestimoCalc.valorSeguro = parcelamento.valorSeguroPlano;
        calculoEmprestimoCalc.percSeguroConsignado =
          parcelamento.percSeguroPlano;

        simulacaoEmprestimoCalc.parcelas = parcelamento.qtdParcelas;
        simulacaoEmprestimoCalc.parcelamento = parcelamento.qtdParcelas;

        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: {
            simulacaoValues: { ...simulacaoEmprestimoCalc },
            calculoEmprestimo: calculoEmprestimoCalc,
            taxaJuros: calculoEmprestimoCalc.jurosAoMes,
            resumeStatus: { isVisivel: true, isLoading: false },
          },
        });
      }

      if (type === actions.ATUALIZAR_RESUME_STATUS) {
        const { resumeStatus } = payload;
        return dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: { resumeStatus },
        });
      }

      if (type === actions.ENVIAR_CONFIRMACAO_CONTATO) {
        dispatch({ type: actions.LOADING });
        const { contato } = payload;
        const { confirmacaoContato, tokenData: { token, origem } = {} } = state;
        dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: { confirmacaoContato: { modal: { enviado: false } } },
        });
        const newState = await enviarConfirmacaoContato(
          token,
          contato,
          confirmacaoContato,
          true,
          origem,
        );
        return dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: { confirmacaoContato: newState },
        });
      }

      if (type === actions.VERIFICAR_CONFIRMACAO_CONTATO) {
        const newState = await verificaContatoConfirmado(
          payload.contato,
          state.confirmacaoContato,
        );
        return dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: { confirmacaoContato: newState },
        });
      }

      if (type === actions.SINCRONIZAR_PESSOA) {
        dispatch({ type: actions.LOADING });
        const { pessoa: pessoaState } = state;
        const { documento } = pessoaState;
        const sincronizacaoAmbientesIgnorados = ['test', 'e2e', 'local'];
        const ambienteAtual = process.env.REACT_APP_ENV;
        if (!sincronizacaoAmbientesIgnorados.includes(ambienteAtual)) {
          const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();
          await PessoaAPI.sincronizarPessoa(documento, cnpjOrganizacao); // Chama gcp function que atualiza dados com a Big Data Corp (firebase proxy)
        }
        const { pessoa: pessoaSincronizada } = await PessoaAPI.get();
        const dadosRg = parseDadosRg(pessoaSincronizada);
        const { dataAtualizacaoBigdatacorp } = pessoaSincronizada;
        return dispatch({
          type: actions.NEW_ASYNC_STATE,
          payload: {
            pessoa: {
              ...pessoaState,
              ...dadosRg,
              dataAtualizacaoBigdatacorp,
            },
            pessoaBigdatacorpSincronizadaNoFluxo: true,
          },
        });
      }
    } catch (e) {
      console.error(e);
      let mensagem;
      if (e.status === 403) {
        mensagem = 'Acesso Negado.';
      } else if (e.status === 500) {
        mensagem = 'Houve um problema, tente mais tarde.';
      } else {
        mensagem = e.erro;
      }
      dispatch({
        type: actions.EXIBIR_ALERTA,
        payload: {
          msg: { err: mensagem, duracao: 3000, tipo: 'error' },
          resumeStatus: { isVisivel: false, isLoading: false },
        },
      });
    }
    dispatch({ type, payload: { ...payload, loading: false } });
  };
}

export const reducer = (state, action) => {
  const { type, payload } = action;
  const { pessoa: paramPessoa } = state;

  let newState;
  const pessoa = paramPessoa;
  const { possuiSenhaFirebase } = pessoa;

  switch (type) {
    case actions.LOADING:
      return { ...state, loading: true };
    case actions.PODE_REENVIAR:
      return {
        ...state,
        confirmacaoContato: {
          ...state.confirmacaoContato,
          modal: { ...state.confirmacaoContato.modal, podeReenviar: true },
        },
      };
    case actions.VOLTAR:
      newState = voltar({
        etapaAtualObj: state.etapaAtualObj,
        pessoa: state.pessoa,
        organizacao: state.organizacao,
      });
      return { ...state, ...newState, loading: false };
    case actions.ETAPA_VALORES:
      newState = etapaSimulacao(
        payload.pessoa,
        payload.empresa,
        payload.simulacaoValues,
        state.organizacao,
        payload.novaSimulacao,
      );
      return { ...state, ...newState, loading: false };
    case actions.ETAPA_CADASTRO:
      newState = etapaCadastro(
        payload.dadosPessoais,
        payload.pessoa,
        payload.camposAdicionais,
        payload.organizacao,
      );
      return { ...state, ...newState, loading: false };
    case actions.ETAPA_CRIAR_SENHA:
      newState = etapaCriarSenha(payload.pessoa, payload.senha);
      return { ...state, ...newState, loading: false };
    case actions.ETAPA_DOCUMENTO_FRENTE:
      return {
        ...state,
        etapaAtualObj: getProximaEtapa({
          idEtapaAtual: IDS_FLUXO_SIMULACAO_ENUM.DOCUMENTO_FRENTE,
          pessoa: state.pessoa,
          organizacao: state.organizacao,
        }),
        loading: false,
      };
    case actions.ETAPA_DOCUMENTO_VERSO:
      if (possuiSenhaFirebase) {
        return {
          ...state,
          prontoParaPersistir: true,
        };
      }

      return {
        ...state,
        etapaAtualObj: getProximaEtapa({
          idEtapaAtual: IDS_FLUXO_SIMULACAO_ENUM.DOCUMENTO_VERSO,
          pessoa: state.pessoa,
          organizacao: state.organizacao,
        }),
        loading: false,
      };
    case actions.ETAPA_INFO_COMPL:
      newState = etapaInfosComplementares(
        payload.valores,
        payload.camposAdicionais,
        payload.pessoa,
        state.organizacao,
      );
      return { ...state, ...newState };
    case actions.SET_EMAIL:
      return {
        ...state,
        pessoa: {
          ...state.pessoa,
          email: payload.email,
          celular: payload.celular,
        },
        camposAdicionais: {
          ...state.camposAdicionais,
          ...payload.camposAdicionais,
        },
        loading: false,
      };
    case actions.NEW_ASYNC_STATE:
      return { ...state, pessoa, loading: false, ...payload };
    case actions.EXIBIR_ALERTA:
      return { ...state, loading: false, ...payload };
    case actions.SET_CAMPOS_PERSONALIZADOS:
      const { organizacao: orgCampos } = state;
      orgCampos.camposPersonalizados = payload.camposPersonalizados;
      return { ...state, loading: false, organizacao: orgCampos };
    case actions.ETAPA_CONTA_BANCARIA:
      const { contaBancaria, camposAdicionais } = payload;
      const { organizacao } = state;
      const { tipoFluxoEp } = organizacao;
      const ehFluxoEp = tipoFluxoEp === 'BANCO_SEMEAR';

      if (possuiSenhaFirebase && !ehFluxoEp) {
        return {
          ...state,
          contaBancaria,
          camposAdicionais,
          prontoParaPersistir: true,
        };
      }

      return {
        ...state,
        contaBancaria,
        etapaAtualObj: getProximaEtapa({
          idEtapaAtual: IDS_FLUXO_SIMULACAO_ENUM.CONTA_BANCARIA,
          pessoa,
          organizacao,
        }),
        camposAdicionais,
      };

    default:
      return state;
  }
};

export const fns = (state, dispatch) => {
  function voltarEtapa() {
    dispatch({ type: actions.VOLTAR, payload: {} });
  }
  function initFluxo(pessoa, organizacao, idNegociacao, cpfBuscado) {
    dispatch({
      type: actions.INIT,
      payload: { pessoa, organizacao, idNegociacao, cpfBuscado },
    });
  }
  function simulacaoEtapaAutenticacao() {
    const { tokenData } = state;
    dispatch({ type: actions.ETAPA_AUTENTICACAO, payload: { tokenData } });
  }
  function simulacaoEtapaAutenticacaoEP({ tokenData }) {
    dispatch({ type: actions.ETAPA_AUTENTICACAO_EP, payload: { tokenData } });
  }
  function simulacaoEtapaCadastroEP({ cpf, celular }) {
    dispatch({
      type: actions.ETAPA_CADASTRO_EP,
      payload: { cpf, celular },
    });
  }
  function simulacaoEtapaValores() {
    const { pessoa, empresa, simulacaoValues, novaSimulacao } = state;
    dispatch({
      type: actions.ETAPA_VALORES,
      payload: { pessoa, empresa, simulacaoValues, novaSimulacao },
    });
  }
  function simulacaoEtapaContato(novoValores) {
    const { pessoa, camposAdicionais } = state;
    dispatch({
      type: actions.ETAPA_CONTATO,
      payload: { novoValores, pessoa, camposAdicionais },
    });
  }

  function simulacaoEtapaCadastro(dadosPessoais) {
    const { pessoa, camposAdicionais, organizacao } = state;
    dispatch({
      type: actions.ETAPA_CADASTRO,
      payload: {
        dadosPessoais,
        pessoa,
        camposAdicionais,
        organizacao,
      },
    });
  }

  function simularEtapaDocumentoFrente() {
    dispatch({
      type: actions.ETAPA_DOCUMENTO_FRENTE,
    });
  }

  function simularEtapaDocumentoVerso() {
    dispatch({
      type: actions.ETAPA_DOCUMENTO_VERSO,
    });
  }

  function simulacaoEtapaCriarSenha(senha) {
    const { pessoa } = state;
    dispatch({
      type: actions.ETAPA_CRIAR_SENHA,
      payload: { senha, pessoa },
    });
  }

  function simulacaoEtapaInfosComplementares(valores) {
    const { camposAdicionais, pessoa } = state;
    dispatch({
      type: actions.ETAPA_INFO_COMPL,
      payload: { valores, camposAdicionais, pessoa },
    });
  }

  function setContatos(email, celular, camposAdicionais) {
    dispatch({
      type: actions.SET_EMAIL,
      payload: { email, celular, camposAdicionais },
    });
  }

  function persistirSimulacao() {
    const {
      parametrizacao,
      emprestimo,
      pessoa,
      endereco,
      tokenData: { token: tokenEmailAtual } = {},
      camposAdicionais,
      contaBancaria: {
        banco: { id: idBanco },
        numeroConta: conta,
        numeroAgencia: agencia,
        tipoOperacao,
        ...restContaBancaria
      },
      origem,
      novaSimulacao,
      idNegociacao,
      tipoFluxo,
      dadosDocumentos,
    } = state;

    const contaBancaria = {
      banco: idBanco,
      conta,
      agencia,
      tipoOperacao,
      ...restContaBancaria,
    };

    dispatch({
      type: actions.PERSISTIR,
      payload: {
        parametrizacao,
        emprestimo,
        pessoa,
        endereco,
        dadosDocumentos,
        tokenEmailAtual,
        camposAdicionais,
        origem,
        contaBancaria,
        novaSimulacao,
        idNegociacao,
        tipoFluxo,
      },
    });
  }

  function setDocumentoFrenteEP({
    bucketPath,
    docFrenteCapturaAutomatica,
    tipoDocumento,
  }) {
    const { dadosDocumentos } = state;
    dispatch({
      type: actions.NEW_ASYNC_STATE,
      payload: {
        dadosDocumentos: {
          ...dadosDocumentos,
          bucketPath,
          docFrenteCapturaAutomatica,
          tipoDocumento,
        },
      },
    });
  }

  function setDocumentoVersoEP({ docVersoCapturaAutomatica }) {
    const { dadosDocumentos } = state;
    dispatch({
      type: actions.NEW_ASYNC_STATE,
      payload: {
        dadosDocumentos: {
          ...dadosDocumentos,
          docVersoCapturaAutomatica,
        },
      },
    });
  }

  function setOrganizacaoEP(organizacao) {
    dispatch({
      type: actions.NEW_ASYNC_STATE,
      payload: { organizacao },
    });
  }

  function calcularEmprestimo(valor, parcelas, objetivo, comSeguro, callback) {
    const { parametrizacao, empresa, organizacao } = state;
    dispatch({
      type: actions.CALCULAR_EMPRESTIMO,
      payload: {
        valor,
        parcelas,
        objetivo,
        parametrizacao,
        empresa,
        organizacao,
        comSeguro,
        callback,
      },
    });
  }

  function calcularEmprestimoEP(
    valor,
    dataPrimeiraParcela,
    objetivo,
    comSeguro,
    callback,
  ) {
    dispatch({
      type: actions.CALCULAR_EMPRESTIMO_EP,
      payload: {
        valor,
        dataPrimeiraParcela,
        objetivo,
        comSeguro,
        callback,
      },
    });
  }

  function calcularEmprestimoEPParcelamento(parcelamento) {
    dispatch({
      type: actions.CALCULAR_EMPRESTIMO_EP_PARCELAMENTO,
      payload: { parcelamento },
    });
  }

  function atualizarResumeStatus(isVisivel, isLoading) {
    dispatch({
      type: actions.ATUALIZAR_RESUME_STATUS,
      payload: {
        resumeStatus: {
          isVisivel,
          isLoading,
        },
      },
    });
  }

  function enviarCodigoContato(contato) {
    dispatch({
      type: actions.ENVIAR_CONFIRMACAO_CONTATO,
      payload: { contato },
    });
  }

  function verificarConfirmacaoContato(contato) {
    dispatch({
      type: actions.VERIFICAR_CONFIRMACAO_CONTATO,
      payload: { contato },
    });
  }

  async function simulacaoEtapaContaBancaria({
    banco,
    tipoConta,
    numeroAgencia,
    numeroConta,
    camposAdicionais,
    tipoOperacao,
    ...rest
  }) {
    const { camposAdicionais: reducerCamposAdicionais } = state;

    dispatch({
      type: actions.ETAPA_CONTA_BANCARIA,
      payload: {
        contaBancaria: {
          banco,
          tipoConta,
          numeroAgencia,
          numeroConta,
          tipoOperacao,
          ...rest,
        },
        camposAdicionais: {
          ...reducerCamposAdicionais,
          ...camposAdicionais,
        },
      },
    });
  }

  function cancelarNovaSimulacao() {
    dispatch({
      type: actions.NEW_ASYNC_STATE,
      payload: { prontoParaNovaSimulacao: false },
    });
  }

  function sincronizarPessoa() {
    dispatch({ type: actions.SINCRONIZAR_PESSOA, payload: {} });
  }

  function atualizarValoresFormSimulacao(novosValoresFormSimulacao) {
    const { simulacaoValues } = state;
    dispatch({
      type: actions.NEW_ASYNC_STATE,
      payload: {
        simulacaoValues: {
          ...simulacaoValues,
          ...novosValoresFormSimulacao,
        },
      },
    });
  }

  function resetarEstadoInicial() {
    dispatch({
      type: actions.NEW_ASYNC_STATE,
      payload: {
        ...ESTADO_INICIAL,
      },
    });
  }

  function setOrganizacaoCamposPersonalizadosEP(camposPersonalizados) {
    dispatch({
      type: actions.SET_CAMPOS_PERSONALIZADOS,
      payload: { camposPersonalizados },
    });
  }

  return {
    voltar: voltarEtapa,
    init: initFluxo,
    etapaAutenticacao: simulacaoEtapaAutenticacao,
    etapaAutenticacaoEP: simulacaoEtapaAutenticacaoEP,
    etapaCadastroEP: simulacaoEtapaCadastroEP,
    etapaValores: simulacaoEtapaValores,
    etapaContato: simulacaoEtapaContato,
    etapaCadastro: simulacaoEtapaCadastro,
    etapaCriarSenha: simulacaoEtapaCriarSenha,
    etapaInfosComplemtares: simulacaoEtapaInfosComplementares,
    etapaDocumentoFrente: simularEtapaDocumentoFrente,
    etapaDocumentoVerso: simularEtapaDocumentoVerso,
    persistir: persistirSimulacao,
    setOrganizacao: setOrganizacaoEP,
    setOrganizacaoCamposPersonalizados: setOrganizacaoCamposPersonalizadosEP,
    setDocumentoFrente: setDocumentoFrenteEP,
    setDocumentoVerso: setDocumentoVersoEP,
    calcularEmprestimo,
    calcularEmprestimoEP,
    calcularEmprestimoEPParcelamento,
    setContatos,
    atualizarResumeStatus,
    enviarCodigoContato,
    verificarConfirmacaoContato,
    etapaContaBancaria: simulacaoEtapaContaBancaria,
    sincronizarPessoa,
    atualizarValoresFormSimulacao,
    resetarEstadoInicial,
    cancelarNovaSimulacao,
  };
};
