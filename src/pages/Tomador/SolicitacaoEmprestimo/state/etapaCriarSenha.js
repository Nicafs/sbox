export default function etapaCriarSenha(pessoa, senha) {
  return {
    pessoa: { ...pessoa, senha },
    prontoParaPersistir: true,
  };
}
