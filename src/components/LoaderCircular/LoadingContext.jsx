import React, { createContext, useCallback, useContext, useState } from 'react';

import { FullScreenLoading } from './FullScreenLoading';

export const LoadingContext = createContext({});

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);
  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {children}
      <FullScreenLoading loading={loading} />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export default LoadingProvider;
