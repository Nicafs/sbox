import { useEffect } from 'react';

import moment from 'moment';

import { getOrganizacaoWhitelabel } from '../../commons/utils';

const GCP_PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const ambiente = process.env.REACT_APP_ENV;
let manifests = '';

switch (ambiente) {
  case 'dev':
    manifests = 'ce-manifests-dev';
    break;
  case 'e2e':
    manifests = 'ce-manifests-e2e';
    break;
  case 'staging':
    manifests = 'ce-manifests-staging';
    break;
  case 'prod':
    manifests = 'ce-manifests';
    break;
  default:
    manifests = 'ce-manifests';
    break;
}

const dataFormatoBR = 'DD/MM/YYYY HH:mm:ss';
export let eventoPwa = null; // eslint-disable-line import/no-mutable-exports

const getManifestUrl = idOrganizacao => {
  const organizacaoWhitelabel = getOrganizacaoWhitelabel();
  if (organizacaoWhitelabel) {
    const { id: idWhitelabel } = organizacaoWhitelabel;
    return `https://storage.googleapis.com/${manifests}/${idWhitelabel}/manifest.json`;
  }

  return `https://storage.googleapis.com/${GCP_PROJECT_ID}.appspot.com/organizacao/${idOrganizacao}/manifest.json`;
};

const AlertaPWA = () => {
  useEffect(() => {
    const organizacaoRaw = localStorage.getItem('organizacao');
    if (organizacaoRaw) {
      const organizacaoObj = JSON.parse(organizacaoRaw);
      const { id: idOrganizacao } = organizacaoObj;

      // TODO: adicionar verificação tema padrão para retornar manifest.json padrão
      const manifestUrl = getManifestUrl(idOrganizacao);
      document
        .querySelector('link[rel=manifest]')
        .setAttribute('href', manifestUrl);
    }

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler,
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const beforeInstallPromptHandler = e => {
    eventoPwa = e;
    if (!podeExibirModalPWA()) {
      e.preventDefault();
    }
  };

  const salvarDataExibicaoPWA = () => {
    const dataAtualFormatada = moment().format(dataFormatoBR);
    localStorage.setItem('dataExibicaoModalPWA', dataAtualFormatada);
  };

  const comparaSeDataAtualMaiorQueIntervalo = dataUltimaExibicaoModalPwaFormatada => {
    const dataAtual = moment();
    const dataUltimaExibicaoModalPwa = moment(
      dataUltimaExibicaoModalPwaFormatada,
      dataFormatoBR,
    );
    const intervaloLimite =
      process.env.REACT_APP_INTERVALO_MODAL_PWA_EM_MINUTOS;
    const passouIntervaloLimite =
      dataAtual.diff(dataUltimaExibicaoModalPwa, 'minutes') >= intervaloLimite;

    return passouIntervaloLimite;
  };

  const podeExibirModalPWA = (salvarDataExibicaoLocalStorage = true) => {
    const dataUltimaExibicaoModalPwaFormatada = localStorage.getItem(
      'dataExibicaoModalPWA',
    );
    if (!dataUltimaExibicaoModalPwaFormatada) {
      if (salvarDataExibicaoLocalStorage) {
        salvarDataExibicaoPWA();
      }
      return true;
    }
    const podeAbrir = comparaSeDataAtualMaiorQueIntervalo(
      dataUltimaExibicaoModalPwaFormatada,
    );
    if (podeAbrir && salvarDataExibicaoLocalStorage) {
      salvarDataExibicaoPWA();
    }
    return podeAbrir;
  };

  return null;
};

export default AlertaPWA;
