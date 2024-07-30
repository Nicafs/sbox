import Api from './api/negociacao-api';

const path = '/negociacao';

const Negociacao = {
  get({ paginaNumero = 1, paginaTamanho = 10 }) {
    const params = { paginaNumero, paginaTamanho };
    return Api.request(`${path}/byTokenAutenticacao`, {
      data: params,
      method: 'POST',
    });
  },
  getInvestimentos({ paginaNumero = 1, paginaTamanho = 10 }) {
    const params = { paginaNumero, paginaTamanho };
    return Api.request(`${path}/investimento/byTokenAutenticacao`, {
      data: params,
      method: 'POST',
    });
  },
  calcularParcelas(idNegocicao) {
    return Api.request(`${path}/calcularParcelas/${idNegocicao}`, {
      method: 'POST',
      data: {},
    });
  },
  adicionarContaBancaria({
    banco,
    agencia,
    conta,
    tipoConta,
    tipoOperacao,
    idNegociacao,
  }) {
    const params = {
      banco,
      agencia,
      conta,
      tipoConta,
      idNegociacao,
      tipoOperacao,
    };
    return Api.request(`${path}/adicionarConta`, {
      data: params,
      method: 'PUT',
    });
  },
  efetivarEmprestimo(idNegocicao, params = {}, fluxo = '') {
    return Api.request(`${fluxo}${path}/efetivarEmprestimo/${idNegocicao}`, {
      method: 'PUT',
      data: params,
    });
  },
  efetivarEmprestimoValorAlterado(idNegocicao, params = {}) {
    return Api.request(
      `${path}/efetivarEmprestimoValorAlterado/${idNegocicao}`,
      {
        method: 'PUT',
        data: params,
      },
    );
  },
  saldoDevedor(idNegocicao) {
    return Api.request(`${path}/calculaSaldoDevedor/${idNegocicao}`, {
      method: 'GET',
    });
  },
  cadastrarLead(data) {
    return Api.request(`${path}/lead/cadastro`, { data, method: 'POST' });
  },
  buscarLeadNegociacaoPorCpf(cpf) {
    return Api.request(`${path}/lead/cpf/${cpf}`, { method: 'GET' });
  },
  buscarPorId(id) {
    return Api.request(`${path}/${id}`, { method: 'GET' });
  },
  buscarTextoAssinaturaTomador(idNegociacao) {
    return Api.request(
      `/reconhecimentoAudioAssinatura/textoAssinaturaAudio/${idNegociacao}`,
      { method: 'GET' },
    );
  },
  buscarContratoTomador(idNegociacao) {
    return Api.request(`${path}/${idNegociacao}/contrato`, {
      method: 'GET',
    });
  },
  solicitarCancelamento(params) {
    return Api.request(`${path}/solicitarCancelamento`, {
      method: 'PUT',
      data: params,
    });
  },
  buscarDocumentoTomadorEp(idNegociacao, tipoDocumento) {
    return Api.request(`/ep${path}/${idNegociacao}/documento`, {
      method: 'POST',
      data: tipoDocumento,
    });
  },
};

export default Negociacao;
