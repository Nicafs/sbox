import React, { useEffect, useRef } from 'react';

import { gerarValorInicialCampoAdicional } from 'commons/utils/camposPersonalizadosUtil';
import { useFormik } from 'formik';
import { useSimulacaoState } from 'pages/Tomador/SolicitacaoEmprestimo/state';

import { useCreditoExpress, useFirebase } from '@credito-express/ce-components';

import FooterMobileSolicitacaoEmprestimo from '../../../../components/FooterMobileSolicitacaoEmprestimo';
import ModalValidaContato from '../../../../components/ModalValidaContato';
import CadastroContatos from '../../../../components/SolicitacaoEmprestimo/CadastroContatos';
import { gerarSchema, defaultSchema, modalSchema } from './schema';

export default function CadastroContatosContainer({ atualizarDadosLocal }) {
  const firebase = useFirebase();
  const [
    {
      pessoa,
      organizacao: { camposPersonalizados } = {},
      camposAdicionais: valoresCamposAdicionais,
      confirmacaoContato: { modal },
      calculoEmprestimo: { jurosAoMes } = {},
    },
    { etapaContato },
  ] = useSimulacaoState();
  const {
    state: { organizacao },
  } = useCreditoExpress();
  const { celular, email, emailCorporativo } = pessoa;
  const taxaJuros = jurosAoMes;
  const camposPadrao =
    camposPersonalizados &&
    camposPersonalizados.contato &&
    camposPersonalizados.contato.length > 0
      ? camposPersonalizados.contato
          .map(campo => ({
            [campo.nome]: { ...campo },
          }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      : {};

  const camposAdicionais =
    camposPersonalizados &&
    camposPersonalizados.contatoAdicionais &&
    camposPersonalizados.contatoAdicionais.length > 0
      ? camposPersonalizados.contatoAdicionais
      : [];

  const schema = camposPersonalizados
    ? gerarSchema(camposPadrao, camposAdicionais, emailCorporativo)
    : defaultSchema(emailCorporativo);

  const formik = useFormik({
    initialValues: {
      email,
      celular,
      ...camposAdicionais
        .map(campo =>
          gerarValorInicialCampoAdicional(campo, valoresCamposAdicionais),
        )
        .reduce((a, b) => ({ ...a, ...b }), {}),
    },
    validate: () => {},
    validationSchema: modal.open ? modalSchema(emailCorporativo) : schema,
    onSubmit: etapaContato,
    enableReinitialize: true,
  });

  useEffect(() => {
    firebase.analytics().logEvent('acessou_cadastro_contatos');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const primeiroRender = useRef(true);
  useEffect(() => {
    if (primeiroRender.current) {
      primeiroRender.current = false;
      return;
    }
    atualizarDadosLocal({ pessoa: formik.values });
  }, [formik.values]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ModalValidaContato formik={formik} maxWidth="sm" />
      <CadastroContatos
        formik={formik}
        organizacao={organizacao}
        taxaJuros={taxaJuros}
      />
      <FooterMobileSolicitacaoEmprestimo
        getBotaoTexto={() => 'AVANÇAR'}
        getBotaoHabilitado={formik.isValid}
        handleNext={formik.submitForm}
      />
    </>
  );
}

CadastroContatosContainer.whyDidYouRender = true;
