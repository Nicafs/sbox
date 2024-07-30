import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';
import { useAppGlobal } from 'providers/AppGlobal';

import { useAuth, useCreditoExpress } from '@credito-express/ce-components';

import pushRota from '~/routes/push';

import Pessoa from '~/commons/resources/pessoa';
import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';
import { getOrganizacaoWhitelabel } from '~/commons/utils';
import { onlyNumbers } from '~/commons/utils/ManipulacaoUtils';
import Yup from '~/commons/Yup';

import FormularioPublicoContainer from '~/layouts/FormularioPublicoContainer';

import DetalheMobile from '~/components/Auth/DetalheMobile';
import ModalCelularLogin from '~/components/ModalCelularLogin';
import ModalDataNascimento from '~/components/ModalDataNascimento';
import ModalNomeMae from '~/components/ModalNomeMae';
import ModalSenha from '~/components/ModalSenha';
import DetalhesDesktop from '~/components/SolicitacaoEmprestimo/ConfirmacaoDados/DetalhesDesktop';
import FormConfirmacaoDados from '~/components/SolicitacaoEmprestimo/ConfirmacaoDados/FormConfirmacaoDados';
import VerificaAceiteTermosDeUso from '~/components/VerificaAceiteTermosDeUso';

const SignInSchema = Yup.object().shape({
  cpf: Yup.string().validaCpf('CPF inválido').required('CPF obrigatório'),
  dataNascimento: Yup.date().typeError('Data de nascimento inválida'),
  // .required('Data de nascimento obrigatória'),
});

