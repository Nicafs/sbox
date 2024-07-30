import React, { useEffect } from 'react';

import Yup from 'commons/Yup';
import CadastroSenha from 'components/SolicitacaoEmprestimo/CadastroSenha';
import { useFormik } from 'formik';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

export default function CadastroSenhaContainer() {
  const firebase = useFirebase();
  const [state, { etapaCriarSenha }] = useSimulacaoState();
  const { calculoEmprestimo: { jurosAoMes } = {} } = state;
  const {
    state: {
      organizacao,
      pessoa: { possuiSenhaFirebase = false },
    },
  } = useCreditoExpress();

  const taxaJuros = jurosAoMes;

  const YupSchema = Yup.object().shape({
    senha: Yup.string()
      .min(8)
      .required('Senha obrigatória')
      .matches(
        /^.*(?=.{8,})(?=.*\d.*\d)((?=.*[a-zA-Z]){1}).*$/,
        'A senha deve ter 8 ou mais caracteres contendo pelo menos 2 números e 1 letra',
      ),
    senha2: Yup.string()
      .oneOf([Yup.ref('senha')], 'Senhas não conferem')
      .required('Confirmação de senha obrigatória'),
  });

  const formik = useFormik({
    initialValues: {
      senha: '',
      senha2: '',
    },
    validate: () => {},
    validationSchema: YupSchema,
    onSubmit: submit,
    enableReinitialize: true,
  });

  async function submit({ senha }) {
    etapaCriarSenha(senha);
  }

  useEffect(() => {
    firebase.analytics().logEvent('acessou_cadastro_senha');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <CadastroSenha
        formik={formik}
        organizacao={organizacao}
        disableForm={possuiSenhaFirebase}
        taxaJuros={taxaJuros}
      />
    </>
  );
}
