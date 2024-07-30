import { isDate } from 'date-fns';

import { transformarDataApiParaDataLocal } from '../tratativasParaDatasApi';
import Api from './api/pessoa-api';

let path = '/solicitacao-emprestimo';

const SolicitacaoEmprestimo = {
  persistirSolicitacao(
    emprestimo,
    pessoa,
    endereco,
    tokenEmailAtual = null,
    camposAdicionais = {},
    origem,
    contaBancaria,
    novaSimulacao,
    idNegociacao,
    tipoFluxo,
    dadosDocumentos,
  ) {
    let requestParams;

    if (novaSimulacao) {
      path = '/nova-solicitacao-emprestimo';
      requestParams = {
        ...(novaSimulacao && { idNegociacaoOriginal: idNegociacao }),
        ...(tokenEmailAtual &&
          origem !== 'CHAT' && { tokenOferta: tokenEmailAtual }),
        contratouSeguro: !!emprestimo.comSeguro,
        emprestimo: {
          valor: emprestimo.valor,
          objetivo: emprestimo.objetivo,
          qtdParcelas: emprestimo.parcelas,
        },
        origem,
      };
    } else {
      if (tipoFluxo === 'BANCO_SEMEAR') {
        path = '/ep/simulacao-emprestimo';
      }

      Object.keys(camposAdicionais).forEach(key => {
        if (isDate(camposAdicionais[key])) {
          camposAdicionais[key] = transformarDataApiParaDataLocal(
            camposAdicionais[key],
          ).format('YYYY-MM-DD');
        }
      });

      requestParams = {
        ...(tokenEmailAtual &&
          origem !== 'CHAT' && { tokenOferta: tokenEmailAtual }),
        pessoa: {
          email: pessoa.email,
          celular: pessoa.celular,
          senha: pessoa.senha,
          profissao: pessoa.profissao,
          genero: pessoa.genero,
          estadoCivil: pessoa.estadoCivil,
          nomeMae: pessoa.nomeMae,
          ufNaturalidade: pessoa.ufNaturalidade,
          cidadeNaturalidade: pessoa.cidadeNaturalidade,
          ...(pessoa.nacionalidade && { nacionalidade: pessoa.nacionalidade }),
          ...(pessoa.rg && { rg: pessoa.rg }),
          ...(pessoa.emissorRg && { emissorRg: pessoa.emissorRg }),
          ...(pessoa.ufEmissorRg && { ufEmissorRg: pessoa.ufEmissorRg }),
          ...(pessoa.dataEmissaoRg && {
            dataEmissaoRg: pessoa.dataEmissaoRg
              ? transformarDataApiParaDataLocal(pessoa.dataEmissaoRg).format(
                  'YYYY-MM-DD',
                )
              : undefined,
          }),
          ...(pessoa.cargo && { cargo: pessoa.cargo }),
        },
        endereco: {
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          bairro: endereco.bairro,
          cidade: endereco.cidade.value,
          uf: endereco.uf,
          numero: endereco.numero,
          complemento: endereco.complemento,
        },
        contratouSeguro: !!emprestimo.comSeguro,
        emprestimo: {
          valor: emprestimo.valor,
          objetivo: emprestimo.objetivo,
          qtdParcelas: emprestimo.parcelas,
          dataVencimento: emprestimo.dataVencimento,
        },
        camposAdicionais,
        origem,
        contaBancaria,
        ...(dadosDocumentos.bucketPath && { dadosDocumentos }),
      };
    }

    return Api.request(path, {
      data: requestParams,
      method: 'POST',
    });
  },

  parametrosTomador(pathP, novaSimulacao = false, idNegociacao = '') {
    const url = idNegociacao
      ? `${pathP}?nova_simulacao=${novaSimulacao}&id_negociacao_atual=${idNegociacao}`
      : `${pathP}?nova_simulacao=${novaSimulacao}`;

    return Api.request(url, {
      method: 'GET',
    });
  },

  parametrosTomadorEP() {
    const url = `ep/simulacao-emprestimo/parametrizacao`;

    return Api.request(url, {
      method: 'GET',
    });
  },
};

export default SolicitacaoEmprestimo;
