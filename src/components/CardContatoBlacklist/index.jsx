import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { telefoneCelularMask } from '../../commons/utils/MaskHandle';
import LoaderCircular from '../LoaderCircular';
import Box from '../MaterialUI/Box';
import Button from '../MaterialUI/Button';
import TextField from '../MaterialUI/TextField';

const CardContatoBlacklist = ({
  contato,
  btnCadastrarClickHandler,
  loading,
  descadastradoComSucesso,
}) => {
  const identificarTipoContato = () => {
    if (contato.toString().includes('@')) {
      return 'EMAIL';
    }
    return 'TELEFONE';
  };

  const tipoContato = identificarTipoContato();
  const mascaraFn =
    tipoContato === 'TELEFONE' ? telefoneCelularMask : str => str;

  const renderContent = () => {
    if (descadastradoComSucesso) {
      return (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="h4" align="center">
              Sucesso!
            </Typography>
            <Typography color="textSecondary" variant="h6" align="center">
              Seu contato foi descadastrado e você não irá receber mais
              notificações!
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography color="textSecondary" variant="h5" align="center">
            Deseja realmente descadastrar o seu contato?
          </Typography>
          <Typography color="textSecondary" variant="h6" align="center">
            Você irá deixar de receber novas atualizações!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12} md={8}>
              <TextField
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Seu contato"
                value={mascaraFn(contato)}
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderActions = () => {
    if (loading) {
      return (
        <Grid container justify="center">
          <LoaderCircular />
        </Grid>
      );
    }
    if (!descadastradoComSucesso) {
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button
              rounded="true"
              secondary="true"
              fullWidth
              onClick={btnCadastrarClickHandler}
              style={{ height: 'auto' }}
            >
              Deixar de receber notificações
            </Button>
          </Grid>
        </Grid>
      );
    }

    return null;
  };

  return (
    <Card>
      <Box p={2}>
        <CardContent>{renderContent()}</CardContent>
        <CardActions>{renderActions()}</CardActions>
      </Box>
    </Card>
  );
};

export default CardContatoBlacklist;
