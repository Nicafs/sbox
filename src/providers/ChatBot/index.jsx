import React, { createContext, useContext, useReducer } from 'react';

import { reducer } from './reducer';

const estadoInicial = {
  visivel: true,
};

const Context = createContext(estadoInicial);

export const useChatBot = () => useContext(Context);

export const ChatBotProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
