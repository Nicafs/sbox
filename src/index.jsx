import React from 'react';
import { render } from 'react-dom';
import TagManager from 'react-gtm-module';

import { getOrganizacaoWhitelabel } from '~/commons/utils';

import App from './App';
import * as serviceWorker from './serviceWorker';

const ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') !== -1) {
  if (!(ua.indexOf('chrome') > -1)) {
    window.MediaRecorder = require('audio-recorder-polyfill');
  }
}

const organizacao = getOrganizacaoWhitelabel();
/** */

if (
  organizacao?.codigoAcesso === 'portocred' &&
  process.env.REACT_APP_ENV === 'prod'
) {
  const tagManagerArgs = {
    gtmId: 'GTM-P8SN4PZ',
  };

  TagManager.initialize(tagManagerArgs);
}

if (process.env.REACT_APP_ENV === 'local') {
  // eslint-disable-next-line import/no-extraneous-dependencies,global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render'); // Evita dependencia durante testes
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: registration => {
    registration.unregister().then(() => {
      console.log('Atualizando página... [serviceWorker.register.onUpdate()]');
      window.location.reload();
    });
  },
  onSuccess: registration => {
    console.info('Atualizando versão do service worker com nova versão');
    console.log(registration);
  },
});
