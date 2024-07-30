import { lazy } from 'react';

const Auth = lazy(() => import('pages/Auth'));
const EnvioResetSenha = lazy(() => import('pages/Auth/EnvioResetSenha'));
const CadastroNovaSenha = lazy(() => import('pages/Auth/CadastroNovaSenha'));
const ContinuaEmprestimoPorQRCode = lazy(() =>
  import('pages/Tomador/ContinuaEmprestimoPorQRCode'),
);
const Logout = lazy(() => import('pages/Auth/Logout'));

const route = [
  {
    path: '/auth',
    main: Auth,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/continua-emprestimo/qrcode',
    main: ContinuaEmprestimoPorQRCode,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/auth/senha/reset',
    main: EnvioResetSenha,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/auth/senha/redefinicao',
    main: CadastroNovaSenha,
    exact: true,
    publica: true,
    chatBot: true,
  },
  {
    path: '/logout',
    main: Logout,
    exact: true,
    publica: true,
    chatBot: true,
  },
];

export default route;
