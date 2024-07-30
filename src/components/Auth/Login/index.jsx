import React from 'react';

import SignInForm from '../../../containers/Auth/Login/SignInForm';
import SignUpForm from '../../../containers/Auth/Login/SignUpForm';
import { FormContainerStyled } from '../../../containers/Auth/Login/style';
import FormularioPublicoContainer from '../../../layouts/FormularioPublicoContainer';
import pushRota from '../../../routes/push';
import DetalheDesktop from '../DetalheDesktop';
import DetalheMobile from '../DetalheMobile';

const Login = ({
  telaSelecionada,
  handleMudancaTela,
  pessoa,
  cadastroClickHandler,
  autenticacaoLoading,
  autenticar,
  cadastrarInvestidor,
  erroCadastroInvestidor,
  loadingCadastroInvestidor,
  retornoCadastroInvestidor,
}) => {
  const renderTelaSelecionada = () => {
    switch (telaSelecionada) {
      case 1:
        return (
          <SignInForm
            autenticacaoLoading={autenticacaoLoading}
            autenticar={autenticar}
            cadastroClickHandler={cadastroClickHandler}
          />
        );
      case 2:
        return (
          <SignUpForm
            autenticacaoLoading={autenticacaoLoading}
            autenticar={autenticar}
            cadastrarInvestidor={cadastrarInvestidor}
            erroCadastroInvestidor={erroCadastroInvestidor}
            loadingCadastroInvestidor={loadingCadastroInvestidor}
            retornoCadastroInvestidor={retornoCadastroInvestidor}
            pessoa={pessoa}
            handleMudancaTela={handleMudancaTela}
          />
        );
      default:
        return (
          <SignInForm
            cadastroClickHandler={cadastroClickHandler}
            autenticacaoLoading={autenticacaoLoading}
            autenticar={autenticar}
          />
        );
    }
  };

  const btnBackClickHandler = () => pushRota('/');

  return (
    <FormularioPublicoContainer
      headerMobile={<DetalheMobile btnBackClickHandler={btnBackClickHandler} />}
      formulario={
        <FormContainerStyled>{renderTelaSelecionada()}</FormContainerStyled>
      }
      backgroundConteudo={<DetalheDesktop />}
      btnBackClickHandler={btnBackClickHandler}
    />
  );
};

export default Login;
