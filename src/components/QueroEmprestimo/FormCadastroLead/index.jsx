import React from 'react';

import { onlyNumbers } from 'commons/utils/ManipulacaoUtils';
import { cpfMask, celularMask, telefoneMask } from 'commons/utils/MaskHandle';
import Yup from 'commons/Yup';
import FormikAutocomplete from 'components/FormikUtils/FormikAutocomplete';
import FormikTextField from 'components/FormikUtils/FormikTextField';
import FormikUfAutocomplete from 'components/FormikUtils/FormikUfAutocomplete';
import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import FormControl from 'components/MaterialUI/FormControl';
import Grid from 'components/MaterialUI/Grid';
import InputLabel from 'components/MaterialUI/InputLabel';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { validaDDD } from '~/commons/utils/dddsExistentes';

import pushRota from '../../../routes/push';
import { TypographyStyled, ButtonVoltarStyled } from './style';

const listaQtdFuncionarios = [
  {
    label: '1 a 10',
    value: '1/10',
  },
  {
    label: '11 a 49',
    value: '11/49',
  },
  {
    label: '50 a 199',
    value: '50/199',
  },
  {
    label: '200 a 499',
    value: '200/499',
  },
  {
    label: '500 a 999',
    value: '500/999',
  },
  {
    label: '1000 a 4999',
    value: '1000/4999',
  },
  {
    label: 'Mais que 5000',
    value: '5000/-1',
  },
];

export default function FormCadastroLead({ cadastrar, cpf: cpfLead }) {
  const YupSchema = Yup.object().shape({
    nomeCliente: Yup.string().required('Nome obrigatório'),
    cpfCliente: Yup.string()
      .transform(value => value.replace(/\D/g, ''))
      .min(11, 'Documento deve ter ao menos 11 caracteres')
      .validarDocumento('Documento inválido')
      .required('CPF obrigatório'),
    celularCliente: Yup.string()
      .required('Celular obrigatório')
      .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
    nomeEmpresa: Yup.string().required('Nome da empresa obrigatório'),
    nomeResponsavelRhEmpresa: Yup.string().required(
      'Nome do responsável pelo RH obrigatório',
    ),
    telefoneEmpresa: Yup.string()
      .required('Telefone da empresa obrigatório')
      .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
    emailEmpresa: Yup.string()
      .email('E-mail inválido')
      .required('E-mail obrigatório'),
    qtdFuncionariosEmpresa: Yup.string().required(
      'Quantidade de funcionários obrigatória',
    ),
    ufEmpresa: Yup.string().required('UF obrigatória'),
  });

  const dadosIniciais = {
    nomeCliente: '',
    cpfCliente: cpfLead ? cpfMask(cpfLead) : '',
    celularCliente: '',
    nomeEmpresa: '',
    nomeResponsavelRhEmpresa: '',
    telefoneEmpresa: '',
    emailEmpresa: '',
    qtdFuncionariosEmpresa: '',
    ufEmpresa: '',
  };

  async function onSubmit(values) {
    const dados = {
      ...values,
      cpfCliente: onlyNumbers(values.cpfCliente),
      celularCliente: onlyNumbers(values.celularCliente),
      telefoneEmpresa: onlyNumbers(values.telefoneEmpresa),
    };
    cadastrar(dados);
  }

  const handleChangeCelular = celular => celularMask(celular);

  const handleChangeTelefone = telefone => telefoneMask(telefone);

  const formik = useFormik({
    initialValues: dadosIniciais,
    validationSchema: YupSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const inputs = {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box pt={2}>
          <TypographyStyled variant="subtitle1" style={{ textAlign: 'left' }}>
            <strong>Seus dados</strong>
          </TypographyStyled>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Qual seu nome?</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.nomeCliente = ref)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nomeCliente"
            label="Nome"
            name="nomeCliente"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Informe seu CPF</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.cpfCliente = ref)}
            variant="outlined"
            margin="normal"
            required
            disabled
            fullWidth
            id="cpfCliente"
            name="cpfCliente"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Informe o número do seu celular</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.celularCliente = ref)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="celularCliente"
            label="(xx) xxxxx-xxxx"
            name="celularCliente"
            customHandleChange={handleChangeCelular}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box pt={2}>
          <TypographyStyled variant="subtitle1" style={{ textAlign: 'left' }}>
            <strong>Dados da empresa onde você trabalha</strong>
          </TypographyStyled>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Nome da empresa</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.nomeEmpresa = ref)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nomeEmpresa"
            label="Nome da empresa"
            name="nomeEmpresa"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Nome do responsável pelo setor de RH</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.nomeResponsavelRhEmpresa = ref)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nomeResponsavelRhEmpresa"
            label="Nome"
            name="nomeResponsavelRhEmpresa"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Telefone da empresa</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.telefoneEmpresa = ref)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="telefoneEmpresa"
            label="(xx) xxxx-xxxx"
            name="telefoneEmpresa"
            customHandleChange={handleChangeTelefone}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>E-mail da empresa</InputLabel>
          <FormikTextField
            formik={formik}
            inputRef={ref => (inputs.emailEmpresa = ref)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="emailEmpresa"
            label="empresa@gmail.com"
            name="emailEmpresa"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormikAutocomplete
            idInput="qtdFuncionariosEmpresa"
            formik={formik}
            required
            fullWidth
            name="qtdFuncionariosEmpresa"
            label="Quantidade de funcionários"
            placeholder="Quantidade"
            fnListarOpcoes={() => listaQtdFuncionarios}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormikUfAutocomplete
            formik={formik}
            required
            fullWidth
            name="ufEmpresa"
            label="Estado da empresa"
            placeholder="Estado"
          />
        </FormControl>
      </Grid>
      <Grid
        container
        justify="flex-end"
        spacing={2}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={12} sm={2} md={3}>
          <ButtonVoltarStyled
            name="botao-voltar"
            cy-element="btnVoltar"
            rounded="true"
            variant="outlined"
            onClick={() => pushRota('/quero-emprestimo')}
            fullWidth
          >
            Voltar
          </ButtonVoltarStyled>
        </Grid>
        <Grid item xs={12} sm={2} md={3}>
          <Button
            name="botao-avancar"
            cy-element="btnSubmit"
            rounded="true"
            primary="true"
            onClick={() => formik.handleSubmit()}
            fullWidth
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

FormCadastroLead.propTypes = {
  cadastrar: PropTypes.func.isRequired,
  cpf: PropTypes.string.isRequired,
};
