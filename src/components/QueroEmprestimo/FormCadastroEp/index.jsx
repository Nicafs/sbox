import React from 'react';

import Organizacao from 'commons/resources/organizacao';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { cpfMask, celularMask } from '~/commons/utils/MaskHandle';

import FormikDatePicker from '~/components/FormikUtils/FormikDatePicker';
import FormikSelectAsyncList from '~/components/FormikUtils/FormikSelectAsyncList';
import FormikTextField from '~/components/FormikUtils/FormikTextField';
import Button from '~/components/MaterialUI/Button';
import FormControl from '~/components/MaterialUI/FormControl';
import Grid from '~/components/MaterialUI/Grid';
import InputLabel from '~/components/MaterialUI/InputLabel';

import YupSchema from './schema';
import { ButtonVoltarStyled } from './style';

export default function FormCadastroEp({
  setValues,
  setNecessarioAceitarTermos,
  cpf,
  celular,
  loading,
  idOrganizacao,
  voltar,
}) {
  const getListaOcupacao = async () => {
    const response = await Organizacao.getCampoPersonalizado(
      idOrganizacao,
      'cadastro_adicionais',
      'ocupacaoProfissional',
    );
    const { listaValores } = response;
    const list = Object.keys(listaValores).map(l => {
      return { value: l, label: listaValores[l] };
    });
    return list;
  };

  const dadosIniciais = {
    nome: '',
    cpf: cpfMask(cpf),
    celular: celularMask(celular),
    nomeMae: '',
    dataNascimento: null,
    ocupacaoProfissional: '',
  };

  const formik = useFormik({
    initialValues: dadosIniciais,
    validationSchema: YupSchema,
    onSubmit: values => {
      setValues(values);
      setNecessarioAceitarTermos(true);
    },
    enableReinitialize: true,
  });

  const inputs = {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Nome completo</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.nome = ref)}
            variant="outlined"
            required
            fullWidth
            id="nome"
            name="nome"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>CPF</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.cpf = ref)}
            variant="outlined"
            required
            disabled
            fullWidth
            id="cpf"
            name="cpf"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Número de celular</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.celular = ref)}
            variant="outlined"
            required
            fullWidth
            id="celular"
            name="celular"
            disabled
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Nome da mãe conforme RG</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.nomeMae = ref)}
            variant="outlined"
            required
            fullWidth
            id="nomeMae"
            name="nomeMae"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Data de Nascimento</InputLabel>
          <FormikDatePicker
            formik={formik}
            name="dataNascimento"
            cyElement="cyElement-dataNascimento"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Ocupação</InputLabel>
          <FormikSelectAsyncList
            name="ocupacaoProfissional"
            inputRef={ref => (inputs.ocupacaoProfissional = ref)}
            fnBuscarOpcoes={() => getListaOcupacao()}
            formik={formik}
            fullWidth
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          loading={loading}
          name="btn-avancar"
          rounded="true"
          primary="true"
          onClick={() => formik.handleSubmit()}
          fullWidth
        >
          Enviar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ButtonVoltarStyled
          name="btn-voltar"
          rounded="true"
          variant="outlined"
          onClick={() => voltar()}
          fullWidth
        >
          Voltar
        </ButtonVoltarStyled>
      </Grid>
    </Grid>
  );
}

FormCadastroEp.propTypes = {
  cpf: PropTypes.string.isRequired,
  celular: PropTypes.string.isRequired,
};
