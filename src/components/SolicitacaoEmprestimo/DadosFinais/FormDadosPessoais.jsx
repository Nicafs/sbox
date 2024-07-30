import React from 'react';

import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import { deveExibir, obrigatorio } from '../../../commons/camposPersonalizados';
import endpoints from '../../../commons/constants/api-constants';
import api from '../../../commons/resources/api/general-api';
import { nomeMask } from '../../../commons/utils/MaskHandle';
import { useSimulacaoState } from '../../../pages/Tomador/SolicitacaoEmprestimo/state';
import FormikProfissaoAutocomplete from '../../FormikUtils/FormikProfissaoAutocomplete';
import FormikSelect from '../../FormikUtils/FormikSelect';
import FormikSelectAsyncList from '../../FormikUtils/FormikSelectAsyncList';
import FormikTextField from '../../FormikUtils/FormikTextField';
import InputLabel from '../../MaterialUI/InputLabel';
import TextField from '../../MaterialUI/TextField';
import FormDadosRG from './FormDadosRG';

export default function FormDadosPessoais({
  formik,
  inputs,
  estados,
  orgaosEmisores,
  nacionalidades,
}) {
  const { values } = formik;
  const [
    {
      organizacao: {
        camposPersonalizados: { contato = [], cadastro = [] } = {},
      },
    },
  ] = useSimulacaoState();

  const camposPadrao = [...contato, ...cadastro]
    .map(campo => ({ [campo.nome]: campo }))
    .reduce(
      (a, b) => ({
        ...a,
        ...b,
      }),
      {},
    );

  return (
    <Grid container spacing={2}>
      {deveExibir(camposPadrao, 'celular') && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Digite seu telefone</InputLabel>
            <TextField
              cy-element="inputTelefone"
              inputRef={ref => (inputs.celular = ref)}
              disabled
              maxLength="11"
              type="tel"
              variant="outlined"
              margin="normal"
              required={obrigatorio(camposPadrao, 'celular')}
              fullWidth
              id="celular"
              label="Telefone"
              name="celular"
              autoFocus
              value={values.celular}
              inputProps={{
                className: {
                  height: 20,
                },
              }}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, '') && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Digite sua data de nascimento</InputLabel>
            <TextField
              cy-element="inputDataNascimento"
              inputRef={ref => (inputs.dataNascimento = ref)}
              disabled
              type="date"
              variant="outlined"
              margin="normal"
              required={obrigatorio(camposPadrao, 'dataNascimento')}
              fullWidth
              id="dataNascimento"
              name="dataNascimento"
              value={values.dataNascimento}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'emailCorporativo') && values.emailCorporativo && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Digite seu e-mail corporativo</InputLabel>
            <TextField
              cy-element="inputEmailCorporativo"
              inputRef={ref => (inputs.emailCorporativo = ref)}
              disabled
              type="email"
              variant="outlined"
              margin="normal"
              required={false}
              fullWidth
              id="emailCorporativo"
              value={values.emailCorporativo}
              label="E-mail corporativo"
              name="emailCorporativo"
              autoComplete="email"
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'email') && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Digite seu e-mail pessoal</InputLabel>
            <TextField
              cy-element="inputEmailPessoal"
              inputRef={ref => (inputs.email = ref)}
              disabled
              type="email"
              variant="outlined"
              margin="normal"
              required={obrigatorio(camposPadrao, 'email')}
              fullWidth
              id="email"
              value={values.email}
              label="E-mail pessoal"
              name="email"
              autoComplete="email"
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'estadoCivil') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormikSelectAsyncList
            name="estadoCivil"
            inputRef={ref => (inputs.estadoCivil = ref)}
            fnBuscarOpcoes={() => api.request(endpoints.GET_ESTADO_CIVIL)}
            formik={formik}
            fullWidth
            required={obrigatorio(camposPadrao, 'estadoCivil')}
            label="Selecione o seu estado civil"
          />
        </Grid>
      )}
      {deveExibir(camposPadrao, 'genero') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormikSelectAsyncList
            name="genero"
            inputRef={ref => (inputs.genero = ref)}
            fnBuscarOpcoes={() => api.request(endpoints.GET_GENERO)}
            formik={formik}
            fullWidth
            required={obrigatorio(camposPadrao, 'genero')}
            label="Selecione o seu gênero"
          />
        </Grid>
      )}
      {deveExibir(camposPadrao, 'nomeMae') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Digite o nome completo da sua mãe</InputLabel>
            <FormikTextField
              formik={formik}
              cy-element="inputNomeMae"
              inputRef={ref => (inputs.nomeMae = ref)}
              type="text"
              variant="outlined"
              margin="normal"
              required={obrigatorio(camposPadrao, 'nomeMae')}
              fullWidth
              id="nomeMae"
              label="Nome completo da mãe"
              name="nomeMae"
              customValueMask={nomeMask}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'profissao') && (
        <Grid item container xs={12} md={12} alignItems="center">
          <FormikProfissaoAutocomplete
            placeholder="Digite aqui sua profissão"
            formik={formik}
            cy-element="profissao"
            inputRef={ref => (inputs.profissao = ref)}
            name="profissao"
            required={obrigatorio(camposPadrao, 'profissao')}
            idProfissao={values.profissaoId}
            fullWidth
          />
        </Grid>
      )}
      {deveExibir(camposPadrao, 'cargo') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Digite seu Cargo</InputLabel>
            <FormikTextField
              formik={formik}
              cy-element="inputCargo"
              inputRef={ref => (inputs.cargo = ref)}
              type="text"
              variant="outlined"
              margin="normal"
              required={obrigatorio(camposPadrao, 'cargo')}
              fullWidth
              id="cargo"
              label="Cargo"
              name="cargo"
              customValueMask={nomeMask}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'nacionalidade') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <FormikSelect
              cy-element="nacionalidade"
              label="Nacionalidade"
              name="nacionalidade"
              fullWidth
              formik={formik}
              inputRef={ref => (inputs.nacionalidade = ref)}
              disableUnderline
              list={nacionalidades}
              required={obrigatorio(camposPadrao, 'nacionalidade')}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'ufNaturalidade') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <FormikSelect
              cy-element="ufNaturalidade"
              label="UF naturalidade"
              fullWidth
              formik={formik}
              inputRef={ref => (inputs.ufNaturalidade = ref)}
              disableUnderline
              name="ufNaturalidade"
              list={estados}
              required={obrigatorio(camposPadrao, 'ufNaturalidade')}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'cidadeNaturalidade') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Digite a cidade onde nasceu</InputLabel>
            <FormikTextField
              formik={formik}
              cy-element="inputCidadeNaturalidade"
              inputRef={ref => (inputs.cidadeNaturalidade = ref)}
              type="text"
              variant="outlined"
              margin="normal"
              required={obrigatorio(camposPadrao, 'cidadeNaturalidade')}
              fullWidth
              id="cidadeNaturalidade"
              label="Cidade de naturalidade"
              name="cidadeNaturalidade"
              customValueMask={nomeMask}
            />
          </FormControl>
        </Grid>
      )}
      <FormDadosRG
        formik={formik}
        camposPadrao={camposPadrao}
        inputs={inputs}
        estados={estados}
        orgaosEmisores={orgaosEmisores}
      />
    </Grid>
  );
}

/* eslint-disable react/forbid-prop-types */
FormDadosPessoais.propTypes = {
  formik: PropTypes.object,
  inputs: PropTypes.object,
};

FormDadosPessoais.defaultProps = {
  formik: undefined,
  inputs: undefined,
};
