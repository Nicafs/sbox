import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import BotaoChaBlip from '../../components/BotaoChatBlip';
import BotaoChatBot from '../../components/BotaoChatBot';
import Loading from '../../components/Loading';
import RotaOrganizacao from '../../hoc/RotaOrganizacao';
import { routes } from '../../routes';
import VerificacaoNovaVersao from '../VerificacaoNovaVersao';

const Main = () => {
  /* Aqui não pode existir Hook, caso tenha pode ficar gerando rerender desnecessários */
  return (
    <Suspense fallback={<Loading />}>
      <VerificacaoNovaVersao />
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={() => (
              <RotaOrganizacao
                publica={route.publica}
                exibeChat={route.chatBot}
              >
                <route.main />
                {route.chatBot && !process.env.REACT_APP_BLIP_KEY && (
                  <BotaoChatBot />
                )}
                {process.env.REACT_APP_BLIP_KEY && (
                  <BotaoChaBlip exibeChat={route.chatBot} />
                )}
              </RotaOrganizacao>
            )}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Main;