export default function ConfirmacaoECP() {
  const [leadLoading, setLeadLoading] = useState(false);
  const [loadingCelular, setLoadingCelular] = useState(false);

  const {
    state: { pessoa: pessoaDoContexto },
    dispatch,
  } = useCreditoExpress();

  const {
    pessoa: pessoaAutenticada,
    organizacao,
    autenticar,
    loading,
    possuiSenha,
    erro,
    necessarioEnviarNomeDaMae,
    necessarioAceitarTermos,
    buscarPessoa,
    usuarioFirebase,
    erroValidacaoNomeDaMae,
  } = useAuth({}) || {};

  const {
    actions: { exibirAlerta },
    organizacao: { tipoFluxoEcp },
  } = useAppGlobal();

  const configCE = tipoFluxoEcp === 'P2P';

  const location = useLocation();

  const [state, { etapaAutenticacao }] = useSimulacaoState();
  const { tokenData = {}, cpfBuscado } = state;
  const {
    taxaJuros = 0,
    dataExpiracao,
    codigoConfirmacaoEmail,
    token,
    origem,
  } = tokenData;

  const [cpf, setCpf] = useState(cpfBuscado || '');
  const [dataNascimento, setDataNascimento] = useState(null);
  const [, setSenha] = useState('');
  const [, setNomeMae] = useState('');
  const [modalDataAberto, setModalDataAberto] = useState(false);
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [modalNomeMaeAberto, setModalNomeMaeAberto] = useState(false);
  const [modalCelularAberto, setModalCelularAberto] = useState(false);

  useEffect(() => {
    if (pessoaAutenticada && pessoaAutenticada.id) {
      if (!pessoaDoContexto.id) {
        dispatch({
          type: 'ATUALIZAR_DADOS_AUTENTICACAO',
          payload: {
            pessoa: pessoaAutenticada,
            organizacao,
            usuarioFirebase,
          },
        });
      }
    }
  }, [pessoaAutenticada]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pessoaDoContexto.id) {
      if (!pessoaDoContexto.celular) {
        setModalCelularAberto(true);
      } else {
        const { from } = location.state || '';
        if (from) {
          pushRota(from);
        } else {
          etapaAutenticacao(tokenData);
        }
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

  const getTokenValido = () => {
    if (origem === 'CHAT') {
      return undefined;
    }
    return token;
  };

  async function validarCpf() {
    try {
      SignInSchema.validateSyncAt('cpf', { cpf });
      if (!modalDataAberto) {
        if (!token) {
          try {
            setLeadLoading(true);
            const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();
            const {
              possuiSenha: tomadorSenha,
              rpa,
            } = await Pessoa.buscarTomadorPorCpf(
              onlyNumbers(cpf),
              cnpjOrganizacao,
            );
            if (!rpa) {
              const currentVersion =
                window.localStorage.getItem('appVersion') || '';
              localStorage.clear();
              sessionStorage.clear();
              window.localStorage.setItem('appVersion', currentVersion);
              document.cookie = '__session=api';
              window.location.replace('/login');
              return;
            }
            if (tomadorSenha) {
              setModalSenhaAberto(true);
            } else {
              setModalDataAberto(true);
            }
          } catch (err) {
            const descricaoErroApi = err.erro;
            const msgErro = `Cliente não está cadastrado no sistema. ${
              descricaoErroApi || `Erro inesperado:${err}`
            }`;
            if (err.status === 404) {
              pushRota({ pathname: '/lead', state: { cpf } });
            } else {
              exibirAlerta(msgErro, 'error');
            }
          } finally {
            setLeadLoading(false);
          }
        } else {
          setModalDataAberto(true);
        }
        return false;
      }
    } catch (err) {
      exibirAlerta(err.message);
      return false;
    }
    return true;
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

  async function inputCpfAvancarHandler() {
    validarCpf();
  }
  const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();
  async function modalAvancarHandler({
    dataNascimento: modalDataNascimento,
    nomeMae: modalNomeMae,
    senha: modalSenha,
  }) {
    if (modalDataNascimento) {
      const dataNascimentoValida = validarDataNascimento(modalDataNascimento);
      if (!dataNascimentoValida) {
        return;
      }
      setDataNascimento(modalDataNascimento);
      const dataFormatada = transformarDataApiParaDataLocal(
        modalDataNascimento,
      ).format('DD/MM/YYYY');
      return autenticar({
        documento: cpf,
        dataNascimento: dataFormatada,
        token: getTokenValido(),
        cnpjOrganizacao,
      });
    }

    if (modalNomeMae) {
      setNomeMae(modalNomeMae);
      const dataFormatada = transformarDataApiParaDataLocal(
        dataNascimento,
      ).format('DD/MM/YYYY');
      const authData = {
        documento: cpf,
        dataNascimento: dataFormatada,
        token: getTokenValido(),
        cnpjOrganizacao,
        nomeMae: modalNomeMae,
      };
      return autenticar(authData);
    }
    setSenha(modalSenha);
    setModalSenhaAberto(false);
    return autenticar({
      documento: cpf,
      senha: modalSenha,
      cnpjOrganizacao,
      token: getTokenValido(),
    });
  }

  const modalCelularAvancarHandler = async modalCelular => {
    try {
      setLoadingCelular(true);
      await Pessoa.primeiroLogin(modalCelular);
    } catch (err) {
      console.error('Ocorreu um erro ao persistir celular', err);
    } finally {
      setLoadingCelular(false);
    }

    etapaAutenticacao(tokenData);
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
      {!pessoaAutenticada && necessarioAceitarTermos && (
        <VerificaAceiteTermosDeUso btnAceitoClickHandler={buscarPessoa} />
      )}
      <ModalDataNascimento
        open={modalDataAberto}
        dismissHandler={() => setModalDataAberto(false)}
        handleAvancar={modalAvancarHandler}
        loading={loading}
        formTitulo={tituloDataNascimento}
      />
      <ModalNomeMae
        open={modalNomeMaeAberto}
        dismissHandler={() => setModalNomeMaeAberto(false)}
        handleAvancar={modalAvancarHandler}
        loading={loading}
        formTitulo={tituloNomeMae}
      />
      <ModalSenha
        open={modalSenhaAberto}
        dismissHandler={() => setModalSenhaAberto(false)}
        handleAvancar={modalAvancarHandler}
        loading={loading}
      />
      <ModalCelularLogin
        open={modalCelularAberto}
        dismissHandler={() => setModalCelularAberto(false)}
        handleAvancar={modalCelularAvancarHandler}
        loading={loadingCelular}
        formTitulo="Informe seu celular para contato"
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
            loading={loading || leadLoading || loadingCelular}
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
