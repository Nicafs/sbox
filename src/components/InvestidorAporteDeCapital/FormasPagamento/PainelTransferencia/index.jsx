import React, { useEffect, useRef } from 'react';

import { onlyNumbers } from 'commons/utils/ManipulacaoUtils';
import { cpfMask } from 'commons/utils/MaskHandle';
import Yup from 'commons/Yup';
import FormikTextField from 'components/FormikUtils/FormikTextField';
import Box from 'components/MaterialUI/Box';
import FormControl from 'components/MaterialUI/FormControl';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import { useFormik } from 'formik';
import _ from 'lodash';

import {
  InfoTransferenciaTituloTypography,
  InfoTransferenciaBodyTypography,
  PainelTransferenciaTituloTypography,
  PainelTransferenciaPaper,
} from './style';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default function PainelTransferencia({
  dadosContaDigital,
  setDadosContaDigital,
  setDadosPagamento,
}) {
  const YupSchema = Yup.object().shape({
    codigoBanco: Yup.string()
      .min(4, 'Código deve ter 4 dígitos')
      .required('Código obrigatório'),
    agenciaBanco: Yup.number()
      .test(
        'len',
        'Agência deve ter 4 dígitos',
        val => val && val.toString().length === 4,
      )
      .required('Agência obrigatória'),
    contaBanco: Yup.string()
      .min(6, 'Conta deve ter ao menos 5 dígitos')
      .required('Conta obrigatória'),
    nomeInvestidor: Yup.string().required('Nome obrigatório'),
    cpfInvestidor: Yup.string()
      .transform(value => value.replace(/\D/g, ''))
      .min(11, 'Documento deve ter ao menos 11 caracteres')
      .validarDocumento('Documento inválido')
      .required('CPF obrigatório'),
  });

  const {
    codigoBanco,
    agenciaBanco,
    contaBanco,
    nomeInvestidor,
    cpfInvestidor,
  } = dadosContaDigital;

  const formik = useFormik({
    initialValues: {
      codigoBanco,
      agenciaBanco,
      contaBanco,
      nomeInvestidor,
      cpfInvestidor,
    },
    validationSchema: YupSchema,
    enableReinitialize: true,
  });

  const previousFormikValues = usePrevious(formik.values);

  const inputs = {};

  const handleChangeCodigoBanco = codigo => onlyNumbers(codigo).substr(0, 4);

  const handleChangeAgenciaBanco = agencia => onlyNumbers(agencia).substr(0, 4);

  const handleChangeContaBanco = conta => {
    const contaSemDig = onlyNumbers(conta).substr(0, 20);
    const tamanhoConta = contaSemDig.length;
    if (contaSemDig) {
      return `${contaSemDig.substr(0, tamanhoConta - 1)}-${
        contaSemDig[tamanhoConta - 1]
      }`;
    }
    return '';
  };

  useEffect(() => {
    if (!_.isEqual(previousFormikValues, formik.values)) {
      YupSchema.isValid(formik.values).then(valid => {
        if (valid) {
          const novosDadosPagamento = {
            ...formik.values,
            tipoPagamento: 'TRANSFERENCIA',
          };
          setDadosPagamento(novosDadosPagamento);
          setDadosContaDigital(formik.values);
        } else {
          setDadosPagamento(null);
        }
      });
    }
  }, [
    previousFormikValues,
    formik,
    YupSchema,
    setDadosPagamento,
    setDadosContaDigital,
  ]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <InfoTransferenciaTituloTypography variant="h6">
          Transferência financeira para sua conta{' '}
          <strong>Crédito Express</strong> deve ser realizada via TED com os
          dados ao lado
        </InfoTransferenciaTituloTypography>
        <br />
        <br />
        <InfoTransferenciaBodyTypography variant="h6">
          <strong>IMPORTANTE:</strong> Lembramos que toda transferência para a
          conta Crédito Express deverá partir necessariamente da sua conta
          bancária registrada no seu <strong>CPF</strong>.
        </InfoTransferenciaBodyTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <PainelTransferenciaPaper elevation={0}>
          <PainelTransferenciaTituloTypography variant="subtitle1">
            Transferência de recursos via TED
          </PainelTransferenciaTituloTypography>
          <FormControl fullWidth>
            <FormikTextField
              formik={formik}
              inputRef={ref => (inputs.codigoBanco = ref)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="codigoBanco"
              label="Código do banco"
              name="codigoBanco"
              customHandleChange={handleChangeCodigoBanco}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormikTextField
              formik={formik}
              inputRef={ref => (inputs.agenciaBanco = ref)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="agenciaBanco"
              label="Agência do banco"
              name="agenciaBanco"
              customHandleChange={handleChangeAgenciaBanco}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormikTextField
              formik={formik}
              inputRef={ref => (inputs.contaBanco = ref)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contaBanco"
              label="Conta do banco"
              name="contaBanco"
              customHandleChange={handleChangeContaBanco}
            />
          </FormControl>
          <Box pt={1} pb={1}>
            <Typography variant="subtitle1" style={{ textAlign: 'left' }}>
              <strong>TED</strong> para contas de{' '}
              <strong>mesma titularidade</strong>
            </Typography>
          </Box>
          <FormControl fullWidth>
            <FormikTextField
              formik={formik}
              inputRef={ref => (inputs.nomeInvestidor = ref)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nomeInvestidor"
              label="Seu nome"
              name="nomeInvestidor"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormikTextField
              formik={formik}
              inputRef={ref => (inputs.cpfInvestidor = ref)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpfInvestidor"
              label="Seu CPF"
              name="cpfInvestidor"
              customHandleChange={cpfMask}
            />
          </FormControl>
        </PainelTransferenciaPaper>
      </Grid>
    </Grid>
  );
}
