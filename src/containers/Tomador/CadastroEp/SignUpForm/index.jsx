import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import { useAuth, useCreditoExpress } from '@credito-express/ce-components';

import Pessoa from '~/commons/resources/pessoa';
import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';
import { getOrganizacaoWhitelabel } from '~/commons/utils';

import FormCadastroEp from '~/components/QueroEmprestimo/FormCadastroEp';
import ModalAceiteTermosDeUso from '~/components/VerificaAceiteTermosDeUso/ModalAceiteTermosDeUso';

export default function SignUpForm({
  cpf,
  celular,
  etapaAutenticacaoEP,
  voltar,
  setOrganizacao,
}) {
  const {
    organizacao: organizacaoAuth,
    autenticarComCustomToken,
    pessoa: pessoaAutenticada,
    usuarioFirebase,
  } = useAuth({}) || {};

  const {
    organizacao: { id: idOrganizacao },
    actions: { exibirAlerta, carregarTema },
  } = useAppGlobal();
  const {
    state: { pessoa: pessoaDoContexto },
    dispatch,
  } = useCreditoExpress();
  const [loading, setLoading] = useState(false);
  const [necessarioAceitarTermos, setNecessarioAceitarTermos] = useState(false);
  const [values, setValues] = useState({});

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
      etapaAutenticacaoEP({
        tokenData: { pessoa: pessoaDoContexto },
      });
    }
  }, [pessoaDoContexto]); // eslint-disable-line react-hooks/exhaustive-deps

  const cadastrar = async ({
    nome,
    nomeMae,
    dataNascimento,
    ocupacaoProfissional,
  }) => {
    setLoading(true);
    try {
      const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();

      const dadosPessoa = {
        documento: cpf,
        dataNascimento: transformarDataApiParaDataLocal(dataNascimento).format(
          'YYYY-MM-DD',
        ),
        nome,
        nomeMae,
        celular,
        ocupacaoProfissional,
        cnpjOrganizacao,
      };

      const pessoaEP = await Pessoa.loginEP(dadosPessoa);

      await autenticarComCustomToken(pessoaEP.customToken);
    } catch (err) {
      console.error('error:', err);

      setLoading(false);
      exibirAlerta(err.erro, 'error');
    }
  };

  return (
    <>
      <ModalAceiteTermosDeUso
        open={necessarioAceitarTermos}
        btnAvancarClickHandler={() => {
          cadastrar(values);
          setNecessarioAceitarTermos(false);
        }}
      />
      <FormCadastroEp
        setValues={setValues}
        setNecessarioAceitarTermos={setNecessarioAceitarTermos}
        voltar={voltar}
        cpf={cpf}
        celular={celular}
        loading={loading}
        idOrganizacao={idOrganizacao}
      />
    </>
  );
}

SignUpForm.propTypes = {
  cpf: PropTypes.string.isRequired,
  celular: PropTypes.string.isRequired,
};
