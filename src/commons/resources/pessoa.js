import Api from './api/pessoa-api';

const path = '/pessoa';

const Pessoa = {
  cadastrarInvestidor(nome, email, cpf, senha, cnpjOrganizacao) {
    return Api.request(`${path}/investidor`, {
      data: { nome, email, documento: cpf, senha, cnpjOrganizacao },
      method: 'POST',
    });
  },
  senhaCadastrada(senha) {
    if (senha) {
      return Api.request(`${path}/senhaCadastrada`, {
        method: 'PUT',
        data: { senha },
      });
    }
    return Api.request(`${path}/senhaCadastrada`, { method: 'PUT' });
  },
  atualizarInvestidor(data) {
    return Api.request(`${path}/investidor`, { data, method: 'PUT' });
  },
  create(data) {
    return Api.request(path, { data, method: 'POST' });
  },
  get() {
    return Api.request(`${path}/byTokenAutenticacao`, { method: 'GET' });
  },
  validaEmailDisponivel(email, cnpjOrganizacao) {
    return Api.request(`${path}/validaEmail/${cnpjOrganizacao}/${email}`, {
      method: 'GET',
    });
  },
  buscarTomadorPorCpf(cpf, cnpjOrganizacao) {
    return Api.request(`${path}/${cnpjOrganizacao}/cpf/${cpf}`, {
      method: 'GET',
    });
  },
  getLimiteDeCredito(idPessoa) {
    return Api.request(`${path}/limiteCredito/${idPessoa}`, { method: 'GET' });
  },
  addCamposAdicionais(camposAdicionais = {}) {
    return Api.request(`${path}/addCamposAdicionais`, {
      data: camposAdicionais,
      method: 'PUT',
    });
  },
  sincronizarPessoa(documento, cnpjOrganizacao) {
    return Api.request(`/atualizarDadosPessoa`, {
      method: 'POST',
      data: { documento, cnpjOrganizacao },
    });
  },
  aceitarTermoPrivacidade() {
    return Api.request(`/tomador/aceitarTermoPrivacidade`, {
      method: 'PUT',
    });
  },
  descadastrarContato(token, md5) {
    return Api.request(`${path}/autorizacao-contato/descadastrar`, {
      method: 'PUT',
      data: {
        token,
        md5,
      },
    });
  },
  primeiroLogin(celular, negativado) {
    return Api.request(`${path}/primeiroLogin`, {
      method: 'PUT',
      data: {
        celular,
        negativado,
      },
    });
  },
  loginEP(data) {
    return Api.request(`ep${path}`, { data, method: 'POST' });
  },
};

export default Pessoa;
