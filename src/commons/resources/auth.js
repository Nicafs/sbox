import Api from './api/auth-api';

const Auth = {
  login(login, senha) {
    return Api.request(``, {
      method: 'POST',
      data: { login, senha },
    });
  },
  loginPrimeiroAcessoTomador(documento, dataNascimento, token, nomeMae) {
    return Api.request(``, {
      method: 'POST',
      data: {
        login: documento,
        dataNascimento,
        token,
        ...(nomeMae && { nomeMae }),
      },
    });
  },
  loginTomadorViaLead(documento, dataNascimento) {
    return Api.request(``, {
      method: 'POST',
      data: { login: documento, dataNascimento, isLead: true },
    });
  },
};

export default Auth;
