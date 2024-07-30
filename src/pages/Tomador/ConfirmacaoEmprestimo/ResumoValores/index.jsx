import React, { useState, useEffect } from 'react';

import LoaderCircular from 'components/LoaderCircular';

import { Hidden, Grid } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import Negociacao from '~/commons/resources/negociacao';

import CardResumo from './resumo';
import { Titulo, GridArrow, GridResumoAntigo, GridResumoNovo } from './style';

export default function ResumoValores({ negociacao }) {
  const [negociacaoOriginal, setNegociacaoOriginal] = useState();
  const idNegociacaoOriginal = negociacao.portocred
    ? negociacao.portocred.idNegociacaoOriginal
    : null;

  useEffect(() => {
    const buscarNegociacaoOriginal = async id => {
      setNegociacaoOriginal(await Negociacao.buscarPorId(id));
    };
    buscarNegociacaoOriginal(idNegociacaoOriginal);
  }, [negociacao]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container>
      <Titulo>
        Confira os novos valores disponibilizados para seu empréstimo antes de
        prosseguir
      </Titulo>
      <Grid item container xs={12} justify="center">
        {negociacaoOriginal ? (
          <GridResumoAntigo item xs={12} md={5}>
            <CardResumo
              negociacaoCard={negociacaoOriginal}
              textoOpcional="anteriores"
            />
          </GridResumoAntigo>
        ) : (
          <LoaderCircular />
        )}
        <Hidden smDown>
          <GridArrow item xs={12} md={1}>
            <KeyboardArrowRightIcon fontSize="large" />
          </GridArrow>
        </Hidden>
        <Hidden mdUp>
          <GridArrow item xs={12} md={1} style={{ margin: '30px' }}>
            <KeyboardArrowDownIcon fontSize="large" />
          </GridArrow>
        </Hidden>
        <GridResumoNovo item xs={12} md={5}>
          <CardResumo negociacaoCard={negociacao} textoOpcional="novos" />
        </GridResumoNovo>
      </Grid>
    </Grid>
  );
}

ResumoValores.label = 'Resumo dos valores';
ResumoValores.title = 'Resumo dos valores';
