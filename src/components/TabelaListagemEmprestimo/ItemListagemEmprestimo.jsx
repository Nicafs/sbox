import React, { useMemo, useState } from 'react';

import Hidden from '@material-ui/core/Hidden';
import SearchIcon from '@material-ui/icons/Search';

import NegociacaoApi from '../../commons/resources/negociacao';
import { getNegociacaoStatusLabel } from '../../commons/utils';
import TextField from '../MaterialUI/TextField';
import { TrStyled } from './style';

export default function ({ negociacao, negociacaoClickHandler, podeDetalhar }) {
  const [parcelasPagas, setParcelasPagas] = useState(0);

  const getEmprestimo = paramNegociacao => {
    return paramNegociacao.emprestimo || paramNegociacao.simulacao;
  };

  const renderParcelasPagas = qtdParcelasPagas => {
    if (qtdParcelasPagas > 0) {
      return `${parcelasPagas} parcelas`;
    }

    return '';
  };

  useMemo(() => {
    const getSaldoDevedor = async paramNegociacao => {
      const { id, status } = paramNegociacao;
      if (status === 'APROVADO') {
        const {
          // saldoDevedor: saldoDevedorAtualizado,
          parcelasPagas: parcelasPagasAtualizadas,
        } = await NegociacaoApi.saldoDevedor(id);

        setParcelasPagas(parcelasPagasAtualizadas);
      }
    };
    getSaldoDevedor(negociacao);
  }, [negociacao]);

  const trStyled = (
    <>
      <TrStyled
        name={`itemEmprestimo-${negociacao.id}`}
        key={negociacao.id}
        onClick={negociacaoClickHandler}
        podeDetalhar={podeDetalhar}
      >
        <td>
          <SearchIcon />
        </td>
        <td>
          <TextField
            type="tel"
            value={negociacao.valor || ''}
            currency
            currencyRenderer={({ value }) => (
              <>
                R$ <strong>{value}</strong>{' '}
              </>
            )}
          />
        </td>
        <td>
          <TextField
            type="tel"
            value={getEmprestimo(negociacao).valorDaParcela || ''}
            currency
            currencyRenderer={({ value }) => (
              <>
                R$ <span>{value}</span>{' '}
              </>
            )}
          />
        </td>
        <td>{negociacao.qtdParcelas} parcelas</td>
        <td>{getNegociacaoStatusLabel(negociacao.status)}</td>
        <Hidden smDown>
          <td>{renderParcelasPagas(parcelasPagas)}</td>
        </Hidden>
      </TrStyled>
    </>
  );
  return trStyled;
}
