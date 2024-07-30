import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const LogoEmpresa = styled.img`
  width: 256px;
  margin-top: 10px;
`;

const DetalhesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.black};
  p {
    text-align: center;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 1.5em;
  }
`;

const LogoContainer = styled.div`
  position: sticky;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function DetalhesDesktop({ logo, empresa, organizacao }) {
  const { nome: nomeEmpresa } = empresa;
  const { nome: nomeOrganizacao } = organizacao;
  return (
    <DetalhesContainer>
      <LogoContainer>
        <LogoEmpresa src={logo} />
        <p>
          Em uma parceria inédita entre{' '}
          {nomeEmpresa ? nomeEmpresa.toUpperCase() : 'Crédito Express'} e{' '}
          {nomeOrganizacao.toUpperCase()} conseguimos para você a melhor taxa do
          mercado
        </p>
      </LogoContainer>
    </DetalhesContainer>
  );
}

DetalhesDesktop.propTypes = {
  empresa: PropTypes.shape({ nome: PropTypes.string }).isRequired,
  logo: PropTypes.string.isRequired,
  organizacao: PropTypes.shape({ nome: PropTypes.string }).isRequired,
};
