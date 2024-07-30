import React from 'react';

import Hidden from 'components/MaterialUI/Hidden';
import pushRota from 'routes/push';

import ItemListagemEmprestimo from './ItemListagemEmprestimo';
import { TableStyled } from './style';

export default function TabelaListagemEmprestimo({ negociacoes }) {
  const negociacaoClickHandler = ({ id }) => {
    pushRota(`detalhe-emprestimo/${id}`);
  };

  return (
    <TableStyled>
      <thead>
        <tr>
          <th></th>
          <th>VALOR DO EMPRÉSTIMO</th>
          <th>VALOR DA PARCELA</th>
          <th>PARCELAS</th>
          <th>STATUS</th>
          <Hidden smDown>
            <th>PARCELAS PAGAS</th>
            {/* <th>VALOR PARA LIQUIDAÇÃO</th> */}
          </Hidden>
        </tr>
      </thead>
      <tbody>
        {negociacoes.map(n => {
          if (n.status === 'APROVADO') {
            const clickHandler = () => negociacaoClickHandler(n);
            return (
              <ItemListagemEmprestimo
                key={n.id}
                negociacao={n}
                negociacaoClickHandler={clickHandler}
                podeDetalhar
              />
            );
          }
          return null;
        })}
      </tbody>
    </TableStyled>
  );
}
