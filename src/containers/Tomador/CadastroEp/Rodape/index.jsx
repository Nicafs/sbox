import React, { useEffect } from 'react';

import { Box, Divider } from '@material-ui/core';

import { useChatBot } from '~/providers/ChatBot';
import { actionToggleVisibilidadeChatBot } from '~/providers/ChatBot/actions';

import AuthRodape from '~/components/AuthRodape';
import Grid from '~/components/MaterialUI/Grid';

export default function Rodape() {
  const { visivel: chatbotVisivel, dispatch } = useChatBot();

  useEffect(() => {
    const action = actionToggleVisibilidadeChatBot(false);
    dispatch(action);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box mt={2} mb={2}>
            <Divider />
          </Box>
        </Grid>
      </Grid>
      <AuthRodape
        msg="Precisa de ajuda?"
        textoBotao="CLIQUE AQUI"
        handleClickButton={() => {
          const action = actionToggleVisibilidadeChatBot(!chatbotVisivel);
          dispatch(action);
        }}
      />
    </>
  );
}
