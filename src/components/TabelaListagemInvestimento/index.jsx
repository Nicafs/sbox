import React from 'react';

import ListagemInvestimentoMobile from 'components/ListagemInvestimentoMobile';

import { Hidden } from '@material-ui/core';

import ItemListagemInvestimento from './ItemListagemInvestimento';
import { TableStyled } from './style';

export default function TabelaListagemInvestimento({ investimentos }) {
  const renderDesktop = () => (
    <TableStyled>
      <thead>
        <tr>
          <th>EMPRESA</th>
          <th>TEMPO DE CARTEIRA</th>
          <th>SALÁRIO</th>
          <th>RENTABILIDADE</th>
          <th>PARCELAS</th>
          <th>VALOR DO INVESTIMENTO</th>
        </tr>
      </thead>
      <tbody>
        {investimentos.map(inv => (
          <ItemListagemInvestimento investimento={inv} />
        ))}
      </tbody>
    </TableStyled>
  );

  return (
    <>
      <Hidden smDown>{renderDesktop()}</Hidden>
      <Hidden mdUp>
        <ListagemInvestimentoMobile investimentos={investimentos} />
      </Hidden>
    </>
  );
}

TabelaListagemInvestimento.defaultProps = {
  investimentos: [],
};
