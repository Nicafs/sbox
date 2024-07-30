import {
  getActiveStep as getActiveStepEp,
  getDescricaoStatus as getDescricaoStatusEp,
  getIconeNameByStatus as getIconeNameByStatusEp,
  getNomeStep as getNomeStepEp,
  getSteps as getStepsEp,
} from './integracaoEp';
import {
  getActiveStep as getActiveStepPadrao,
  getDescricaoStatus as getDescricaoStatusPadrao,
  getIconeNameByStatus as getIconeNameByStatusPadrao,
  getNomeStep as getNomeStepPadrao,
  getSteps as getStepsPadrao,
} from './integracaoPadrao';
import {
  getActiveStep as getActiveStepPortocredConvenioCE,
  getDescricaoStatus as getDescricaoStatusPortocredConvenioCE,
  getIconeNameByStatus as getIconeNameByStatusPortocredConvenioCE,
  getNomeStep as getNomeStepPortocredConvenioCE,
  getSteps as getStepsPortocredConvenioCE,
} from './integracaoPortocredConvenioCE';
import {
  getActiveStep as getActiveStepPortocredConvenioPortocred,
  getDescricaoStatus as getDescricaoStatusPortocredConvenioPortocred,
  getIconeNameByStatus as getIconeNameByStatusPortocredConvenioPortocred,
  getNomeStep as getNomeStepPortocredConvenioPortocred,
  getSteps as getStepsPortocredConvenioPortocred,
} from './integracaoPortocredConvenioPortocred';

export const getFuncoesStepper = (tipoIntegracao, tipoConvenio) => {
  const tipoIntegracaoUpperCase = (tipoIntegracao || '').toUpperCase();
  const tipoConvenioUpperCase = (
    tipoConvenio || 'creditoexpress'
  ).toUpperCase();

  const fnsCeDefault = {
    getNomeStep: getNomeStepPadrao,
    getDescricaoStatus: getDescricaoStatusPadrao,
    getActiveStep: getActiveStepPadrao,
    getIconeNameByStatus: getIconeNameByStatusPadrao,
    getSteps: getStepsPadrao,
  };

  const fns = {
    PORTOCRED: {
      CREDITOEXPRESS: {
        getNomeStep: getNomeStepPortocredConvenioCE,
        getDescricaoStatus: getDescricaoStatusPortocredConvenioCE,
        getActiveStep: getActiveStepPortocredConvenioCE,
        getIconeNameByStatus: getIconeNameByStatusPortocredConvenioCE,
        getSteps: getStepsPortocredConvenioCE,
      },
      PORTOCRED: {
        getNomeStep: getNomeStepPortocredConvenioPortocred,
        getDescricaoStatus: getDescricaoStatusPortocredConvenioPortocred,
        getActiveStep: getActiveStepPortocredConvenioPortocred,
        getIconeNameByStatus: getIconeNameByStatusPortocredConvenioPortocred,
        getSteps: getStepsPortocredConvenioPortocred,
      },
    },
    BANCO_SEMEAR: {
      CREDITOEXPRESS: {
        getNomeStep: getNomeStepEp,
        getDescricaoStatus: getDescricaoStatusEp,
        getActiveStep: getActiveStepEp,
        getIconeNameByStatus: getIconeNameByStatusEp,
        getSteps: getStepsEp,
      },
    },
    // Adicionar outras integrações aqui
  };

  return fns[tipoIntegracaoUpperCase]
    ? fns[tipoIntegracaoUpperCase][tipoConvenioUpperCase]
    : fnsCeDefault;
};
