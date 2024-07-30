import React from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';
import Box from 'components/MaterialUI/Box';
import Chip from 'components/MaterialUI/Chip';
import Grid from 'components/MaterialUI/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { transformarDataApiParaDataLocal } from '../../commons/tratativasParaDatasApi';
import { getNegociacaoStatusLabel } from '../../commons/utils';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ItemListagemEmprestimo = ({ negociacao, negociacaoClickHandler }) => {
  const classes = useStyles();
  const {
    dataCriacao,
    qtdParcelas,
    taxaJuros,
    valor,
    status,
    simulacao: { valorDaParcela },
  } = negociacao;
  const dataFormatada = dataCriacao
    ? transformarDataApiParaDataLocal(dataCriacao).format(
        'DD/MM/YYYY [às] HH:mm',
      )
    : '--/--/----';

  return (
    <Card className={classes.root} onClick={negociacaoClickHandler}>
      <CardHeader title="Solicitação de empréstimo" subheader={dataFormatada} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Chip
              label={<strong>R$ {moneyMask(valor)}</strong>}
              clickable
              color="primary"
            />
          </Grid>
          <Grid item>
            <Chip label={`${qtdParcelas} x`} clickable color="secondary" />
          </Grid>
          <Grid item>
            <Chip
              label={`${(taxaJuros * 100).toFixed(2).replace(/\./g, ',')} %`}
              clickable
              color="info"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Box mt={2}>
              <Typography variant="body1">
                Valor da parcela{' '}
                <strong>{`R$ ${moneyMask(valorDaParcela)}`}</strong>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Typography variant="body1">
                Solicitação com status{' '}
                <strong>{getNegociacaoStatusLabel(status)}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ItemListagemEmprestimo;
