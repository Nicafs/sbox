import React from 'react';

import Grid from 'components/MaterialUI/Grid';
import pushRota from 'routes/push';

import ItemListagemEmprestimo from './ItemListagemEmprestimo';

export default function ListagemEmprestimoMobile({ negociacoes }) {
  const negociacaoClickHandler = ({ id }) => {
    pushRota(`detalhe-emprestimo/${id}`);
  };

  return (
    <Grid container spacing={3} justify="center">
      {negociacoes.map(negociacao => {
        if (negociacao.status === 'APROVADO') {
          return (
            <Grid item xs={12}>
              <ItemListagemEmprestimo
                negociacao={negociacao}
                negociacaoClickHandler={() =>
                  negociacaoClickHandler(negociacao)
                }
              />
            </Grid>
          );
        }
        return null;
      })}
    </Grid>
  );
}
