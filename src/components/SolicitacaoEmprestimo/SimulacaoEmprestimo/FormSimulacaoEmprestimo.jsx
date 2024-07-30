import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import FormikSelect from '../../FormikUtils/FormikSelect';
import FormikTextField from '../../FormikUtils/FormikTextField';
import Box from '../../MaterialUI/Box';
import Grid from '../../MaterialUI/Grid';
import { InputLabel } from '../../MaterialUI/InputLabel/style';
import Slider from '../../MaterialUI/Slider';

export default function FormSimulacaoEmprestimo({
  formik,
  motivos,
  parcelasPossiveis = [],
  minParcelas,
  maxParcelas,
}) {
  const inputs = {};

  useEffect(() => {
    const inputsNomes = Object.keys(formik.touched);
    if (inputsNomes.length > 0) {
      let elementoEstaFocado = false;
      inputsNomes.forEach(inputNome => {
        if (formik.errors[inputNome] && !elementoEstaFocado) {
          elementoEstaFocado = true;
          inputs[inputNome].focus();
        }
      });
    }
  }, [formik.touched]); // eslint-disable-line react-hooks/exhaustive-deps

  const getOpcoesParcelas = () => {
    return parcelasPossiveis.map(n => ({ value: n, label: `${n} meses` }));
  };

  const getOpcoesParcelasSlider = () => {
    return parcelasPossiveis.map(n => ({ value: n, label: '' }));
  };

  const parcelasOpcoes = getOpcoesParcelas();
  const parcelasOpcoesSlider = getOpcoesParcelasSlider();

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12} md={4}>
        <InputLabel>Valor desejado</InputLabel>
        <FormikTextField
          id="vlrEmprestimo"
          name="valor"
          cy-element="inputValor"
          formik={formik}
          inputRef={ref => {
            inputs.valor = ref;
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          centavosZerados
          monetario
          type="tel"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormikSelect
          label="Parcelas"
          fullWidth
          formik={formik}
          inputRef={ref => {
            inputs.parcelas = ref;
          }}
          name="parcelas"
          cy-element="selectParcelas"
          disableUnderline
          cleanErrorOnChange
          list={parcelasOpcoes}
          disabled={formik.errors.valor}
          required
        />
        <Box mt={2}>
          <Slider
            defaultValue={35}
            marks={parcelasOpcoesSlider}
            min={minParcelas}
            max={maxParcelas}
            step={null}
            onChange={(e, novoValor) => {
              formik.setFieldValue('parcelas', novoValor);
              formik.setFieldError('parcelas', undefined);
            }}
            onBlur={() => formik.setFieldTouched('parcelas', true, true)}
            value={formik.values.parcelas}
            valueLabelDisplay="auto"
            disabled={formik.errors.valor}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormikSelect
          fullWidth
          required
          label="Motivo do empréstimo"
          name="objetivo"
          formik={formik}
          inputRef={ref => {
            inputs.objetivo = ref;
          }}
          cy-element="selectObjetivo"
          list={motivos}
          disableUnderline
        />
      </Grid>
    </Grid>
  );
}

/* eslint-disable react/forbid-prop-types */
FormSimulacaoEmprestimo.propTypes = {
  formik: PropTypes.object.isRequired,
  maxParcelas: PropTypes.number.isRequired,
  minParcelas: PropTypes.number.isRequired,
  motivos: PropTypes.array.isRequired,
};
