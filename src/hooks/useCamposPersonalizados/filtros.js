export const filtrarConfigCamposAdicionais = configCamposAdicionais => {
  const configCamposAdicionaisFiltrados = configCamposAdicionais
    .sort((a, b) => a.posicao - b.posicao)
    .filter(({ disponivel }) => disponivel);
  return configCamposAdicionaisFiltrados;
};
