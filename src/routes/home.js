import { lazy } from 'react';

const Home = lazy(() => import('containers/Home'));
const MeusDados = lazy(() => import('containers/MeusDados'));

const route = [
  {
    path: '/home',
    main: Home,
    exact: true,
    chatBot: true,
  },
  {
    path: '/meus-dados',
    main: MeusDados,
    exact: true,
    chatBot: true,
  },
];

export default route;
