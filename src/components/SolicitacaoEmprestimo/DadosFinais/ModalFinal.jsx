import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

import { useSimulacaoState } from '../../../pages/Tomador/SolicitacaoEmprestimo/state';
import pushRota from '../../../routes/push';
import Divider from '../../MaterialUI/Divider';
import Modal from '../../Modal';
import ResumoEmprestimo from '../../ResumoEmprestimo';
import AutorizacaoCompartilhamentoDadosBancoSemear from './AutorizacaoCompartilhamentoDados/BancoSemear';
import AutorizacaoCompartilhamentoDadosP2P from './AutorizacaoCompartilhamentoDados/P2P';
import AutorizacaoCompartilhamentoDadosPortocred from './AutorizacaoCompartilhamentoDados/Portocred';
import InfosEmprestimoSolicitado from './InfosEmprestimoSolicitado';

const ContainerStyled = styled(Grid)`
  overflow-y: hidden;
  padding: 5px 0 5px;
`;
const ContainerTextos = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 0;
  }
`;

export default function ModalFinal({ tokenAtualizado }) {
  const firebase = useFirebase();
  const [
    {
      // tokenAtualizado,
      tipoFluxo,
    },
  ] = useSimulacaoState();
  const {
    state: {
      pessoa: { parametrizacaoAtiva, id },
    },
  } = useCreditoExpress();
  const resumoCompleto =
    tipoFluxo === 'P2P' || tipoFluxo === 'BANCO_SEMEAR' || parametrizacaoAtiva;
  const [
    {
      calculoEmprestimo = {
        valorParcela: 0,
        juros: 0,
        jurosAoMes: 0,
        valorIof: 0,
        taxaIof: 0,
        despesas: 0,
        descricaoDespesas: '',
        totalApagar: 0,
        dataPrimeiraParcela: null,
        valorSeguro: 0,
        percSeguroConsignado: 0,
        valorEmprestimo: 0,
        quantidadeParcelas: 0,
      },
      persistido = false,
      prontoParaPersistir = false,
      novoCustomToken = '',
    },
    { persistir, resetarEstadoInicial },
  ] = useSimulacaoState();

  const [trocarModal, setTrocarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAceiteOrganizacao = tipoFluxoOrg => {
    if (tipoFluxoOrg === 'P2P') return AutorizacaoCompartilhamentoDadosP2P;

    if (tipoFluxoOrg === 'BANCO_SEMEAR')
      return AutorizacaoCompartilhamentoDadosBancoSemear;

    return AutorizacaoCompartilhamentoDadosPortocred;
  };

  const ComponenteAceitePorOrganizacao = getAceiteOrganizacao(tipoFluxo);

  function enviarDados() {
    setLoading(true);
    try {
      persistir();
    } catch (e) {
      return;
    }
    const realTimeDbRef = firebase
      .database()
      .ref(`users/${id}/historico/dadosTomador`);
    const onDisconnectRef = realTimeDbRef.onDisconnect();

    onDisconnectRef.cancel();
    onDisconnectRef.remove();
    firebase.analytics().logEvent('finalizou_solicitacao');
  }

  useEffect(() => {
    if (prontoParaPersistir) {
      firebase.analytics().logEvent('acessou_modal_termos');
    }
  }, [prontoParaPersistir]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (persistido && !novoCustomToken) {
      exibirModalAcompanhamento();
    }
  }, [persistido, novoCustomToken]);

  useEffect(() => {
    if (tokenAtualizado) {
      exibirModalAcompanhamento();
    }
  }, [tokenAtualizado]);

  const exibirModalAcompanhamento = () => {
    setTrocarModal(true);
    setLoading(false);
  };

  return (
    <Modal open={prontoParaPersistir}>
      <ContainerStyled container p={3}>
        <ContainerTextos
          item
          container
          xs={12}
          md={7}
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {trocarModal ? (
            <InfosEmprestimoSolicitado
              redirecionar={() => {
                if (resetarEstadoInicial) {
                  resetarEstadoInicial();
                }
                pushRota('/meus-emprestimos');
              }}
              tipoFluxo={tipoFluxo}
            />
          ) : (
            <ComponenteAceitePorOrganizacao
              loading={loading}
              enviarDados={() => enviarDados()}
            />
          )}
        </ContainerTextos>
        <Hidden smDown>
          <Grid item md={5} style={{ paddingLeft: '20px' }}>
            <Grid item container md={12}>
              <Grid item md={1}>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item md={11}>
                <ResumoEmprestimo
                  item
                  valor={calculoEmprestimo.valorEmprestimo}
                  qtdParcelas={calculoEmprestimo.quantidadeParcelas}
                  valorParcela={calculoEmprestimo.valorParcela}
                  juros={calculoEmprestimo.juros}
                  jurosAoMes={calculoEmprestimo.jurosAoMes}
                  iof={calculoEmprestimo.valorIof}
                  taxaIof={calculoEmprestimo.taxaIof}
                  valorDespesas={calculoEmprestimo.despesas}
                  descricaoDespesas={calculoEmprestimo.descricaoDespesas}
                  totalApagar={calculoEmprestimo.totalApagar}
                  dataPrimeiraParcela={calculoEmprestimo.dataPrimeiraParcela}
                  valorSeguro={calculoEmprestimo.valorSeguro}
                  percSeguroConsignado={calculoEmprestimo.percSeguroConsignado}
                  withCard={false}
                  resumoCompleto={resumoCompleto}
                />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </ContainerStyled>
    </Modal>
  );
}
