import React, { useEffect, useRef, useState } from 'react';

// import moment from 'moment';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import OrgaoEmissor from '~/commons/resources/orgaoEmissor';
// import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';

import FormikDatePicker from '~/components/FormikUtils/FormikDatePicker';

import { deveExibir, obrigatorio } from '../../../commons/camposPersonalizados';
import FormikSelect from '../../FormikUtils/FormikSelect';
import FormikTextField from '../../FormikUtils/FormikTextField';
import { InputLabel } from '../../MaterialUI/InputLabel/style';

const FormDadosRG = ({
  formik,
  camposPadrao,
  inputs,
  estados: estadosOptions,
  orgaosEmisores: orgaosEmisoresOptions,
}) => {
  inputs.dataEmissaoRg = useRef();
  const [orgaosPorUf, setOrgaosPorUf] = useState();
  // const {
  //   values: { dataNascimento },
  // } = formik;

  // const minDate = dataNascimento
  //   ? transformarDataApiParaDataLocal(dataNascimento).add(1, 'days').toDate()
  //   : new Date();
  // const maxDate = moment().toDate();

  useEffect(() => {
    listarOrgaosEmissoresPorUf(formik?.values.ufEmissorRg);
    // eslint-disable-next-line
  }, [formik?.values.ufEmissorRg]);

  const listarOrgaosEmissoresPorUf = async uf => {
    if (uf) {
      const orgaosResponse = await OrgaoEmissor.listEmissorRg(uf);
      const options = orgaosResponse.map(({ orgao, nome }) => ({
        value: orgao,
        label: nome,
      }));
      formik.values.emissorRg = options[0]?.value;
      setOrgaosPorUf(options);
    }
  };

  return (
    <>
      {deveExibir(camposPadrao, 'rg') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Digite o número do seu RG</InputLabel>
            <FormikTextField
              formik={formik}
              cy-element="rg"
              inputRef={ref => (inputs.rg = ref)}
              type="tel"
              variant="outlined"
              margin="normal"
              required={obrigatorio(camposPadrao, 'rg')}
              fullWidth
              id="rg"
              label="Número do RG"
              name="rg"
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'ufEmissorRg') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <FormikSelect
              cy-element="ufEmissorRg"
              label="UF emissora do RG"
              fullWidth
              formik={formik}
              inputRef={ref => (inputs.ufEmissorRg = ref)}
              disableUnderline
              name="ufEmissorRg"
              list={estadosOptions}
              required={obrigatorio(camposPadrao, 'ufEmissorRg')}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'rg') && (
        <Grid item container xs={12} md={6} alignItems="center">
          <FormControl fullWidth>
            <FormikSelect
              cy-element="emissorRg"
              label="Órgão emissor do RG"
              fullWidth
              formik={formik}
              inputRef={ref => (inputs.emissorRg = ref)}
              disableUnderline
              name="emissorRg"
              list={orgaosPorUf || orgaosEmisoresOptions}
              required={obrigatorio(camposPadrao, 'emissorRg')}
            />
          </FormControl>
        </Grid>
      )}
      {deveExibir(camposPadrao, 'dataEmissaoRg') && (
        <Grid item xs={12} md={6}>
          <FormControl fullWidth ref={inputs.dataEmissaoRg}>
            <InputLabel style={{ marginBottom: 16 }}>
              Digite a data de emissão do RG
            </InputLabel>

            <FormikDatePicker
              formik={formik}
              name="dataEmissaoRg"
              cyElement="dataEmissaoRg"
              label="Data de emissão RG"
              maxDate={new Date()}
            />
          </FormControl>
        </Grid>
      )}
    </>
  );
};

export default FormDadosRG;
