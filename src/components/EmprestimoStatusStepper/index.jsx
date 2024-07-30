import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import EmpresaApi from '~/commons/resources/empresa';
import {
  transformarDataApiParaDataLocal,
  DATE_FORMATO_PADRAO,
} from '~/commons/tratativasParaDatasApi';

import ImgAsync from '~/components/ImgAsync';
import LoaderCircular from '~/components/LoaderCircular';
import Grid from '~/components/MaterialUI/Grid';

import { TextoDestaque } from '~/containers/MeusEmprestimos/style';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import { getFuncoesStepper } from './getFuncoesStepper';
import {
  ExplicacaoContainer,
  StatusStyled,
  StatusTexto,
  StepperStyled,
} from './style';

const EmprestimoStatusStepper = ({
  negociacao: {
    status,
    contaBancaria,
    dadosEmpresa: { empresa: idEmpresa = '' } = '',
    portocred: { dataEmissao } = {},
    analiseDocumento: { historicoAnalise: { length = '' } = [] } = {},
    analiseDocumento: {
      historicoAnalise: { [length - 1]: { motivoReprovacao = '' } = {} } = [],
    } = {},
  },
  tipoFluxoEcp,
  getIcone,
  tipoFluxoEp = '',
}) => {
  const tipoIntegracao = tipoFluxoEp || tipoFluxoEcp;
  const [activeStep, setActiveStep] = React.useState(1);
  const [iconeUrl, setIconeUrl] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nomeStep, setNomeStep] = useState('');
  const [descricaoStatus, setDescricaoStatus] = useState('');
  const dataTransferencia = dataEmissao
    ? transformarDataApiParaDataLocal(dataEmissao, DATE_FORMATO_PADRAO).format(
        'DD/MM/YYYY',
      )
    : '';

  const motivoReprovacaoDoc = (
    <>
      Não conseguimos concluir a análise de seus documentos
      {motivoReprovacao && (
        <>
          {' '}
          pelo seguinte motivo:
          <TextoDestaque> {motivoReprovacao}</TextoDestaque>
        </>
      )}
      . Precisamos que você os envie novamente.
    </>
  );

  const buscaStepper = async () => {
    setLoading(true);
    try {
      let empresa = {};
      if (tipoIntegracao !== 'BANCO_SEMEAR') {
        empresa = await EmpresaApi.getEmpresa(idEmpresa);
      }

      const {
        convenioPortocred: { tipoConvenio = '' },
      } = empresa;

      const {
        getNomeStep,
        getDescricaoStatus,
        getActiveStep,
        getIconeNameByStatus,
        getSteps,
      } = getFuncoesStepper(tipoIntegracao, tipoConvenio);
      setNomeStep(getNomeStep(status));
      setDescricaoStatus(
        getDescricaoStatus(
          status,
          contaBancaria,
          dataTransferencia,
          motivoReprovacaoDoc,
        ),
      );
      setSteps(getSteps(status));
      setActiveStep(getActiveStep(status));
      const url = await getIcone(getIconeNameByStatus(status));
      setIconeUrl(url);
      setLoading(false);
    } catch (err) {
      const {
        getNomeStep,
        getDescricaoStatus,
        getActiveStep,
        getIconeNameByStatus,
        getSteps,
      } = getFuncoesStepper(tipoIntegracao);
      setNomeStep(getNomeStep(status));
      setDescricaoStatus(
        getDescricaoStatus(
          status,
          contaBancaria,
          dataTransferencia,
          motivoReprovacaoDoc,
        ),
      );
      setSteps(getSteps(status));
      setActiveStep(getActiveStep(status));
      const url = await getIcone(getIconeNameByStatus(status));
      setIconeUrl(url);
      setLoading(false);
    }
  };

  useEffect(() => {
    buscaStepper();
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container>
      <Grid item container alignItems="center" xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            {loading ? (
              <LoaderCircular />
            ) : (
              <>
                <StatusStyled>Status</StatusStyled>
                <StepperStyled activeStep={activeStep} orientation="vertical">
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </StepperStyled>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <ExplicacaoContainer
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <ImgAsync alt="imagem" src={iconeUrl} />
              <StatusTexto variant="h1" cy-element="solicitacaoStatus">
                {nomeStep}
              </StatusTexto>
              <Typography align="center" variant="subtitle1">
                {descricaoStatus}
              </Typography>
            </ExplicacaoContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

/* eslint-disable react/forbid-prop-types */
EmprestimoStatusStepper.propTypes = {
  negociacao: PropTypes.object.isRequired,
};

export default EmprestimoStatusStepper;
