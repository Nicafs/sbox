import { lazy } from 'react';

import CadastroEp from '../containers/Tomador/CadastroEp';
import CadastroLead from '../containers/Tomador/CadastroLead';

const SolicitacaoEmprestimo = lazy(() =>
  import('../pages/Tomador/SolicitacaoEmprestimo'),
);
const route = [
  {
    path: '/solicitarEmprestimo',
    main: SolicitacaoEmprestimo,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/quero-emprestimo',
    main: SolicitacaoEmprestimo,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/simular-emprestimo',
    main: SolicitacaoEmprestimo,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/lead',
    main: CadastroLead,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/cadastro-ep',
    main: CadastroEp,
    exact: true,
    publica: true,
    chatBot: true,
  },
];

export default route;
