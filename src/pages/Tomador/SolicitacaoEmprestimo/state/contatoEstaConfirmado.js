export default function contatoEstaConfirmado(tipo, contatoConfirmar, pessoa) {
  const { contatosConfirmacaos } = pessoa;
  if (Array.isArray(contatosConfirmacaos) && contatosConfirmacaos.length > 0) {
    const contatoConfirmado = contatosConfirmacaos.filter(
      ({ tipoContato, contato, confirmado }) => {
        return (
          tipoContato === tipo && contato === contatoConfirmar && confirmado
        );
      },
    );
    return contatoConfirmado && contatoConfirmado.length > 0;
  }
  return false;
}
