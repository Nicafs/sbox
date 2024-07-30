import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import Pessoa from 'commons/resources/pessoa';
import { transformarDataApiParaDataLocal } from 'commons/tratativasParaDatasApi';
import { onlyNumbers } from 'commons/utils/ManipulacaoUtils';
import Yup from 'commons/Yup';
import DetalheMobile from 'components/Auth/DetalheMobile';
import ModalCelularLoginEP from 'components/ModalCelularLoginEP';
import ModalDataNascimento from 'components/ModalDataNascimento';
import ModalNomeMae from 'components/ModalNomeMae';
import ModalSenha from 'components/ModalSenha';
import DetalhesDesktop from 'components/SolicitacaoEmprestimo/ConfirmacaoDados/DetalhesDesktop';
import FormConfirmacaoDados from 'components/SolicitacaoEmprestimo/ConfirmacaoDados/FormConfirmacaoDados';
import FormularioPublicoContainer from 'layouts/FormularioPublicoContainer';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';
import { useAppGlobal } from 'providers/AppGlobal';
import pushRota from 'routes/push';

import { useAuth, useCreditoExpress } from '@credito-express/ce-components';

import { getOrganizacaoWhitelabel } from '~/commons/utils';

const SignInSchema = Yup.object().shape({
  cpf: Yup.string().validaCpf('CPF inválido').required('CPF obrigatório'),
  dataNascimento: Yup.date()
    .typeError('Data de nascimento inválida')
    .required('Data de nascimento obrigatória'),
  nomeCompleto: Yup.string().required('O Nome precisa ser o mesmo do seu RG'),
});

