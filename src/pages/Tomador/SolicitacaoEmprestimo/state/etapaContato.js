import Pessoa from 'commons/resources/pessoa';

import { getProximaEtapa, IDS_FLUXO_SIMULACAO_ENUM } from '../etapas';
import {
  enviarConfirmacaoContato,
  verificaContatoConfirmado,
  verificaContatoEnviado,
} from './confirmacaoContato';

async function validarContato(
  contato,
  temCamposPadrao,
  camposPadrao,
  confirmacaoContato,
  token,
  novosCamposAdicionais = {},
  origem,
) {
  if (!contato) return true;
  const tipoCampoPadrao = contato.indexOf('@') > -1 ? 'email' : 'celular';
  const deveValidar =
    !temCamposPadrao ||
    (camposPadrao[tipoCampoPadrao].disponivel &&
      camposPadrao[tipoCampoPadrao].obrigatorio);
  let confirmacaoContatoAtualizada = confirmacaoContato;

  if (deveValidar) {
    const { [contato]: confirmacaoA = {} } = confirmacaoContatoAtualizada;
    if (!confirmacaoA.confirmado) {
      confirmacaoContatoAtualizada = await verificaContatoConfirmado(
        contato,
        confirmacaoContatoAtualizada,
      );
    }

    const { [contato]: confirmacaoB = {} } = confirmacaoContatoAtualizada;
    if (!confirmacaoB.confirmado) {
      confirmacaoContatoAtualizada = await verificaContatoEnviado(
        contato,
        confirmacaoContatoAtualizada,
      );
      const { [contato]: confirmacaoC = {} } = confirmacaoContatoAtualizada;

      if (!confirmacaoC.enviado) {
        confirmacaoContatoAtualizada = await enviarConfirmacaoContato(
          token,
          contato,
          confirmacaoContatoAtualizada,
          false,
          origem,
        );
      } else {
        confirmacaoContatoAtualizada = {
          ...confirmacaoContatoAtualizada,
          modal: { ...confirmacaoContatoAtualizada.modal, podeReenviar: false },
        };
      }
      const isEmail = tipoCampoPadrao === 'email';
      if (isEmail) {
        await Pessoa.addCamposAdicionais({ ...novosCamposAdicionais });
      }

      return {
        confirmacaoContato: {
          ...confirmacaoContatoAtualizada,
          modal: {
            ...confirmacaoContatoAtualizada.modal,
            open: true,
            tipo: tipoCampoPadrao === 'email' ? 'EMAIL' : 'TELEFONE',
            campo: tipoCampoPadrao,
          },
        },
      };
    }
  }
  return true;
}
export default async function etapaContato(
  novoValores,
  pessoa,
  camposAdicionais,
  organizacao = {},
  confirmacaoContato,
  tokenData = {},
) {
  const { token, origem } = tokenData;
  const { email, celular, ...novosCamposAdicionais } = novoValores;
  const { camposPersonalizados: { contato = {} } = {} } = organizacao;
  const temCamposPadrao = Object.keys(contato).length > 0;
  const camposPadrao =
    temCamposPadrao &&
    contato
      .map(campo => ({
        [campo.nome]: { ...campo },
      }))
      .reduce((a, b) => ({ ...a, ...b }), {});

  const validacaoSms = await validarContato(
    celular,
    temCamposPadrao,
    camposPadrao,
    confirmacaoContato,
    token,
    novosCamposAdicionais,
    origem,
  );

  if (validacaoSms !== true) {
    return {
      pessoa: {
        ...pessoa,
        email,
        celular,
      },
      camposAdicionais: { ...camposAdicionais, ...novosCamposAdicionais },
      ...validacaoSms,
    };
  }

  const validacaoEmail = await validarContato(
    email,
    temCamposPadrao,
    camposPadrao,
    confirmacaoContato,
    token,
    novosCamposAdicionais,
    origem,
  );

  if (validacaoEmail !== true) {
    return {
      pessoa: {
        ...pessoa,
        email,
        celular,
      },
      camposAdicionais: { ...camposAdicionais, ...novosCamposAdicionais },
      ...validacaoEmail,
    };
  }

  return {
    pessoa: {
      ...pessoa,
      email,
      celular,
    },
    camposAdicionais: {
      ...camposAdicionais,
      ...novosCamposAdicionais,
    },
    confirmacaoContato: { ...confirmacaoContato, modal: { open: false } },
    etapaAtualObj: getProximaEtapa({
      idEtapaAtual: IDS_FLUXO_SIMULACAO_ENUM.CONTATOS,
      pessoa,
      organizacao,
    }),
  };
}
