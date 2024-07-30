import React from 'react';
import { useHistory } from 'react-router';

import { CardActions, Divider, Grid, Typography } from '@material-ui/core';

import { Button } from '@credito-express/ce-components';

import { useAppGlobal } from '~/providers/AppGlobal';

import { Container, CardStyled, AvatarStyled } from '../styles';

function PesquisaFim() {
  const {
    actions: { getLogo },
  } = useAppGlobal();

  const logo = getLogo();
  const history = useHistory();

  return (
    <Container>
      <CardStyled>
        <Typography variant="h6">
          Sua opinião foi enviada com sucesso!
        </Typography>
        <Divider />

        <Grid container direction="column" justify="center" alignItems="center">
          <AvatarStyled alt="logo" src={logo} />
          <Typography variant="subtitle1" color="textSecondary">
            Obrigado pela pré-disposição e cooperação em participar da nossa
            pesquisa de satisfação. Sua opinião é muito importante para toda a
            Equipe, para nos auxiliar a melhorar cada vez mais o nosso trabalho,
            principalmente em relação aos nossos produtos e ao atendimento
            oferecido.
          </Typography>
        </Grid>

        <CardActions>
          <Grid
            style={{ marginTop: 50 }}
            container
            spacing={2}
            justify="flex-end"
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="button"
                rounded
                onClick={() => history.push('/meus-emprestimos')}
              >
                Finalizar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardStyled>
    </Container>
  );
}

export default PesquisaFim;
