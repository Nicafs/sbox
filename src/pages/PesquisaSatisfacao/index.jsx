import React, { useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { CardActions, Divider, Grid, Typography } from '@material-ui/core';

import { Button } from '@credito-express/ce-components';
import {
  Form,
  Input,
} from '@credito-express/ce-components/dist/components/Form';

// import Logo from '../../assets/images/logo_verde.svg';
import { useAppGlobal } from '~/providers/AppGlobal';

import Api from '../../commons/resources/api/api';
import ReaguaNotas from './ReguaNotas';
import { Container, CardStyled, AvatarStyled } from './styles';

function PesquisaSatisfacao() {
  const [nota, setNota] = useState();
  const [erro, setErro] = useState();
  const history = useHistory();
  const {
    params: { token, origem, organizacao },
  } = useRouteMatch();
  const {
    actions: { getLogo },
  } = useAppGlobal();

  const logo = getLogo();

  const formRef = useRef(null);
  const handleSubmit = async ({ comentario }) => {
    const data = { comentario, nota, token, origem };
    if (!nota) {
      setErro('Escolha uma nota para avaliar!');
      return;
    }
    try {
      await Api.request(`/negociacao/pesquisaNPS`, {
        method: 'POST',
        data,
      });
      history.push('/finalizado/pesquisa-satisfacao');
    } catch (err) {
      setErro(
        'Erro ao coletar os dados da sua avaliação, tente novamente mais tarde!',
      );
    }
  };

  return (
    <Container>
      <CardStyled>
        <Typography variant="h6">
          Queremos ouvir você para continuarmos melhorando
        </Typography>
        <Divider />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <AvatarStyled alt={organizacao} src={logo} />
            <Typography variant="subtitle1" color="textSecondary">
              Olá, qual a probabilidade de você recomendar a nossa empresa para
              um amigo ou colega?
            </Typography>
            <h1>{nota}</h1>
            <Typography variant="caption" color="error">
              {erro}
            </Typography>
          </Grid>
          <ReaguaNotas onClick={setNota} />
          <Input
            title="Em poucas palavras, descreva o que motivou sua nota"
            name="comentario"
            fullWidth
          />
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
                  type="submit"
                  rounded
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Form>
      </CardStyled>
    </Container>
  );
}

export default PesquisaSatisfacao;