export default function ConfirmacaoEP() {
  const [leadLoading, setLeadLoading] = useState(false);
  const {
    state: { pessoa: pessoaDoContexto },
    dispatch,
  } = useCreditoExpress();
  const {
    organizacao: { tipoFluxoEp },
    actions: { exibirAlerta, carregarTema },
  } = useAppGlobal();

  const configCE = tipoFluxoEp !== 'BANCO_SEMEAR';

  const {
    organizacao: organizacaoAuth,
    usuarioFirebase,
    autenticar,
    possuiSenha,
    loading,
    pessoa: pessoaAutenticada,
    erro,
    erroValidacaoNomeDaMae,
    necessarioEnviarNomeDaMae,
  } = useAuth({}) || {};

  const [
    state,
    { etapaAutenticacaoEP, etapaCadastroEP, setOrganizacao },
  ] = useSimulacaoState();
  const { tokenData = {}, cpfBuscado } = state;

  const location = useLocation();

  const {
    taxaJuros = 0,
    dataExpiracao,
    origem,
    token,
    codigoConfirmacaoEmail,
  } = tokenData;

  const [cpf, setCpf] = useState(cpfBuscado || '');
  const [dataNascimento, setDataNascimento] = useState(null);
  const [, setNomeMae] = useState('');

  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [modalCelularAberto, setModalCelularAberto] = useState(false);
  const [modalDataAberto, setModalDataAberto] = useState(false);
  const [modalNomeMaeAberto, setModalNomeMaeAberto] = useState(false);

  useEffect(() => {
    if (pessoaAutenticada && pessoaAutenticada.id) {
      if (!pessoaDoContexto.id) {
        dispatch({
          type: 'ATUALIZAR_DADOS_AUTENTICACAO',
          payload: {
            pessoa: pessoaAutenticada,
            organizacao: organizacaoAuth,
            usuarioFirebase,
          },
        });
        setOrganizacao(organizacaoAuth);
        carregarTema(organizacaoAuth);
      }
    }
  }, [pessoaAutenticada]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pessoaDoContexto.id) {
      const { from } = location.state || '';
      if (from) {
        pushRota(from);
      } else {
        etapaAutenticacaoEP({
          tokenData: { pessoa: pessoaDoContexto },
        });
      }
    }
  }, [pessoaDoContexto]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (erro || erroValidacaoNomeDaMae) {
      const getMsgErro = () => {
        if (erroValidacaoNomeDaMae) {
          return 'Nome da mãe incorreto, informe da mesma forma que aparece no documento';
        }

        return typeof erro === 'string' ? erro : 'Acesso negado';
      };

      if (erro && !necessarioEnviarNomeDaMae) {
        exibirAlerta(getMsgErro(), 'error');
      }
    }
  }, [erro, erroValidacaoNomeDaMae]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (possuiSenha) {
      setModalSenhaAberto(true);
    }
  }, [possuiSenha]);

  useEffect(() => {
    if (necessarioEnviarNomeDaMae) {
      setModalDataAberto(false);
      setModalNomeMaeAberto(true);
    }
  }, [necessarioEnviarNomeDaMae]); // eslint-disable-line react-hooks/exhaustive-deps

  async function inputCpfAvancarHandler() {
    try {
      SignInSchema.validateSyncAt('cpf', { cpf });
      try {
        setLeadLoading(true);
        const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();
        const { possuiSenha: tomadorSenha } = await Pessoa.buscarTomadorPorCpf(
          onlyNumbers(cpf),
          cnpjOrganizacao,
        );
        if (tomadorSenha) {
          setModalSenhaAberto(true);
        } else {
          setModalDataAberto(true);
        }
      } catch (err) {
        setModalCelularAberto(true);
      }
    } catch (err) {
      exibirAlerta(err.message);
      return false;
    }
    setLeadLoading(false);
  }

  const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();
  async function modalDataNascimentoAvancarHandler({
    dataNascimento: dtnModal,
  }) {
    const dataNascimentoValida = validarDataNascimento(dtnModal);
    if (!dataNascimentoValida) {
      return;
    }

    setDataNascimento(dtnModal);

    const dataFormatada = transformarDataApiParaDataLocal(dtnModal).format(
      'YYYY-MM-DD',
    );

    return autenticar({
      documento: cpf,
      dataNascimento: dataFormatada,
      token: origem === 'CHAT' ? undefined : token,
      cnpjOrganizacao,
    });
  }

  async function modalSenhaAvancarHandler({ senha: modalSenha }) {
    setModalSenhaAberto(false);
    return autenticar({ documento: cpf, senha: modalSenha, cnpjOrganizacao });
  }

  async function modalNomeMaeAvancarHandler({ nomeMae: modalNomeMae }) {
    setNomeMae(modalNomeMae);
    const dataFormatada = transformarDataApiParaDataLocal(
      dataNascimento,
    ).format('DD/MM/YYYY');
    const authData = {
      documento: cpf,
      dataNascimento: dataFormatada,
      token: origem === 'CHAT' ? undefined : token,
      cnpjOrganizacao,
      nomeMae: modalNomeMae,
    };

    return autenticar(authData);
  }

  function validarDataNascimento(paramDataNasc) {
    try {
      SignInSchema.validateSyncAt('dataNascimento', {
        dataNascimento: paramDataNasc,
      });
    } catch (err) {
      exibirAlerta(err.message, 'error');
      return false;
    }
    return true;
  }

  const modalCelularAvancarHandler = modalCelular => {
    setModalCelularAberto(false);
    etapaCadastroEP({ cpf, celular: modalCelular });
  };

  const btnBackClickHandler = () => pushRota('/');

  const getFormTitulo = () => {
    return codigoConfirmacaoEmail
      ? {
          tituloConfirmaDados: 'Informe seu CPF para confirmar o e-mail',
          tituloDataNascimento:
            'Informe sua data de nascimento para confirmar o e-mail',
          tituloNomeMae: 'Informe o nome da sua mãe para confirmar o e-mail',
        }
      : {
          tituloConfirmaDados: configCE
            ? 'Faça sua simulação'
            : 'Faça seu login',
          tituloDataNascimento: 'Qual sua data de nascimento?',
          tituloNomeMae: 'Digite o nome completo da sua mãe',
        };
  };

  const {
    tituloConfirmaDados,
    tituloDataNascimento,
    tituloNomeMae,
  } = getFormTitulo();

  return (
    <>
      <ModalCelularLoginEP
        open={modalCelularAberto}
        handleAvancar={modalCelularAvancarHandler}
        dismissHandler={() => setModalCelularAberto(false)}
      />

      <ModalDataNascimento
        open={modalDataAberto}
        dismissHandler={() => setModalDataAberto(false)}
        handleAvancar={modalDataNascimentoAvancarHandler}
        loading={loading}
        formTitulo={tituloDataNascimento}
      />

      <ModalNomeMae
        open={modalNomeMaeAberto}
        dismissHandler={() => setModalNomeMaeAberto(false)}
        handleAvancar={modalNomeMaeAvancarHandler}
        loading={loading}
        formTitulo={tituloNomeMae}
      />

      <ModalSenha
        open={modalSenhaAberto}
        dismissHandler={() => setModalSenhaAberto(false)}
        handleAvancar={modalSenhaAvancarHandler}
        loading={loading}
      />

      <FormularioPublicoContainer
        headerMobile={
          <DetalheMobile
            btnBackClickHandler={configCE ? btnBackClickHandler : null}
          />
        }
        formulario={
          <FormConfirmacaoDados
            cpf={cpf}
            setCpf={setCpf}
            loading={loading || leadLoading}
            handleAvancar={inputCpfAvancarHandler}
            dataExpiracao={dataExpiracao}
            formTitulo={tituloConfirmaDados}
            textoBotao={configCE ? 'Simule e Compare!' : 'Entrar'}
          />
        }
        backgroundConteudo={
          <DetalhesDesktop
            dataExpiracao={dataExpiracao}
            taxaJuros={taxaJuros}
          />
        }
        btnBackClickHandler={configCE ? () => pushRota('/') : null}
      />
    </>
  );
}
