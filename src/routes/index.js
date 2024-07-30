import Auth from './auth';
import Commons from './commons';
import Home from './home';
import Institucional from './institucional';
import Investidor from './investidor';
import SimulacaoEmprestimo from './solicitacao-emprestimo';
import Tomador from './tomador';

const routes = [
  ...Institucional,
  ...Auth,
  ...SimulacaoEmprestimo,
  ...Home,
  ...Investidor,
  ...Tomador,
  ...Commons,
];

export { routes };
