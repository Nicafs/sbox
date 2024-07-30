import React, { useEffect, useState } from 'react';

import FormCadastroPessoa from 'components/FormCadastroPessoa';
import { useAppGlobal } from 'providers/AppGlobal';

import { getOrganizacaoWhitelabel } from '~/commons/utils';

const SignUpForm = ({
  autenticacaoLoading,
  autenticar,
  cadastrarInvestidor,
  erroCadastroInvestidor,
  loadingCadastroInvestidor,
  retornoCadastroInvestidor,
  handleMudancaTela,
}) => {
  const [dadosFormulario, setDadosFormulario] = useState({});
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();

  useEffect(() => {
    if (erroCadastroInvestidor) {
      console.error(erroCadastroInvestidor);
      exibirAlerta(
        'Ocorreu um erro ao realizar o cadastro, tente novamente mais tarde!',
      );
    }
  }, [erroCadastroInvestidor]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (retornoCadastroInvestidor && retornoCadastroInvestidor.id) {
      exibirAlerta('Cadastro realizado com sucesso!', 'success');
      const { cpf, senha } = dadosFormulario;
      autenticar({ documento: cpf, senha, cnpjOrganizacao });
    }
  }, [retornoCadastroInvestidor]); // eslint-disable-line react-hooks/exhaustive-deps

  const cadastrar = async dadosForm => {
    setDadosFormulario(dadosForm);
    const { nome, email, cpf, senha } = dadosForm;
    cadastrarInvestidor({
      nome,
      email,
      documento: cpf,
      senha,
      cnpjOrganizacao,
    });
  };

  return (
    <FormCadastroPessoa
      cadastrar={cadastrar}
      loading={loadingCadastroInvestidor || autenticacaoLoading}
      handleMudancaTela={handleMudancaTela}
    />
  );
};

export default SignUpForm;
