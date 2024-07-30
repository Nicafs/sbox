export function storageException({ error, push, exibirAlerta }) {
  const { descricao, codigo } = error.response?.data?.erros[0];
  if (codigo === 'STORAGE005') {
    exibirAlerta(descricao, 'error');
    push('/meus-emprestimos');
  }
}
