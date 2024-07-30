import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import pushRota from 'routes/push';

import { useAuth, useCreditoExpress } from '@credito-express/ce-components';

import Login from '../../../components/Auth/Login';
import VerificaAceiteTermosDeUso from '../../../components/VerificaAceiteTermosDeUso';
import { useLocation } from 'react-router';

function Auth({ cadastroInvestidorEstaDisponivelApi }) {
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const {
    state: { pessoa: pessoaDoContexto },
    dispatch,
  } = useCreditoExpress();
  const {
    organizacao,
    pessoa: pessoaAutenticada,
    usuarioFirebase,
    autenticar,
    erro,
    loading,
    cadastrarInvestidor,
    erroCadastroInvestidor,
    loadingCadastroInvestidor,
    retornoCadastroInvestidor,
    necessarioAceitarTermos,
    buscarPessoa,
  } = useAuth({});
  const location = useLocation();
  const pessoa = Object.keys(pessoaDoContexto).length
    ? pessoaDoContexto
    : pessoaAutenticada;
  const [telaSelecionada, setTelaselecionada] = useState(1);
  const [
    cadastroInvestidorDisponivel,
    setCadastroInvestidorDisponivel,
  ] = useState(false);

  useEffect(() => {
    verificarSeCadastroEstaDisponivel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (erro) {
      exibirAlerta(erro);
    }
  }, [erro]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pessoa) {
      persistePessoaNoContexto(pessoa);
      const { perfilInvestidor, perfilTomador, perfilTomadorEp } = pessoa;
      if (perfilInvestidor) {
        pushRota('/investidor/boas-vindas');
      } else if (perfilTomador || perfilTomadorEp) {
        const { from } = location.state || '';
        if (from) {
          pushRota(from);
        } else {
          pushRota('/meus-emprestimos');
        }
      }
    }
  }, [pessoa]); // eslint-disable-line react-hooks/exhaustive-deps

  const persistePessoaNoContexto = pessoaObj => {
    if (!Object.keys(pessoaDoContexto).length) {
      dispatch({
        type: 'ATUALIZAR_DADOS_AUTENTICACAO',
        payload: {
          pessoa: pessoaObj,
          organizacao,
          usuarioFirebase,
        },
      });
    }
  };

  const verificarSeCadastroEstaDisponivel = async () => {
    const disponibilidade = await cadastroInvestidorEstaDisponivelApi();
    setCadastroInvestidorDisponivel(disponibilidade);
  };
  const cadastroClickHandler = () => {
    if (cadastroInvestidorDisponivel) {
      setTelaselecionada(2);
    } else {
      pushRota('/quero-investir');
    }
  };
  const handleMudancaTela = id => {
    if (telaSelecionada === id) {
      return;
    }
    setTelaselecionada(id);
  };

  return (
    <>
      {necessarioAceitarTermos && (
        <VerificaAceiteTermosDeUso btnAceitoClickHandler={buscarPessoa} />
      )}
      <Login
        telaSelecionada={telaSelecionada}
        handleMudancaTela={handleMudancaTela}
        pessoa={pessoa}
        cadastroClickHandler={cadastroClickHandler}
        autenticar={autenticar}
        autenticacaoLoading={loading}
        cadastrarInvestidor={cadastrarInvestidor}
        erroCadastroInvestidor={erroCadastroInvestidor}
        loadingCadastroInvestidor={loadingCadastroInvestidor}
        retornoCadastroInvestidor={retornoCadastroInvestidor}
      />
    </>
  );
}

Auth.propTypes = {
  cadastroInvestidorEstaDisponivelApi: PropTypes.func.isRequired,
};

export default Auth;
