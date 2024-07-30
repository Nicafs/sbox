import React, { useEffect, useState, useRef } from 'react';

import EnumDinamico from '~/commons/resources/enum-dinamico';
import {
  subscribeToNotifications,
  atualizarAutorizacao,
} from '~/commons/utils/notificacao';

import { useAppGlobal } from '~/providers/AppGlobal';

import HeaderTomador from '~/components/HeaderTomador';
import ListagemEmprestimoMobile from '~/components/ListagemEmprestimoMobile';
import Box from '~/components/MaterialUI/Box';
import Card from '~/components/MaterialUI/Card';
import CardContent from '~/components/MaterialUI/CardContent';
import Container from '~/components/MaterialUI/Container';
import Hidden from '~/components/MaterialUI/Hidden';
import CardSolicitacaoEmprestimo from '~/components/MeusEmprestimos/CardSolicitacaoEmprestimo';
import ModalContaBancaria from '~/components/ModalContaBancaria';
import ModalInstrucoesDePermissao from '~/components/ModalInstrucoesDePermissao';
import ModalRadioList from '~/components/ModalRadioList';
import TabelaListagemEmprestimo from '~/components/TabelaListagemEmprestimo';
import VerificaPermissaoDeNotificacao from '~/components/VerificaPermissaoDeNotificacao';

import { Titulo, TextoDestaque } from './style';

