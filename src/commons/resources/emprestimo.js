import Api from './api/general-api';

const path = '/emprestimo';

const Emprestimo = {
  getMotivos() {
    return Api.request(`${path}/motivos`);
  },
  salvarHistoricoSimulacao(params) {
    return Api.request(`${path}/historico`, {
      data: params,
      method: 'POST',
    });
  },
  calcularSimulacao({
    valor,
    qtdParcelas,
    contratouSeguro,
    taxaJuros,
    taxaAdm,
    idNegociacao = undefined,
  }) {
    const params = {
      valor,
      qtdParcelas,
      contratouSeguro,
      ...(taxaJuros !== undefined && { taxaJuros }),
      ...(taxaAdm !== undefined && { taxaAdm }),
      ...(idNegociacao &&
        idNegociacao !== undefined && { idNegociacaoAtual: idNegociacao }),
    };

    return Api.request(`/simulacao-emprestimo/calculo`, {
      data: params,
      method: 'POST',
    });
  },

  calcularSimulacaoEP({
    valor,
    dataPrimeiraParcela: dataVencimento,
    comSeguro,
  }) {
    const params = {
      valor,
      dataVencimento,
      comSeguro,
    };

    return Api.request(`/ep/simulacao-emprestimo/calculo`, {
      data: params,
      method: 'POST',
    });
  },

  calcularSimulacaoEPResultado({ idConsulta }) {
    const params = { idConsulta };

    return Api.request(`/ep/simulacao-emprestimo/calculo/resultado`, {
      data: params,
      method: 'POST',
    });
  },
};

export default Emprestimo;
