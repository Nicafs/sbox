export function deveExibir(campos, nome) {
  return (
    Object.keys(campos).length === 0 || !campos[nome] || campos[nome].disponivel
  );
}

export function obrigatorio(campos, nome) {
  return (
    Object.keys(campos).length === 0 ||
    !campos[nome] ||
    campos[nome].obrigatorio
  );
}
