import React, { useState } from 'react';

import { useFormik } from 'formik';

import Background from '../../../components/LeadInvestidor/Background';
import FormCadastro from '../../../components/LeadInvestidor/FormCadastro';
import FormularioPublicoContainer from '../../../layouts/FormularioPublicoContainer';
import { useAppGlobal } from '../../../providers/AppGlobal';
import YupSchema from './schema';

const LeadInvestidor = ({ persistirLead }) => {
  const [leadCadastradoComSucesso, setLeadCadastradoComSucesso] = useState(
    false,
  );
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  const persistirLeadWrapper = async (values, { setSubmitting }) => {
    try {
      await persistirLead(values);
      exibirAlerta(
        'Cadastro realizado com sucesso! Em breve entraremos em contato',
        'success',
      );
      setLeadCadastradoComSucesso(true);
    } catch (e) {
      console.error(e);
      const { erro } = e;
      const msg =
        erro ||
        'Não foi possível realizar o seu cadastro, tente novamente mais tarde';
      exibirAlerta(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      nome: '',
      celular: '',
      cpf: '',
    },
    onSubmit: persistirLeadWrapper,
    validationSchema: YupSchema,
  });

  return (
    <FormularioPublicoContainer
      headerMobile={<span />}
      formulario={
        <FormCadastro
          formik={formik}
          leadCadastradoComSucesso={leadCadastradoComSucesso}
        />
      }
      backgroundConteudo={<Background />}
    />
  );
};

export default LeadInvestidor;