export default function MeusEmprestimos({
  reenviarContaBancaria,
  cancelarSolicitacao,
  negociacaoAtual,
  negociacoes,
  pessoa,
  organizacao,
  showModalPermissaoNotificacao,
  setShowModalPermissaoNotificacao,
  contaReenviadaComSucesso,
  contaReenviadaComErro,
  canceladoComSucesso,
  canceladoComErro,
  reenviarContaLoading,
  cancelamentoLoading,
  buscarNegociacoes,
  observacaoCancelamento,
}) {
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const [modalMotivoReprovacaoDoc, setModalMotivoReprovacaoDoc] = useState(
    false,
  );
  const [modalContaBancariaAberto, setModalContaBancariaAberto] = useState(
    false,
  );
  const [modalCancelamentoAberto, setModalCancelamentoAberto] = useState(false);
  const [motivosCancelamento, setMotivosCancelamento] = useState([]);
  const isMountedRef = useRef(null);
  const {
    analiseDocumento: { historicoAnalise: { length = '' } = [] } = {},
    analiseDocumento: {
      historicoAnalise: { [length - 1]: { motivoReprovacao = '' } = {} } = [],
    } = {},
    status: statusNegociacaoAtual,
    id: idNegociacaoAtual,
  } = negociacaoAtual || {};

  const existeHistorico = negociacoes.some(
    negociacao => negociacao.status === 'APROVADO',
  );

  const existeMeusEmprestimos = !!(
    negociacoes.length &&
    negociacoes.some(negociacao => negociacao.status !== 'CANCELADO')
  );

  const motivoReprovacaoDoc = (
    <>
      Não conseguimos concluir a análise de seus documentos
      {motivoReprovacao && (
        <>
          {' '}
          pelo seguinte motivo:
          <TextoDestaque> {motivoReprovacao}</TextoDestaque>
        </>
      )}
      . Precisamos que você os envie novamente.
    </>
  );

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (contaReenviadaComSucesso) {
      exibirAlerta('Sua conta bancária foi reenviada com sucesso!', 'success');
      setModalContaBancariaAberto(false);
      buscarNegociacoes();
    }
  }, [contaReenviadaComSucesso]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (contaReenviadaComErro) {
      exibirAlerta(
        'Ocorreu um erro ao enviar sua conta bancária, entre em contato com o suporte!',
        'error',
      );
    }
  }, [contaReenviadaComErro]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (canceladoComSucesso) {
      exibirAlerta('Solicitação de empréstimo cancelada!', 'success');
      setModalCancelamentoAberto(false);
      document.location.reload();
    }
  }, [canceladoComSucesso]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (canceladoComErro) {
      exibirAlerta(
        'Ocorreu um erro ao cancelar sua solicitação de empréstimo, tente mais tarde.',
        'error',
      );
      setModalCancelamentoAberto(false);
    }
  }, [canceladoComErro]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    listarMotivosCancelamento();
  }, []);

  useEffect(() => {
    if (
      statusNegociacaoAtual === 'PENDENCIA_CONFIRMACAO_EMPRESTIMO' &&
      motivoReprovacao
    ) {
      setModalMotivoReprovacaoDoc(true);
    }
  }, [statusNegociacaoAtual, motivoReprovacao]);

  const handleSolicitacaoPermissaoNotificacao = async autorizacaoNotificacao => {
    if (isMountedRef.current) {
      const atualizado = await atualizarAutorizacao(autorizacaoNotificacao);

      if (isMountedRef.current) {
        if (atualizado && autorizacaoNotificacao) {
          subscribeToNotifications();
        }
        setShowModalPermissaoNotificacao(false);
      }
    }
  };

  const listarMotivosCancelamento = async () => {
    const response = await EnumDinamico.listMotivosCancelamento();
    if (isMountedRef.current) {
      setMotivosCancelamento(response);
    }
  };

  const abrirModalContaBancaria = () => {
    setModalContaBancariaAberto(true);
  };

  const abrirModalCancelamento = () => {
    setModalCancelamentoAberto(true);
  };

  const renderTitulo = () =>
    existeMeusEmprestimos ? (
      <Hidden lgUp>
        <Titulo>Meus empréstimos</Titulo>
      </Hidden>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <h2>
          Olá {pessoa.nome.split(' ')[0]}, você não possui empréstimos ainda
        </h2>
      </div>
    );

  return (
    <>
      {showModalPermissaoNotificacao && (
        <VerificaPermissaoDeNotificacao
          mostrarAlertaErro={false}
          handleSolicitacaoPermissao={handleSolicitacaoPermissaoNotificacao}
        />
      )}
      <ModalInstrucoesDePermissao
        open={modalMotivoReprovacaoDoc}
        titulo="Ops, tivemos um problema"
        renderInfo={motivoReprovacaoDoc}
        erro={false}
        solicitaPermissao={() => setModalMotivoReprovacaoDoc(false)}
      />
      {modalContaBancariaAberto && (
        <ModalContaBancaria
          handleAvancar={reenviarContaBancaria}
          dismissHandler={() => setModalContaBancariaAberto(false)}
          open={modalContaBancariaAberto}
          organizacao={organizacao}
          loading={reenviarContaLoading}
        />
      )}
      {modalCancelamentoAberto && (
        <ModalRadioList
          handleConfirmar={cancelarSolicitacao}
          handleClose={() => setModalCancelamentoAberto(false)}
          open={modalCancelamentoAberto}
          loading={cancelamentoLoading}
          itens={motivosCancelamento}
          titulo="Cancelar solicitação de empréstimo"
          texto="Por favor, selecione abaixo o motivo do cancelamento:"
          tituloConfirmacao="Tem certeza que deseja cancelar sua solicitação?"
          textoConfirmacao="Esta ação é irreverssível"
          ativaObservacao={observacaoCancelamento}
          modalConfirmacao
        />
      )}
      <HeaderTomador
        pessoa={pessoa}
        menuSelecionadoIdx={0}
        idNegociacaoAtual={idNegociacaoAtual}
        statusNegociacaoAtual={statusNegociacaoAtual}
        existeMeusEmprestimos={existeMeusEmprestimos}
      />
      <Container principal="true" maxWidth="lg">
        {pessoa && renderTitulo()}
        {existeMeusEmprestimos ? (
          <>
            <Card>
              <CardContent>
                <Container>
                  <CardSolicitacaoEmprestimo
                    negociacao={negociacaoAtual}
                    abrirModalContaBancaria={abrirModalContaBancaria}
                    abrirModalCancelamento={abrirModalCancelamento}
                  />
                </Container>
              </CardContent>
            </Card>
            {existeHistorico && (
              <Box mt={3}>
                <Titulo>Histórico</Titulo>
                <Hidden smDown>
                  <TabelaListagemEmprestimo negociacoes={negociacoes} />
                </Hidden>
                <Hidden mdUp>
                  <ListagemEmprestimoMobile negociacoes={negociacoes} />
                </Hidden>
              </Box>
            )}
          </>
        ) : null}
      </Container>
    </>
  );
}
