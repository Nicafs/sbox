import { lazy } from 'react';

import Loading from '../components/Loading';

const Institucional = lazy(() => import('pages/Institucional'));

const route = [
  {
    path: '/',
    main: Institucional,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/loading',
    main: Loading,
    exact: true,
    publica: true,
    chatBot: true,
  },
];

export default route;
