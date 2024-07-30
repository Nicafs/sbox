import React, { useEffect, useState } from 'react';

import {
  useAuth,
  useFirebase,
  useCreditoExpress,
} from '@credito-express/ce-components';

import NegociacaoApi from '../../../commons/resources/negociacao';
import { consultarAutorizacaoPeriodo } from '../../../commons/utils/notificacao';
import MeusEmprestimosLoader from '../../../components/MeusEmprestimos/MeusEmprestimosLoader';
import MeusEmprestimosContainer from '../../../containers/MeusEmprestimos';
import { useAppGlobal } from '../../../providers/AppGlobal';

const MeusEmprestimos = () => {
  const firebase = useFirebase();
  const { signout } = useAuth({});
  const [
    showModalPermissaoNotificacao,
    setShowModalPermissaoNotificacao,
  ] = useState(false);
  const [negociacoes, setNegociacoes] = useState([]);
  const [negociacoesLoading, setNegociacoesLoading] = useState(false);
  const [reenviarContaLoading, setReenviarContaLoading] = useState(false);
  const [contaReenviadaComSucesso, setContaReenviadaComSucesso] = useState(
    false,
  );
  const [contaReenviadaComErro, setContaReenviadaComErro] = useState(false);
  const [cancelamentoLoading, setCancelamentoLoading] = useState(false);
  const [canceladoComSucesso, setCanceladoComSucesso] = useState(false);
  const [canceladoComErro, setCanceladoComErro] = useState(false);
  const negociacaoAtual = negociacoes.length
    ? negociacoes.find(negociacao => negociacao.status !== 'CANCELADO')
    : undefined;
  const {
    state: { pessoa, organizacao },
    dispatch,
  } = useCreditoExpress();
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  useEffect(() => {
    buscarNegociacoes();

    firebase.analytics().logEvent('acessou_meus_emprestimos');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    consultarSolicitacao();
  }, [negociacoes]);

  const consultarSolicitacao = async () => {
    const solicitacaoAutorizacao = await consultarAutorizacaoPeriodo();
    setShowModalPermissaoNotificacao(solicitacaoAutorizacao);
  };

  const buscarNegociacoes = async () => {
    setNegociacoesLoading(true);
    setContaReenviadaComSucesso(false);
    setContaReenviadaComErro(false);
    try {
      const { itens: negociacoesArr } = await NegociacaoApi.get({
        paginaNumero: 1,
        paginaTamanho: 20,
      });
      setNegociacoesLoading(false);
      if (negociacoesArr && negociacoesArr.length > 0) {
        setNegociacoes(negociacoesArr);
      }
    } catch (err) {
      signout();
      dispatch({
        type: 'ATUALIZAR_DADOS_AUTENTICACAO',
        payload: {
          usuarioFirebase: {},
          pessoa: {},
        },
      });

      const logMsg = 'Ocorreu um erro ao buscar as negociações!';
      console.error(logMsg, err);
      const { erro } = err;
      exibirAlerta(erro || logMsg);
    }
  };

  const reenviarContaBancaria = async formikValues => {
    setContaReenviadaComErro(false);
    setContaReenviadaComSucesso(false);
    const { id: idNegociacao } = negociacaoAtual;
    const { banco, agencia, conta, tipoConta, tipoOperacao } = formikValues;
    const { value: idBanco } = banco;
    const params = {
      idNegociacao,
      agencia,
      conta,
      tipoConta,
      banco: idBanco,
      ...(tipoOperacao && { tipoOperacao }),
    };
    try {
      setReenviarContaLoading(true);
      await NegociacaoApi.adicionarContaBancaria(params);
      setContaReenviadaComSucesso(true);
      firebase.analytics().logEvent('finalizou_fluxo_nova_conta');
    } catch (err) {
      setContaReenviadaComErro(true);
      console.error('Ocorreu um erro ao reenviar conta bancária!', err);
    } finally {
      setReenviarContaLoading(false);
    }
  };

  if (negociacoesLoading || !pessoa.id) {
    return <MeusEmprestimosLoader />;
  }

  const cancelarSolicitacao = async value => {
    setCanceladoComErro(false);
    setCanceladoComSucesso(false);
    const { id: idNegociacao } = negociacaoAtual;
    const { opcao: motivo, observacao = '' } = value;
    const params = {
      idNegociacao,
      motivo,
      ...(observacao && { observacao }),
    };
    try {
      setCancelamentoLoading(true);
      await NegociacaoApi.solicitarCancelamento(params);
      setCanceladoComSucesso(true);
      firebase.analytics().logEvent('cancelou_solicitacao');
    } catch (err) {
      setCanceladoComErro(true);
      console.error('Ocorreu um erro ao cancelar a solicitação!', err);
    } finally {
      setCancelamentoLoading(false);
    }
  };

  const observacaoCancelamento = value => {
    return value === 'OUTROS';
  };

  if (negociacoesLoading || !pessoa.id) {
    return <MeusEmprestimosLoader />;
  }

  return (
    <MeusEmprestimosContainer
      reenviarContaBancaria={reenviarContaBancaria}
      cancelarSolicitacao={cancelarSolicitacao}
      negociacaoAtual={negociacaoAtual}
      negociacoes={negociacoes}
      pessoa={pessoa}
      organizacao={organizacao}
      showModalPermissaoNotificacao={showModalPermissaoNotificacao}
      setShowModalPermissaoNotificacao={setShowModalPermissaoNotificacao}
      reenviarContaLoading={reenviarContaLoading}
      cancelamentoLoading={cancelamentoLoading}
      contaReenviadaComSucesso={contaReenviadaComSucesso}
      contaReenviadaComErro={contaReenviadaComErro}
      canceladoComSucesso={canceladoComSucesso}
      canceladoComErro={canceladoComErro}
      buscarNegociacoes={buscarNegociacoes}
      observacaoCancelamento={observacaoCancelamento}
    />
  );
};

export default MeusEmprestimos;
