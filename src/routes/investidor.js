import { lazy } from 'react';

const LeadInvestidor = lazy(() => import('pages/Investidor/LeadInvestidor'));
const BoasVindas = lazy(() => import('pages/Investidor/BoasVindas'));
const FluxoInvestimento = lazy(() =>
  import('pages/Investidor/FluxoInvestimento'),
);

const route = [
  {
    path: '/quero-investir',
    main: LeadInvestidor,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/investidor/boas-vindas',
    main: BoasVindas,
    exact: true,
    chatBot: true,
  },
  {
    path: '/investidor/busca-investimentos-disponiveis',
    main: FluxoInvestimento,
    exact: true,
    chatBot: true,
  },
];

export default route;
