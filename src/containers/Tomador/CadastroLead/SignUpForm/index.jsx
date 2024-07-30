import React, { useState } from 'react';

import Negociacao from 'commons/resources/negociacao';
import FormCadastroLead from 'components/QueroEmprestimo/FormCadastroLead';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

export default function SignUpForm({ cpf, setDadosCliente }) {
  const [loading, setLoading] = useState(false);
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  const cadastrar = async ({
    nomeCliente,
    celularCliente,
    nomeEmpresa,
    nomeResponsavelRhEmpresa,
    telefoneEmpresa,
    emailEmpresa,
    qtdFuncionariosEmpresa,
    ufEmpresa,
  }) => {
    try {
      setLoading(true);
      const dadosClienteFinal = {
        nomeCliente,
        cpfCliente: cpf,
        celularCliente,
        nomeEmpresa,
        nomeResponsavelRhEmpresa,
        telefoneEmpresa,
        emailEmpresa,
        qtdFuncionariosEmpresa,
        ufEmpresa,
        tipoLead: 'TOMADOR',
      };
      await Negociacao.cadastrarLead(dadosClienteFinal);
      setLoading(false);
      setDadosCliente({ ...dadosClienteFinal, cadastroConcluido: true });
    } catch (err) {
      const msg = err.erro
        ? err.erro
        : 'Não foi possível realizar o cadastro, tente novamente mais tarde';
      exibirAlerta(msg, 'error');
      setLoading(false);
    }
  };

  return <FormCadastroLead cadastrar={cadastrar} loading={loading} cpf={cpf} />;
}

SignUpForm.propTypes = {
  setDadosCliente: PropTypes.func.isRequired,
};
