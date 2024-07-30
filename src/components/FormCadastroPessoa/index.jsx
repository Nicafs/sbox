import React, { useState } from 'react';

import Pessoa from 'commons/resources/pessoa';
import { onlyNumbers } from 'commons/utils/ManipulacaoUtils';
import { cpfMask } from 'commons/utils/MaskHandle';
import Yup from 'commons/Yup';
import TextField from 'components/MaterialUI/TextField';
import ModalConfirmacao from 'components/ModalConfirmacao';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import pushRota from 'routes/push';

import { getOrganizacaoWhitelabel } from '~/commons/utils';

import { BotoesSubmit, Rodape } from '../Auth/Login/SignUpForm';
import FormikErrorMessage from '../FormikErrorMessage';
import { DivisoriaStyled, FormStyled, Titulo } from './style';

export default function FormCadastroPessoa({
  cadastrar,
  loading,
  handleMudancaTela,
}) {
  const [open, setOpen] = useState(false);
  const [cpfBuscado, setCpfBuscado] = useState();

  const CadastroSchema = Yup.object().shape({
    nome: Yup.string().required('Nome obrigatório'),
    cpf: Yup.string()
      .transform(value => value.replace(/\D/g, ''))
      .min(11, 'Documento deve ter ao menos 11 caracteres')
      .validarDocumento('Documento inválido')
      .required('CPF obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
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

  const valoresIniciais = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    senha2: '',
  };

  const verificarCpf = async cpf => {
    if (cpf !== cpfBuscado) {
      const { cnpj: cnpjOrganizacao } = getOrganizacaoWhitelabel();
      const returnCpf = await Pessoa.buscarTomadorPorCpf(
        onlyNumbers(cpf),
        cnpjOrganizacao,
      );
      if (returnCpf) {
        setCpfBuscado(cpf);
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    pushRota('/quero-emprestimo', { cpf: cpfBuscado });
  };

  const renderForm = setFieldValue => (
    <React.Fragment>
      <Titulo>Cadastre Agora</Titulo>
      <FormStyled noValidate>
        <Field
          as={TextField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cpf"
          label="CPF"
          name="cpf"
          autoComplete="cpf"
          onBlur={evt => verificarCpf(evt.target.value)}
          onChange={evt => setFieldValue('cpf', cpfMask(evt.target.value))}
          type="tel"
          autoFocus
        />
        <Field
          as={TextField}
          margin="normal"
          variant="outlined"
          required
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
        />
        <Field
          as={TextField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
        />
        <Field
          as={TextField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="senha"
          label="Senha"
          type="password"
          id="senha"
          autoComplete="current-password"
        />
        <Field
          as={TextField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="senha2"
          label="Confirme sua senha"
          type="password"
          id="senha2"
        />
        <BotoesSubmit cadastrar={cadastrar} loading={loading} />
        <DivisoriaStyled variant="fullWidth" />
        <Rodape handleMudancaTela={handleMudancaTela} />
      </FormStyled>

      <ModalConfirmacao
        open={open}
        handleClose={handleClose}
        name="ModalDirecionaUsuario"
        btnSucessoClickHandler={handleConfirm}
        btnCancelarClickHandler={handleClose}
        disableBackdropClick
        titulo="Iniciar Simulação"
        texto="Seu CPF já está cadastrado, você pode fazer uma simulação. Deseja fazer uma simulação agora?"
      />
    </React.Fragment>
  );

  const renderErros = () => (
    <>
      <ErrorMessage name="nome" component={FormikErrorMessage} />
      <ErrorMessage name="cpf" component={FormikErrorMessage} />
      <ErrorMessage name="email" component={FormikErrorMessage} />
      <ErrorMessage name="senha" component={FormikErrorMessage} />
      <ErrorMessage name="senha2" component={FormikErrorMessage} />
    </>
  );

  return (
    <Formik
      initialValues={valoresIniciais}
      validationSchema={CadastroSchema}
      onSubmit={values => {
        cadastrar({ ...values });
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          {renderErros()}
          {renderForm(setFieldValue)}
        </Form>
      )}
    </Formik>
  );
}
