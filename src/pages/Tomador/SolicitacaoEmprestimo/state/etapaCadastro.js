import { onlyNumbers } from 'commons/utils/ManipulacaoUtils';

import { getProximaEtapa, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';

export const etapaCadastro = (
  dadosPessoais,
  pessoaState,
  camposAdicionais,
  organizacao,
) => {
  const {
    email,
    celular,
    profissao,
    estadoCivil,
    nomeMae,
    cep,
    logradouro,
    genero,
    bairro,
    cidade,
    uf,
    numero,
    complemento,
    rg,
    emissorRg,
    ufEmissorRg,
    dataEmissaoRg,
    cargo,
    ufNaturalidade,
    cidadeNaturalidade,
    ...novosCamposAdicionais
  } = dadosPessoais;

  const pessoa = {
    ...pessoaState,
    email,
    celular: celular ? onlyNumbers(celular) : undefined,
    profissao,
    estadoCivil,
    nomeMae,
    genero,
    rg,
    emissorRg,
    ufEmissorRg,
    dataEmissaoRg,
    ufNaturalidade,
    cidadeNaturalidade,
    ...(cargo && { cargo }),
  };
  const endereco = {
    cep,
    logradouro,
    bairro,
    cidade,
    uf,
    numero,
    complemento,
  };

  return {
    etapaAtualObj: getProximaEtapa({
      idEtapaAtual: IDS_FLUXO_SIMULACAO_ENUM.DADOS_PESSOAIS,
      pessoa,
      organizacao,
    }),
    pessoa,
    endereco,
    camposAdicionais: { ...camposAdicionais, ...novosCamposAdicionais },
  };
};
