import React, { useContext, useReducer } from 'react';

import gerarActions from './AppGlobalActions';
import { dispatchMiddleware, reducer, initialState } from './AppGlobalReducer';

const Context = React.createContext();

export const AppGlobalProvider = ({ children }) => {
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const dispatch = dispatchMiddleware(dispatchReducer, state);
  const actions = gerarActions(dispatch, state);

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch,
        actions: {
          ...actions,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppGlobal = () => useContext(Context);
