import { lazy } from 'react';

const MeusEmprestimos = lazy(() => import('../pages/Tomador/MeusEmprestimos'));
const ConfirmaEmprestimo = lazy(() =>
  import('../pages/Tomador/ConfirmacaoEmprestimo'),
);
const DetalheEmprestimo = lazy(() =>
  import('../pages/Tomador/DetalheEmprestimo'),
);
const PesquisaSatisfacao = lazy(() => import('../pages/PesquisaSatisfacao'));
const PesquisaFim = lazy(() => import('../pages/PesquisaSatisfacao/Fim'));

const route = [
  {
    path: '/meus-emprestimos',
    main: MeusEmprestimos,
    exact: true,
    chatBot: true,
  },
  {
    path: '/confirma-emprestimo',
    main: ConfirmaEmprestimo,
    exact: true,
    chatBot: true,
  },
  {
    path: '/detalhe-emprestimo/:id',
    main: DetalheEmprestimo,
    exact: true,
    chatBot: true,
  },
  {
    path: '/pesquisa-satisfacao/:token/:origem',
    main: PesquisaSatisfacao,
    publica: true,
    exact: true,
    chatBot: false,
  },
  {
    path: '/finalizado/pesquisa-satisfacao/',
    main: PesquisaFim,
    publica: true,
    exact: true,
    chatBot: false,
  },
];

export default route;
