import SolicitacaoEmprestimoApi from 'commons/resources/solicitacao-emprestimo';

export default async function persistir(
  parametrizacao,
  emprestimo,
  pessoa,
  endereco,
  tokenEmailAtual,
  camposAdicionais,
  origem,
  contaBancaria,
  novaSimulacao,
  idNegociacao,
  tipoFluxo,
  dadosDocumentos,
) {
  try {
    const {
      novoCustomToken,
      negociacao,
    } = await SolicitacaoEmprestimoApi.persistirSolicitacao(
      emprestimo,
      pessoa,
      endereco,
      tokenEmailAtual,
      camposAdicionais,
      origem,
      contaBancaria,
      novaSimulacao,
      idNegociacao,
      tipoFluxo,
      dadosDocumentos,
    );
    return { novoCustomToken, persistido: true, negociacao };
  } catch (ex) {
    console.error('Ocorreu um erro ao persistir solicitação', ex);
    return { persistido: false, err: ex.err };
  }
}
