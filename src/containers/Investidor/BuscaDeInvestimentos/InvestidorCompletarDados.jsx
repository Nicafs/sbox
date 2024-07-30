import React, { useMemo } from 'react';

import endpoints from 'commons/constants/api-constants';
import api from 'commons/resources/api/general-api';
import { onlyNumber } from 'commons/utils/MaskHandle';
import FormikProfissaoAutocomplete from 'components/FormikUtils/FormikProfissaoAutocomplete';
import FormikSelectAsyncList from 'components/FormikUtils/FormikSelectAsyncList';
import FormikTextField from 'components/FormikUtils/FormikTextField';
import Box from 'components/MaterialUI/Box';
import Container from 'components/MaterialUI/Container';
import Divider from 'components/MaterialUI/Divider';
import FormControl from 'components/MaterialUI/FormControl';
import Grid from 'components/MaterialUI/Grid';
import InputLabel from 'components/MaterialUI/InputLabel';
import ExibicaoErros from 'components/SolicitacaoEmprestimo/ExibicaoErros';
import { useFormik } from 'formik';
import { useAppGlobal } from 'providers/AppGlobal';

import { FormEndereco } from '@credito-express/ce-components';

import Pessoa from '../../../commons/resources/pessoa';
import BotoesAcaoFooter from '../../../components/FluxoInvestimento/BotoesDeAcaoFooter';
import schema from './schema';

export default function InvestidorCompletarDados({
  avancarStep,
  investidor,
  setInvestidor,
  investimentos,
  botoesAcaoBoleto,
  isBeforeLastStep,
  imprimirBoleto,
  enviarBoletoPorEmail,
  investimentoSelecionado,
  setTelaValida,
  telaValida,
}) {
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  const {
    rg = '',
    profissao = '',
    estadoCivil = '',
    cep = '',
    logradouro = '',
    numero = '',
    bairro = '',
    complemento = '',
    estado: uf = '',
    cidade,
    cidadeRef,
    cepEncontrado = true,
  } = investidor;

  async function onSubmit(values) {
    const {
      cidade: { value: cidadeId, label: cidadeNome },
      uf: valueUf,
      bairro: valueBairro,
      cep: valueCep,
      complemento: valueComplemento,
      estadoCivil: valueEstadoCivil,
      logradouro: valueLogradouro,
      numero: valueNumero,
      profissao: valueProfissao,
      rg: valueRg,
    } = values;
    const params = {
      bairro: valueBairro,
      cep: valueCep,
      complemento: valueComplemento,
      estadoCivil: valueEstadoCivil,
      logradouro: valueLogradouro,
      numero: valueNumero,
      profissao: valueProfissao,
      rg: valueRg,
      estado: valueUf,
      cidade: cidadeId,
    };

    try {
      await Pessoa.atualizarInvestidor(params);
      setInvestidor({
        ...values,
        cidade: cidadeNome,
        cidadeRef: cidadeId,
      });
      avancarStep();
    } catch (e) {
      exibirAlerta('Houve um erro ao tentar atualizar seus dados.');
      console.error(e);
    }
  }

  const formik = useFormik({
    initialValues: {
      rg,
      profissao,
      estadoCivil,
      cep,
      logradouro,
      numero,
      bairro,
      complemento,
      uf,
      cidade: cidade ? { label: cidade, value: cidadeRef } : {},
      cepEncontrado,
    },
    validationSchema: schema,
    onSubmit,
  });

  const { isValid } = formik;

  useMemo(() => {
    setTelaValida(isValid);
  }, [isValid]); // eslint-disable-line react-hooks/exhaustive-deps

  const inputs = {};

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item container xs={12} md={6} alignItems="center">
          <FormikSelectAsyncList
            name="estadoCivil"
            inputRef={ref => {
              inputs.estadoCivil = ref;
            }}
            fnBuscarOpcoes={() => api.request(endpoints.GET_ESTADO_CIVIL)}
            formik={formik}
            fullWidth
            label="Digite seu estado civil"
          />
        </Grid>
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Digite seu número de RG</InputLabel>
            <FormikTextField
              formik={formik}
              inputRef={ref => {
                inputs.rg = ref;
              }}
              type="tel"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rg"
              label="Número de RG"
              name="rg"
              customHandleChange={onlyNumber}
            />
          </FormControl>
        </Grid>
        <Grid item container xs={12} md={12} alignItems="center">
          <FormikProfissaoAutocomplete
            formik={formik}
            inputRef={ref => {
              inputs.profisao = ref;
            }}
            name="profissao"
            fullWidth
          />
        </Grid>
      </Grid>
      <Box pt={4} pb={4}>
        <Divider />
      </Box>

      <FormEndereco formik={formik} inputVariant="outlined" />
      <ExibicaoErros formik={formik} />

      <Grid item xs={12}>
        <Container maxWidth="lg">
          <Box mt={3}>
            <BotoesAcaoFooter
              botoesAcaoBoleto={botoesAcaoBoleto}
              handleNext={() => formik.handleSubmit()}
              isBeforeLastStep={isBeforeLastStep}
              imprimirBoleto={imprimirBoleto}
              enviarBoletoPorEmail={enviarBoletoPorEmail}
              investimentos={investimentos}
              investimentoSelecionado={investimentoSelecionado}
              textoBotaoFooter="CONTINUAR"
              botaoAvancarDisabled={!telaValida}
            />
          </Box>
        </Container>
      </Grid>
    </Container>
  );
}

InvestidorCompletarDados.label = 'Completar Cadastro';
InvestidorCompletarDados.title = 'Completar Cadastro';
