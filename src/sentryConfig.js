const AMBIENTES_COM_LOGS_NO_SENTRY = ['dev', 'staging', 'prod']; // Não grava logs em ambiente local ou e2e

const podeSalvarLogsNoSentry = () => {
  const ehBuildDev = process.env.NODE_ENV.toString().includes('development');
  const ehAmbientePermitidoSalvarLogs = AMBIENTES_COM_LOGS_NO_SENTRY.includes(
    process.env.REACT_APP_ENV,
  );
  return ehAmbientePermitidoSalvarLogs && !ehBuildDev;
};

module.exports = {
  podeSalvarLogsNoSentry,
};
