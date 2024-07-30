import React from 'react';

import { getTempoDeCarteira } from 'commons/utils';

import { moneyMask, percentMask } from '../../commons/utils/MaskHandle';
import Typography from '../MaterialUI/Typography';
import { AvatarStyled, TdEmpresaStyled } from './style';

export default function ({ investimento }) {
  const {
    id,
    qtdParcelas,
    taxaRentabilidade,
    valor,
    tomador: { dataAdmissao, salario },
    empresa: { nome: nomeEmpresa, logo: { urlTemporaria = '' } = {} },
    simulacao: { valorParcela },
  } = investimento;

  return (
    <tr name="itemEmprestimo" key={id}>
      <TdEmpresaStyled>
        {urlTemporaria && (
          <AvatarStyled alt="Logo da empresa" src={urlTemporaria} />
        )}
        <Typography color="textSecondary">{nomeEmpresa}</Typography>
      </TdEmpresaStyled>
      <td>
        <Typography color="textSecondary">
          {getTempoDeCarteira(dataAdmissao)}
        </Typography>
      </td>
      <td>
        <Typography color="textSecondary">R$ {moneyMask(salario)}</Typography>
      </td>
      <td>
        <Typography color="textSecondary">
          {percentMask(taxaRentabilidade)}%
        </Typography>
      </td>
      <td>
        <Typography color="textSecondary">
          {qtdParcelas}x R$ {moneyMask(valorParcela)}
        </Typography>
      </td>
      <td>
        <Typography color="textSecondary">R$ {moneyMask(valor)}</Typography>
      </td>
    </tr>
  );
}
