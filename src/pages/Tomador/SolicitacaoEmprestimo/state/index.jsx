import React, { useContext, useReducer } from 'react';

import ESTADO_INICIAL from './estadoInicial';
import { fns, reducer, reducerMiddleware } from './reducer';

const SimulacaoStateContext = React.createContext(ESTADO_INICIAL);

export default function SimulacaoStateProvider({ children }) {
  const [state, dispatchReducer] = useReducer(reducer, ESTADO_INICIAL);
  const dispatch = reducerMiddleware(state, dispatchReducer);
  const functions = fns(state, dispatch);
  const { Provider } = SimulacaoStateContext;

  return <Provider value={[state, functions]}>{children}</Provider>;
}
export const useSimulacaoState = () => useContext(SimulacaoStateContext);
