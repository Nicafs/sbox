import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import Organizacao from '~/commons/resources/organizacao';
import { moneyMask } from '~/commons/utils/MaskHandle';

import FormikSelect from '~/components/FormikUtils/FormikSelect';
import FormikSelectAsyncList from '~/components/FormikUtils/FormikSelectAsyncList';
import FormikTextField from '~/components/FormikUtils/FormikTextField';
import Grid from '~/components/MaterialUI/Grid';
import { InputLabel } from '~/components/MaterialUI/InputLabel/style';

export default function FormSimulacaoEP({
  formik,
  motivos,
  dataVencimento,
  parcelamentos,
  calcularParcelaParcelamento,
}) {
  const inputs = {};

  const {
    organizacao: { id: idOrganizacao },
  } = useAppGlobal();

  useEffect(() => {
    const inputsNomes = Object.keys(formik.touched);
    if (inputsNomes.length > 0) {
      let elementoEstaFocado = false;
      inputsNomes.forEach(inputNome => {
        if (
          formik.errors[inputNome] &&
          !elementoEstaFocado &&
          inputs[inputNome]
        ) {
          elementoEstaFocado = true;
          inputs[inputNome].focus();
        }
      });
    }
  }, [formik.touched]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeParcelamento = parcelamento => {
    if (parcelamentos && parcelamentos.length > 0) {
      const newParcelamento = parcelamentos.find(
        p => p.qtdParcelas === parcelamento,
      );
      calcularParcelaParcelamento(newParcelamento);
      return parcelamento;
    }
    return undefined;
  };

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
          fullWidth
          required
          label="Data primeira parcela"
          name="dataPrimeiraParcela"
          formik={formik}
          inputRef={ref => {
            inputs.objetivo = ref;
          }}
          cy-element="selectDataPrimeiraParcela"
          list={dataVencimento}
          disableUnderline
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormikSelect
          id="objetivo"
          name="objetivo"
          label="Motivo do empréstimo"
          cy-element="selectObjetivo"
          formik={formik}
          inputRef={ref => {
            inputs.objetivo = ref;
          }}
          list={motivos}
          disableUnderline
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormikSelectAsyncList
          id="ocupacaoProfissional"
          name="ocupacaoProfissional"
          label="Ocupação Profissional"
          cy-element="ocupacaoProfissional"
          formik={formik}
          inputRef={ref => {
            inputs.ocupacaoProfissional = ref;
          }}
          fnBuscarOpcoes={() => getListaOcupacao()}
          disableUnderline
          fullWidth
          required
        />
      </Grid>
      {parcelamentos && parcelamentos.length > 0 && (
        <Grid item xs={12} md={4}>
          <FormikSelect
            fullWidth
            required
            label="Quantidade de Parcelas"
            name="parcelamento"
            formik={formik}
            customHandleChange={onChangeParcelamento}
            inputRef={ref => {
              inputs.objetivo = ref;
            }}
            cy-element="selectParcelamento"
            list={parcelamentos.map(p => {
              return {
                label: `${p.qtdParcelas}x R$ ${moneyMask(p.valorParcela)}`,
                value: p.qtdParcelas,
              };
            })}
            disableUnderline
          />
        </Grid>
      )}
    </Grid>
  );
}

/* eslint-disable react/forbid-prop-types */
FormSimulacaoEP.propTypes = {
  formik: PropTypes.object.isRequired,
  motivos: PropTypes.array.isRequired,
};
