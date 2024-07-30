import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { useAppGlobal } from '~/providers/AppGlobal';

import FormConfirmacaoDados from '~/components/SolicitacaoEmprestimo/ConfirmacaoDados/FormConfirmacaoDados';

import DetalhesDesktop from './DetalhesDesktop';
import ModalDataNascimento from './ModalDataNascimento';

const ContainerStyled = styled(Grid)`
  min-height: 100vh;
`;

const FormContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.common.white};
`;

export default function ConfirmacaoDados({
  cpf,
  setCpf,
  dataNascimento,
  setDataNascimento,
  isOpenModalDataNascimento,
  closeModalDataNascimento,
  handleAvancar,
  buscarTomadorPorCpf,
  loading,
}) {
  const {
    organizacao: { tipoFluxoEcp, tipoFluxoEp },
  } = useAppGlobal();

  const configCE = tipoFluxoEcp === 'P2P' && tipoFluxoEp !== 'BANCO_SEMEAR';

  return (
    <>
      <ModalDataNascimento
        dataNascimento={dataNascimento}
        setDataNascimento={setDataNascimento}
        open={isOpenModalDataNascimento}
        dismissHandler={closeModalDataNascimento}
        handleAvancar={handleAvancar}
        loading={loading}
      />
      <ContainerStyled container>
        <FormContainer
          item
          container
          xs={12}
          md={6}
          justify="center"
          alignItems="center"
        >
          <FormConfirmacaoDados
            cpf={cpf}
            setCpf={setCpf}
            loading={loading}
            handleAvancar={buscarTomadorPorCpf}
            formTitulo={configCE ? 'Faça sua simulação' : 'Faça seu login'}
          />
        </FormContainer>
        <Hidden smDown>
          <DetalhesDesktop />
        </Hidden>
      </ContainerStyled>
    </>
  );
}
/* eslint-disable react/forbid-prop-types */
ConfirmacaoDados.propTypes = {
  closeModalDataNascimento: PropTypes.func.isRequired,
  cpf: PropTypes.string.isRequired,
  dataNascimento: PropTypes.object,
  handleAvancar: PropTypes.func.isRequired,
  buscarTomadorPorCpf: PropTypes.func.isRequired,
  isOpenModalDataNascimento: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setCpf: PropTypes.func.isRequired,
  setDataNascimento: PropTypes.func.isRequired,
};

ConfirmacaoDados.defaultProps = {
  dataNascimento: undefined,
};
