import { lazy } from 'react';

const CadastroContatoBlacklist = lazy(() =>
  import('../pages/CadastroContatoBlacklist'),
);

const route = [
  {
    path: '/contato/descadastrar',
    main: CadastroContatoBlacklist,
    exact: true,
    publica: true,
    chatBot: true,
  },
];

export default route;
