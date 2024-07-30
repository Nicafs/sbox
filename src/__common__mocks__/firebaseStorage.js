jest.mock('@credito-express/ce-components/dist/hooks/firebase', () => {
  return {
    app: {
      storage: () => {},
    },
    useFirebase: () => ({ analytics: () => ({ logEvent: () => {} }) }),
  };
});
