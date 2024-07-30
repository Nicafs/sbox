import React from 'react';

import { getTempoDeCarteira } from 'commons/utils';
import { moneyMask, percentMask } from 'commons/utils/MaskHandle';
import Avatar from 'components/MaterialUI/Avatar';
import Grid from 'components/MaterialUI/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

const ItemListagemInvestimento = ({ investimento }) => {
  const classes = useStyles();
  const {
    qtdParcelas,
    taxaRentabilidade,
    valor,
    tomador: { dataAdmissao, salario },
    empresa: { nome: nomeEmpresa, logo: { urlTemporaria = '' } = {} },
    simulacao: { valorParcela },
  } = investimento;

  return (
    <Card className={classes.root}>
      {/* <CardHeader title="Solicitação de empréstimo" subheader={dataFormatada} /> */}
      <CardContent>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="textSecondary">EMPRESA</Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    {urlTemporaria && (
                      <Grid item>
                        <Avatar
                          alt="Logo da empresa"
                          src={urlTemporaria}
                          style={{ height: 'auto' }}
                        />
                      </Grid>
                    )}
                    <Grid item>
                      <Typography>{nomeEmpresa}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="textSecondary">
                    TEMPO DE CARTEIRA
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{getTempoDeCarteira(dataAdmissao)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="textSecondary">SALÁRIO</Typography>
                </Grid>
                <Grid item>
                  <Typography>R$ {moneyMask(salario)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="textSecondary">RENTABILIDADE</Typography>
                </Grid>
                <Grid item>
                  <Typography>{percentMask(taxaRentabilidade)}%</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="textSecondary">VALOR INVEST.</Typography>
                </Grid>
                <Grid item>
                  <Typography>R$ {moneyMask(valor)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="textSecondary">PARCELAS</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {qtdParcelas}x R$ {moneyMask(valorParcela)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ItemListagemInvestimento;
