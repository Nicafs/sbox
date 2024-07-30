import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';

import injectScript from 'commons/hooks/UseScript';
import Main from 'containers/Main';

import CssBaseline from '@material-ui/core/CssBaseline';

import {
  useAuth,
  CeMuiThemeProvider,
  CreditoExpressProvider,
  useFetch,
  useFirebase,
} from '@credito-express/ce-components';

import GlobalStyle from './commons/styles/global';
import { getOrganizacaoWhitelabel } from './commons/utils';
import AlertaPWA from './components/AlertaPWA';
import AlertaApp from './containers/AlertaApp';
import NotificacaoApp from './containers/NotificacaoApp';
import hotjarScript from './hotjar';
import { AppGlobalProvider } from './providers/AppGlobal';
import { ChatBotProvider } from './providers/ChatBot';
import history from './routes/history';
import { inicializarRastreamentoDeErros, SentryApp } from './Sentry';

const AMBIENTES_COM_LOGS_NO_CONSOLE = [
  'e2e',
  'test',
  'local',
  'dev',
  'staging',
];
const AMBIENTES_COM_HOTJAR = ['staging', 'prod'];

const App = () => {
  useEffect(() => {
    inicializarRastreamentoDeErros();
    try {
      if (!AMBIENTES_COM_LOGS_NO_CONSOLE.includes(process.env.REACT_APP_ENV)) {
        console.log = () => {}; // Remove logs em produção
        console.warn = () => {}; // Remove logs em produção
      }
      if (AMBIENTES_COM_HOTJAR.includes(process.env.REACT_APP_ENV)) {
        injectScript(hotjarScript);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Router history={history}>
      <AlertaPWA />
      <CreditoExpressProvider
        useFirebase={useFirebase}
        useAuth={useAuth}
        organizacaoWhitelabel={getOrganizacaoWhitelabel()}
      >
        <ChatBotProvider>
          <SentryApp />
          <CssBaseline />
          <GlobalStyle />
          <CeMuiThemeProvider useFetch={useFetch}>
            <>
              <AppGlobalProvider>
                <AlertaApp />
                <NotificacaoApp />
                <Main />
              </AppGlobalProvider>
            </>
          </CeMuiThemeProvider>
        </ChatBotProvider>
      </CreditoExpressProvider>
    </Router>
  );
};

export default App;
