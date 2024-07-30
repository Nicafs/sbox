import React from 'react';

import Button from '../../../MaterialUI/Button';
import Container from '../../../MaterialUI/Container';
import Grid from '../../../MaterialUI/Grid';
import Typography from '../../../MaterialUI/Typography';

const MensagemLeadCadastradoSucesso = ({ voltarClickHandle }) => (
  <Container>
    <Grid container justify="center" alignItems="center" spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h3" color="primary" align="center">
          Cadastrado com sucesso!
        </Typography>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            Entraremos em contato em breve...
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Button
          cy-element="btnSubmit"
          primary="true"
          onClick={voltarClickHandle}
          rounded
          fullWidth
        >
          Voltar
        </Button>
      </Grid>
    </Grid>
  </Container>
);

export default MensagemLeadCadastradoSucesso;
