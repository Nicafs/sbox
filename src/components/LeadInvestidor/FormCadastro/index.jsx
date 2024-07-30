import React, { useState } from 'react';

import Pessoa from 'commons/resources/pessoa';
import { onlyNumbers } from 'commons/utils/ManipulacaoUtils';
import ModalConfirmacao from 'components/ModalConfirmacao';

import { celularMask, cpfMask } from '../../../commons/utils/MaskHandle';
import pushRota from '../../../routes/push';
import Button from '../../MaterialUI/Button';
import FormControl from '../../MaterialUI/FormControl';
import Grid from '../../MaterialUI/Grid';
import InputLabel from '../../MaterialUI/InputLabel';
import TextField from '../../MaterialUI/TextField';
import Typography from '../../MaterialUI/Typography';
import MensagemLeadCadastradoSucesso from './MensagemLeadCadastradoSucesso';
import { GridContainerStyled } from './style';
import { getOrganizacaoWhitelabel } from '~/commons/utils';

const FormCadastro = ({ formik, leadCadastradoComSucesso }) => {
  const [open, setOpen] = useState(false);
  const [cpfBuscado, setCpfBuscado] = useState();

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    isValid,
    isSubmitting,
    handleSubmit,
  } = formik;

  const voltarClickHandle = () => pushRota('/');

  if (leadCadastradoComSucesso) {
    return (
      <MensagemLeadCadastradoSucesso voltarClickHandle={voltarClickHandle} />
    );
  }

  const verificarCpf = async cpf => {
    if (cpf && cpf.length >= 13 && cpf !== cpfBuscado) {
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

  return (
    <GridContainerStyled container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h3" color="primary">
          Cadastro
        </Typography>
        <Typography variant="subtitle1">
          Cadastre-se e entraremos em contato.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Informe seu CPF</InputLabel>
              <TextField
                cy-element="inputCPF"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoFocus
                onChange={handleChange}
                onBlur={evt => {
                  verificarCpf(evt.target.value);
                  handleBlur(evt);
                }}
                value={cpfMask(values.cpf)}
                error={errors.cpf && touched.cpf}
                helperText={errors.cpf}
                type="tel"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Qual seu nome?</InputLabel>
              <TextField
                cy-element="inputNome"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nome}
                error={errors.nome && touched.nome}
                helperText={errors.nome}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Informe o número do seu celular</InputLabel>
              <TextField
                cy-element="inputCelular"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="celular"
                label="Celular"
                name="celular"
                onChange={handleChange}
                onBlur={handleBlur}
                value={celularMask(values.celular)}
                error={errors.celular && touched.celular}
                helperText={errors.celular}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item xs={12} md={3}>
            <Button
              cy-element="btnSubmit"
              outlinePrimary
              onClick={voltarClickHandle}
              loading={false}
              rounded
              fullWidth
              type="submit"
            >
              Voltar
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              cy-element="btnSubmit"
              primary="true"
              onClick={handleSubmit}
              loading={isSubmitting}
              rounded
              fullWidth
              disabled={!values.nome || !isValid || isSubmitting}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <ModalConfirmacao
        open={open}
        handleClose={handleClose}
        name="ModalDirecionaUsuario"
        disableBackdropClick
        btnSucessoClickHandler={handleConfirm}
        btnCancelarClickHandler={handleClose}
        titulo="Iniciar Simulação"
        texto="Seu CPF já está cadastrado, você pode fazer uma simulação. Deseja fazer uma simulação agora?"
      />
    </GridContainerStyled>
  );
};

export default FormCadastro;
